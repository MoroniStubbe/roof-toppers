<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Score;
use App\Models\User;

class ScoreSeeder extends Seeder
{
    public function run()
    {
        // Haal alle gebruikers op (gebruikers ID van 1 tot 6)
        $users = User::whereIn('id', [1, 2, 3, 4, 5, 6])->get(); 

        // Aantal scores per gebruiker
        $scoresPerUser = 3;

        // Loop door elke gebruiker
        foreach ($users as $user) {
            // Genereer meerdere scores per gebruiker
            for ($i = 0; $i < $scoresPerUser; $i++) {
                // Genereer willekeurige tijd in minuten, seconden en milliseconden
                $minutes = rand(0, 10);
                $seconds = rand(0, 59);
                $milliseconds = rand(0, 999);

                // Zet alles om naar het stringformaat "m:ss.sss"
                $formattedTime = sprintf("%d:%02d.%03d", $minutes, $seconds, $milliseconds);

                // Bereken de tijd in seconden
                $timeInSeconds = $minutes * 60 + $seconds + $milliseconds / 1000;

                // Maak een nieuwe score aan voor de gebruiker
                Score::create([
                    'user_id' => $user->id,
                    'time' => $formattedTime, // Opslaan als string
                    'time_in_seconds' => $timeInSeconds, // Opslaan als numerieke waarde voor sortering
                ]);
            }
        }
    }
}
