<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    @vite(['resources/css/app.css', 'resources/js/app.js']) <!-- Ensure Breeze assets are loaded -->
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
</head>

<body>

<x-nav></x-nav>

<div>
    <h1>Roof Toppers</h1>
</div>
    
<div class="image-container">
        <img src="{{ asset('img/home_screen.png') }}" alt="Roof Toppers Image">
        <button class="play-button" onclick="window.location.href='{{ route('game') }}';">Play</button>
    </div>

<x-footer></x-footer>

</body>

</html>