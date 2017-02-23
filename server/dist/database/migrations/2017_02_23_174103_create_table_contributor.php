<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableContributor extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("contributor", function (Blueprint $table)
		{
			$table->increments("contributor_id");

			$table->integer("project_id"); // TODO foreign key
			$table->string("name");
			$table->string("membernumber");
			$table->integer("amount");
			$table->string("email");
			$table->text("message");
			$table->string("privacy");
			$table->boolean("newsletter");

			$table->string("payment_type");
			$table->boolean("payment_verified");
			$table->text("payment_data")->nullable();

			$table->dateTimeTz("created_at")->default(DB::raw("CURRENT_TIMESTAMP"));
			$table->dateTimeTz("updated_at")->nullable();
			$table->dateTimeTz("deleted_at")->nullable();

			$table->index("deleted_at");
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop("contributor");
	}
}