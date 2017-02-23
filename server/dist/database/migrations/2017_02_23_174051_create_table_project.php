<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableProject extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("project", function (Blueprint $table)
		{
			$table->increments("project_id");
			$table->string("url");

			$table->boolean("active")->default(false);
			$table->string("image");
			$table->string("title");
			$table->text("description");
			$table->string("brief");
			$table->text("about");
			$table->integer("funding_goal");
			$table->string("currency", 3)->default("SEK");
			$table->dateTimeTz("enddate")->nullable();

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
		Schema::drop("project");
	}
}