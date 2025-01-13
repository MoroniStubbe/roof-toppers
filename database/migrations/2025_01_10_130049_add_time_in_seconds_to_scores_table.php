<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimeInSecondsToScoresTable extends Migration
{
    public function up()
    {
        Schema::table('scores', function (Blueprint $table) {
            if (!Schema::hasColumn('scores', 'time_in_seconds')) {
                $table->decimal('time_in_seconds', 8, 3)->nullable(false);
            }
        });
    }

    public function down()
    {
        Schema::table('scores', function (Blueprint $table) {
            if (Schema::hasColumn('scores', 'time_in_seconds')) {
                $table->dropColumn('time_in_seconds');
            }
        });
    }
}
