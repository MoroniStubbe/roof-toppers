<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUniqueToNameInUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if the unique index already exists
            if (!DB::select("SHOW INDEX FROM users WHERE Key_name = 'users_name_unique'")) {
                $table->unique('name'); // Add unique index to the 'name' column
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the unique index
            $table->dropUnique('users_name_unique'); // Remove the unique constraint on 'name'
        });
    }
}
