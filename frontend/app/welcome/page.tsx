'use client';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome to the WC26 Pick Ems!</h1>
        
        <div className="text-left space-y-4 text-gray-700 mb-8">
          <p>We are so excited to have you playing with us for the 2026 World Cup. Here is how the site works:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Making Picks:</strong> Navigate to the 'Picks' tab to select group stage results for points.</li>
            <li><strong>Deadlines:</strong> All picks for a given day lock at 11:00 AM. Once the games start, you cannot change your teams!</li>
            <li><strong>The Bracket:</strong> Once the group stages end, we will open up the Knockout Bracket where you can predict the entire path to the final.</li>
            <li><strong>Teams:</strong> Check out the 'Teams' tab to scout the different countries and do your research before making your selections.</li>
            <li><strong>Stats:</strong> Visit the 'Stats' tab to track top offensive and top defensive stats plus top team stats.</li>
          </ul>
          <p className="font-semibold text-center mt-6">Good luck</p>
        </div>

        <button 
          onClick={() => router.push('/')} 
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition"
        >
          Enter the Stadium
        </button>
      </div>
    </div>
  );
}