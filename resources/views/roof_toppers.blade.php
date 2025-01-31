<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Roof Toppers</title>
    <link rel="stylesheet" href="{{ asset('/css/global.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/roof_toppers.css') }}">
    <script src="../node_modules/phaser/dist/phaser.js"></script>
    <script src="../resources/js/config/level.js"></script>
    <script src="../resources/js/classes/objects/Platform.js"></script>
    <script src="../resources/js/classes/objects/Cloud.js"></script>
    <script src="../resources/js/classes/objects/Cube.js"></script>
    <script src="../resources/js/classes/objects/Floor.js"></script>
    <script src="../resources/js/classes/objects/Wall.js"></script>
    <script src="../resources/js/classes/objects/BigWall.js"></script>
    <script src="../resources/js/classes/objects/Lava.js"></script>
    <script src="../resources/js/classes/objects/Finish.js"></script>
    <script src="../resources/js/classes/RoofToppers.js"></script>
    <script src="../resources/js/classes/StartScreen.js"></script>
    <script src="../resources/js/classes/GameFinished.js"></script>
    <script src="../resources/js/classes/Character.js"></script>
    <script src="../resources/js/classes/CustomCamera.js"></script>
    <script src="../resources/js/roof_toppers.js"></script>
    <script>
        let GLOBALS = <?php 
            // Create the PHP array with user data
            $userData = [
                'user' => [
                    'isLoggedIn' => Auth::check(),
                    'user' => Auth::user() ? Auth::user()->only(['id', 'name', 'email']) : null, // Only include necessary fields
                ]
            ];
            
            // Output the entire array as JSON
            echo json_encode($userData); 
        ?>;
    </script>
    
</head>

<body>
</body>

</html>