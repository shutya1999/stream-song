<?php

use App\Http\Controllers\SongController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SongController::class, 'index']);
Route::get('/admin', [SongController::class, 'admin']);
Route::post('/get-song-to-play', [SongController::class, 'getSongToPlay']);
Route::post('/delete-song', [SongController::class, 'deleteSong']);
