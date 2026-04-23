import os
import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import models
from datetime import datetime

# NEW: Import the security libraries
import bcrypt

# --- CONFIGURATION ---
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("CRITICAL ERROR: No DATABASE_URL set in the .env file.")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- ONLY ONE BOUNCER ALLOWED ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # The "*" means "allow requests from any website"
    allow_credentials=False, # MUST be False when using "*"
    allow_methods=["*"],  
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- SECURITY UTILITIES ---
def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_bytes.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# --- PYDANTIC SCHEMAS ---
class UserCreate(BaseModel):
    Username: str
    Email: EmailStr
    Password: str  

class UserLogin(BaseModel):
    username: str  
    password: str

class UserResponse(BaseModel):
    UserID: int
    Username: str
    Email: str
    TotalPoints: int
    UpsetBadges: int
    class Config:
        from_attributes = True

class BracketUpdate(BaseModel):
    user_id: int
    picks: dict  

class BracketResponse(BaseModel):
    UserID: int
    PicksJSON: str
    TotalScore: int
    class Config:
        from_attributes = True

class MatchPickCreate(BaseModel):
    user_id: int
    match_id: str
    picked_team: str
    is_lock: bool = False

class MatchPickResponse(BaseModel):
    PickID: int
    UserID: int
    MatchID: str
    PickedTeam: str
    PointsAwarded: int
    IsLock: bool = False 
    class Config:
        from_attributes = True

class MatchResultInput(BaseModel):
    MatchID: str
    WinningTeam: str

# NEW: Schema for Props
class PropsUpdate(BaseModel):
    user_id: int
    props: dict  


# --- API ROUTES ---

@app.get("/")
def read_root():
    return {"status": "online", "message": "World Cup API is running!"}

@app.get("/api/matches")
def get__matches():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, "matches.json")
        
        with open(file_path, "r") as file:
            matches = json.load(file)
        return matches
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="matches.json file not found!")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error reading the JSON format.")

# -- USERS & AUTHENTICATION --

@app.post("/api/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.Username == user.Username) | (models.User.Email == user.Email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already registered.")
    
    hashed_pw = get_password_hash(user.Password)
    
    db_user = models.User(Username=user.Username, Email=user.Email, PasswordHash=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/login", response_model=UserResponse)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.Username == credentials.username).first()
    
    if not user or not verify_password(credentials.password, user.PasswordHash):
        raise HTTPException(status_code=401, detail="Invalid username or password.")
        
    return user

@app.get("/api/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).order_by(models.User.TotalPoints.desc()).all()


# -- MATCH PICKS --

@app.get("/api/users/{user_id}/picks", response_model=List[MatchPickResponse])
def get_user_picks(user_id: int, db: Session = Depends(get_db)):
    picks = db.query(models.MatchPick).filter(models.MatchPick.UserID == user_id).all()
    return picks

@app.post("/api/picks", response_model=MatchPickResponse)
def submit_pick(pick: MatchPickCreate, db: Session = Depends(get_db)):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "matches.json")
    with open(file_path, "r") as file:
        matches = json.load(file)
        
    target_match = next((m for m in matches if str(m["id"]) == pick.match_id), None)
    if not target_match:
        raise HTTPException(status_code=404, detail="Match not found in schedule.")

    now = datetime.now()
    today_str = now.strftime("%Y-%m-%d")
    match_date = target_match.get("date", today_str) 

    if match_date < today_str:
        raise HTTPException(status_code=403, detail="Too late! This match happened on a previous day.")

    if match_date == today_str and now.hour >= 11:
        raise HTTPException(status_code=403, detail="Today's games have kicked off! Picks are locked.")

    user = db.query(models.User).filter(models.User.UserID == pick.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if pick.is_lock:
        matches_on_this_date = [str(m["id"]) for m in matches if m.get("date", today_str) == match_date]
        db.query(models.MatchPick).filter(
            models.MatchPick.UserID == pick.user_id,
            models.MatchPick.MatchID.in_(matches_on_this_date)
        ).update({"IsLock": False}, synchronize_session=False)

    existing_pick = db.query(models.MatchPick).filter(
        models.MatchPick.UserID == pick.user_id,
        models.MatchPick.MatchID == pick.match_id
    ).first()
    
    if existing_pick:
        existing_pick.PickedTeam = pick.picked_team
        existing_pick.IsLock = pick.is_lock 
        db.commit()
        db.refresh(existing_pick)
        return existing_pick
        
    db_pick = models.MatchPick(
        UserID=pick.user_id,
        MatchID=pick.match_id,
        PickedTeam=pick.picked_team,
        IsLock=pick.is_lock 
    )
    db.add(db_pick)
    db.commit()
    db.refresh(db_pick)
    return db_pick


# -- BRACKETS --

# -- BRACKETS --

@app.get("/api/users/{user_id}/bracket")
def get_user_bracket(user_id: int, db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("SELECT UserID, PicksJSON, TotalScore FROM UserBrackets WHERE UserID = :uid"), 
            {"uid": user_id}
        ).fetchone()
        
        if not result:
            return {"picks": {}} 
            
        import json
        return {"picks": json.loads(result[1])}
    except Exception:
        # Failsafe: If the table hasn't been created yet, just return empty
        return {"picks": {}}

@app.post("/api/bracket")
def save_bracket(bracket: BracketUpdate, db: Session = Depends(get_db)):
    import json
    picks_string = json.dumps(bracket.picks)
    
    # FIX: Auto-create the table if it doesn't exist yet!
    db.execute(text("""
        CREATE TABLE IF NOT EXISTS UserBrackets (
            UserID INTEGER PRIMARY KEY,
            PicksJSON TEXT NOT NULL,
            TotalScore INTEGER DEFAULT 0
        )
    """))
    
    existing = db.execute(
        text("SELECT UserID FROM UserBrackets WHERE UserID = :uid"), 
        {"uid": bracket.user_id}
    ).fetchone()
    
    if existing:
        db.execute(
            text("UPDATE UserBrackets SET PicksJSON = :picks WHERE UserID = :uid"),
            {"picks": picks_string, "uid": bracket.user_id}
        )
    else:
        db.execute(
            text("INSERT INTO UserBrackets (UserID, PicksJSON, TotalScore) VALUES (:uid, :picks, 0)"),
            {"uid": bracket.user_id, "picks": picks_string}
        )
        
    db.commit()
    return {"status": "success", "message": "Bracket securely locked in the vault!"}

# -- TOURNAMENT PROPS --

@app.get("/api/users/{user_id}/props")
def get_user_props(user_id: int, db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("SELECT PropsJSON FROM UserProps WHERE UserID = :uid"), 
            {"uid": user_id}
        ).fetchone()
        
        if not result:
            return {"props": {}} 
            
        import json
        return {"props": json.loads(result[0])}
    except Exception:
        # Failsafe: If the table hasn't been created yet, just return empty
        return {"props": {}}

@app.post("/api/props")
def save_props(props_data: PropsUpdate, db: Session = Depends(get_db)):
    import json
    props_string = json.dumps(props_data.props)
    
    # Auto-create the table if it doesn't exist yet!
    db.execute(text("""
        CREATE TABLE IF NOT EXISTS UserProps (
            UserID INTEGER PRIMARY KEY,
            PropsJSON TEXT NOT NULL
        )
    """))
    
    existing = db.execute(
        text("SELECT UserID FROM UserProps WHERE UserID = :uid"), 
        {"uid": props_data.user_id}
    ).fetchone()
    
    if existing:
        db.execute(
            text("UPDATE UserProps SET PropsJSON = :props WHERE UserID = :uid"),
            {"props": props_string, "uid": props_data.user_id}
        )
    else:
        db.execute(
            text("INSERT INTO UserProps (UserID, PropsJSON) VALUES (:uid, :props)"),
            {"uid": props_data.user_id, "props": props_string}
        )
        
    db.commit()
    return {"status": "success", "message": "Props securely locked in the vault!"}

# -- SCORING ENGINE (ADMIN) --
@app.post("/api/admin/score")
def score_match(result: MatchResultInput, db: Session = Depends(get_db)):
    picks = db.query(models.MatchPick).filter(models.MatchPick.MatchID == result.MatchID).all()
    winners_count = 0
    
    for pick in picks:
        if pick.PointsAwarded > 0:
            continue 
            
        if pick.PickedTeam == result.WinningTeam:
            points_to_award = 6 if pick.IsLock else 3
            pick.PointsAwarded = points_to_award
            user = db.query(models.User).filter(models.User.UserID == pick.UserID).first()
            if user:
                user.TotalPoints += points_to_award
            winners_count += 1
            
    db.commit()
    return {
        "status": "success", 
        "message": f"Match {result.MatchID} scored! {winners_count} family member(s) correctly guessed {result.WinningTeam}."
    }