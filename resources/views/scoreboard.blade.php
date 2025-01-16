<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            display: flex;
            gap: 20px;
        }
        .box {
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            flex: 1;
        }
        .box h2 {
            margin-top: 0;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            padding: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- All Time Best -->
        <div class="box">
            <h2>All Time Records</h2>
            <ul>
                @foreach ($allTimeBest as $score)
                    @php
                        // Zet de tijd om naar minuten, seconden en milliseconden
                        $timeParts = explode(":", $score->time);
                        
                        if (count($timeParts) < 2) {
                            $timeParts = ['0', $timeParts[0]]; // Stel in dat minuten 0 zijn en de rest seconden
                        }

                        $secondsParts = isset($timeParts[1]) ? explode(".", $timeParts[1]) : [0, 0];
                        
                        $minutes = $timeParts[0];
                        $seconds = $secondsParts[0] ?? 0;
                        $milliseconds = $secondsParts[1] ?? 0;
                    @endphp
                    <li>{{ $loop->iteration }}. {{ $score->user ? $score->user->name : 'Onbekende gebruiker' }} - 
                        {{ $minutes }}:{{ str_pad($seconds, 2, '0', STR_PAD_LEFT) }}.{{ str_pad($milliseconds, 3, '0', STR_PAD_LEFT) }} minuten
                    </li>
                @endforeach
            </ul>
        </div>

        <!-- Personal Best -->
        <div class="box">
            <h2>Personal Records</h2>
            <ul>
                @foreach ($personalBest as $score)
                    @php
                        // Zet de tijd om naar minuten, seconden en milliseconden
                        $timeParts = explode(":", $score->time);

                        if (count($timeParts) < 2) {
                            $timeParts = ['0', $timeParts[0]]; // Stel in dat minuten 0 zijn en de rest seconden
                        }

                        $secondsParts = isset($timeParts[1]) ? explode(".", $timeParts[1]) : [0, 0];

                        $minutes = $timeParts[0];
                        $seconds = $secondsParts[0] ?? 0;
                        $milliseconds = $secondsParts[1] ?? 0;
                    @endphp
                    <li>{{ $loop->iteration }}. 
                        {{ $minutes }}:{{ str_pad($seconds, 2, '0', STR_PAD_LEFT) }}.{{ str_pad($milliseconds, 3, '0', STR_PAD_LEFT) }} minuten
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</body>
</html>
