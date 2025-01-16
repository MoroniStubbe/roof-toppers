<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    public function showScores()
    {
        // All-time best scores ophalen, gesorteerd op laagste tijd (snelste)
        $allTimeBest = Score::with('user') // Laad de gebruiker bij elke score
            ->orderBy('time_in_seconds', 'asc') // Sorteer op de tijd in seconden
            ->take(5)
            ->get();
    
        // Personal best scores van de ingelogde gebruiker ophalen, gesorteerd op laagste tijd (snelste)
        $personalBest = Score::with('user') // Laad de gebruiker bij elke score
            ->where('user_id', Auth::id())
            ->orderBy('time_in_seconds', 'asc') // Sorteer op de tijd in seconden
            ->take(5)
            ->get();
    
        return view('scoreboard', compact('allTimeBest', 'personalBest'));
    }

    public function saveScore(Request $request)
    {
        // Valideer de tijd (controleer alleen de tijd in seconden voor het opslaan)
        $request->validate([
            'time' => 'required|numeric|min:1',
        ]);
    
        // Genereer de tijd in seconden
        $minutes = floor($request->time / 60);
        $seconds = $request->time % 60;
        $milliseconds = round(($request->time - floor($request->time)) * 1000); // Milliseconden berekenen
    
        $formattedTime = sprintf("%d:%02d.%03d", $minutes, $seconds, $milliseconds);
        $timeInSeconds = $minutes * 60 + $seconds + $milliseconds / 1000; // Tijd in seconden voor sortering
    
        // Sla de score op bij de ingelogde gebruiker
        $score = Score::create([
            'user_id' => Auth::id(),
            'time' => $formattedTime, // Opslaan als string in m:ss.sss formaat
            'time_in_seconds' => $timeInSeconds, // Opslaan als numerieke waarde voor sortering
        ]);
    
        // Return a JSON response with the saved score data
        return response()->json($score);
    }    
}