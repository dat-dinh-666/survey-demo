<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdjustBanksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('banks', function (Blueprint $table) {
            $table->string('button_text')->nullable(true)->change();
            $table->string('button_color', 20)->nullable(true)->change();
            $table->integer('popup_timeout')->unsigned()->nullable(true)->change();
            $table->string('show_when_hover_id')->nullable(true)->change();
            $table->string('button_bg_color', 20)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('banks', function (Blueprint $table) {
            $table->dropColumn(['button_bg_color']);
        });
    }
}
