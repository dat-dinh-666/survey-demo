<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('bank_id')->references('id')->on('banks');
            $table->text('question')->nullable(false);
            $table->enum('type', ['text', 'radio', 'number'])->nullable(false)->default('text');
            $table->boolean('required')->default(false)->nullable(false);
            $table->text('validation_rules')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
