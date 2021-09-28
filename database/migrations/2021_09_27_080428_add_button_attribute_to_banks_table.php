<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddButtonAttributeToBanksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('banks', function (Blueprint $table) {
            $table->string('button_text');
            $table->char('button_color', 20);
            $table->enum('button_position', ['left', 'right'])->default('left')->nullable(false);
            $table->integer('popup_timeout', false, true);
            $table->boolean('show_when_move_to_header')->default(false);
            $table->string('show_when_hover_id')->nullable(true);
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
            $table->dropColumn(['button_text', 'button_color', 'button_position', 'popup_timeout', 'show_when_move_to_header', 'show_when_hover_id']);
        });
    }
}
