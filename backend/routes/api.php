<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InformationRequestController;
use App\Http\Controllers\ObjectionController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:login');
Route::get('/requests/track', [InformationRequestController::class, 'track'])->middleware('throttle:tracking');
Route::post('/requests', [InformationRequestController::class, 'store'])->middleware('throttle:requests');
Route::post('/objections', [ObjectionController::class, 'store'])->middleware('throttle:requests');
Route::post('/documents', [UploadController::class, 'store'])->middleware('throttle:uploads');

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/admin/requests', [InformationRequestController::class, 'index']);
    Route::patch('/admin/requests/{informationRequest}', [InformationRequestController::class, 'update']);
    Route::get('/admin/objections', [ObjectionController::class, 'index']);
    Route::patch('/admin/objections/{objection}', [ObjectionController::class, 'update']);
});