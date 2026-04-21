from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone

Base = declarative_base()

class User(Base):
    __tablename__ = "Users"
    
    UserID = Column(Integer, primary_key=True, index=True)
    Username = Column(String(50), unique=True, nullable=False)
    Email = Column(String(100), unique=True, nullable=False)
    PasswordHash = Column(String(255), nullable=False) 
    TotalPoints = Column(Integer, default=0)
    UpsetBadges = Column(Integer, default=0)
    CreatedAt = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class MatchPick(Base):
    __tablename__ = "MatchPicks"
    
    PickID = Column(Integer, primary_key=True, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    MatchID = Column(String(50), nullable=False)
    PickedTeam = Column(String(100), nullable=False)
    PointsAwarded = Column(Integer, default=0)
    CreatedAt = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    IsLock = Column(Boolean, default=False)

# NEW: The missing blueprint for the Bracket vault!
class UserBracket(Base):
    __tablename__ = "UserBrackets"
    
    # We use UserID as the primary key since each user only gets one bracket
    UserID = Column(Integer, ForeignKey("Users.UserID"), primary_key=True, autoincrement=False)
    PicksJSON = Column(Text, nullable=False) 
    TotalScore = Column(Integer, default=0)
    CreatedAt = Column(DateTime, default=lambda: datetime.now(timezone.utc))