<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/scoreboard.css') }}">
    <title>Scoreboard</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="@guest centered @endguest">

    <x-nav></x-nav>

    <main>
        <div class="container">
            <div class="box">
                <h2>All Time Records</h2>
                <ul>
                    @foreach ($allTimeBest as $score)
                    @php
                    $timeParts = explode(":", $score->time);
                    if (count($timeParts) < 2) {
                        $timeParts=['0', $timeParts[0]];
                        }
                        $secondsParts=isset($timeParts[1]) ? explode(".", $timeParts[1]) : [0, 0];
                        $minutes=$timeParts[0];
                        $seconds=$secondsParts[0] ?? 0;
                        $milliseconds=$secondsParts[1] ?? 0;
                        @endphp
                        <li>
                        {{ $loop->iteration }}.
                        @if ($loop->iteration === 1)
                        🥇
                        @elseif ($loop->iteration === 2)
                        🥈
                        @elseif ($loop->iteration === 3)
                        🥉
                        @elseif ($loop->iteration === 4)
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        @elseif ($loop->iteration === 5)
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        @endif
                        {{ $score->user ? $score->user->name : 'Onbekende gebruiker' }} -
                        {{ $minutes }}:{{ str_pad($seconds, 2, '0', STR_PAD_LEFT) }}.{{ str_pad($milliseconds, 3, '0', STR_PAD_LEFT) }}
                        </li>
                        @endforeach
                </ul>
            </div>

            <!-- Personal Best -->
            @auth
            <div class="box">
                <h2>Personal Records</h2>
                <ul>
                    @foreach ($personalBest as $score)
                    @php
                    $timeParts = explode(":", $score->time);
                    if (count($timeParts) < 2) {
                        $timeParts=['0', $timeParts[0]];
                        }
                        $secondsParts=isset($timeParts[1]) ? explode(".", $timeParts[1]) : [0, 0];
                        $minutes=$timeParts[0];
                        $seconds=$secondsParts[0] ?? 0;
                        $milliseconds=$secondsParts[1] ?? 0;
                        @endphp
                        <li>
                        {{ $loop->iteration }}.
                        {{ $minutes }}:{{ str_pad($seconds, 2, '0', STR_PAD_LEFT) }}.{{ str_pad($milliseconds, 3, '0', STR_PAD_LEFT) }}
                        </li>
                        @endforeach
                </ul>
            </div>
            @endauth
        </div>
    </main>

    <x-footer></x-footer>

</body>

</html>