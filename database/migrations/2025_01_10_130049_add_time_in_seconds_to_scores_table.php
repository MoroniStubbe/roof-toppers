<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimeInSecondsToScoresTable extends Migration
{
    public function up()
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->decimal('time_in_seconds', 8, 3); // Voeg de kolom 'time_in_seconds' toe
        });
    }

    public function down()
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->dropColumn('time_in_seconds'); // Verwijder de kolom als de migratie wordt teruggedraaid
        });
    }
}
