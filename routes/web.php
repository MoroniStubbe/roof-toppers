<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScoreController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/game', function () {
    return view('roof_toppers');
})->name('game');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/scores', [ScoreController::class, 'showScores'])->name('scores');
Route::post('/scores', [ScoreController::class, 'saveScore'])->middleware('auth');

require __DIR__ . '/auth.php';
