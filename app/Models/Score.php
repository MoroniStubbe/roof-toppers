<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'user_id', // De gebruiker die de score heeft behaald
        'time',    // De behaalde tijd in minuten:seconden.miliseconden
        'time_in_seconds', // De tijd in seconden voor sortering
    ];

    // Definieer de relatie tussen Score en User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
