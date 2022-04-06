<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->timestamps();
        });
        Schema::table('banks', function (Blueprint $table) {
            $table->enum('type', ['template', 'iframe'])->default('iframe');
            $table->string('survey_url')->nullable(true)->change();
            $table->foreignId('template_id')
                ->nullable()
                ->references('id')->on('templates');
            $table->json('variables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('templates');
    }
}
