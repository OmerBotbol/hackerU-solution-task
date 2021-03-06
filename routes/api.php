<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('form', FormController::class);

Route::get('question/from/{formId}', 'App\Http\Controllers\QuestionController@showByFormId');
Route::resource('question', QuestionController::class);

Route::resource('answer', AnswerController::class);