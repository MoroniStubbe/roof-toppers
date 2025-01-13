<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScoresTable extends Migration
{
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('user_id') // Verbindt score met een gebruiker
                  ->constrained() // Zorgt ervoor dat er een referentie is naar de 'users' tabel
                  ->onDelete('cascade'); // Verwijdert scores van een gebruiker als de gebruiker wordt verwijderd
            $table->string('time'); // De behaalde tijd van de gebruiker in minuten:seconden.miliseconden
            $table->decimal('time_in_seconds', 8, 3); // Tijd in seconden voor sortering
            $table->timestamps(); // Timestamp voor created_at en updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('scores');
    }
}
