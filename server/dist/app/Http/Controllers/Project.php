<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use DB;

class Project extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
	}

	/**
	 * Returns a list of all projects
	 */
	public function list(Request $request)
	{
		// Load data from database
		$data = DB::table("project")
			->select(
				"project.active",
				"project.image",
				"project.title",
				"project.description",
				"project.brief",
				"project.about",
				"project.funding_goal",
				"project.currency",
				"project.enddate",
				"project.created_at",
				"project.updated_at",
				"project.deleted_at"
			)
			->selectRaw("url AS project_id")

			// Get contributors count and total amount
			->leftJoin("contributor", function($join) {
				$join->on("contributor.project_id", "project.project_id");
				$join->where("contributor.payment_verified", "=", 1);
			})
			->selectRaw("COUNT(contributor.contributor_id) AS num_contributors")
			->selectRaw("IFNULL(SUM(contributor.amount), 0) AS funding_status")
			->groupBy("project.project_id")

			->where("active", 1)
			->get();

		// Send response to client
		return Response()->json($data, 200);
	}

	/**
	 * Creates a new project
	 */
	public function create(Request $request)
	{
		// Send response to client
		return Response()->json([
			"status"  => "error",
			"message" => "Not implemented",
		], 501);
	}

	/**
	 * Get an project
	 */
	public function read(Request $request, $project_id)
	{
		// Load data from database
		$data = DB::table("project")
			->select(
				"project.active",
				"project.image",
				"project.title",
				"project.description",
				"project.brief",
				"project.about",
				"project.funding_goal",
				"project.currency",
				"project.enddate",
				"project.created_at",
				"project.updated_at",
				"project.deleted_at"
			)
			->selectRaw("url AS project_id")

			// Get contributors count and total amount
			->leftJoin("contributor", function($join) {
				$join->on("contributor.project_id", "project.project_id");
				$join->where("contributor.payment_verified", "=", 1);
			})
			->selectRaw("COUNT(contributor.contributor_id) AS num_contributors")
			->selectRaw("IFNULL(SUM(contributor.amount), 0) AS funding_status")
			->groupBy("project.project_id")

			->where("url", "=", $project_id)
			->where("active", 1)
			->first();

		// Send response to client
		return Response()->json($data, 200);
	}

	/**
	 * Update an project
	 */
	public function update(Request $request, $project_id)
	{
		// Send response to client
		return Response()->json([
			"status"  => "error",
			"message" => "Not implemented",
		], 501);
	}

	/**
	 * Delete an project
	 */
	public function delete(Request $request, $project_id)
	{
		// Send response to client
		return Response()->json([
			"status"  => "error",
			"message" => "Not implemented",
		], 501);
	}

	/*
	 * Add a contributor to a project
	 */
	public function contribute(Request $request, $project_id)
	{
		// Process the payment with Stripe
		$verified = 0;
		if($request->get("payment_type") == "stripe")
		{
			// TODO: Skicka API-request till Stripe
			if(true)
			{
				$verified = 1;
			}
		}

		// Get the project id
		$project_id = DB::table("project")->where("url", "=", $request->get("project_id"))->value("project_id");

		// Save the data in database
		DB::table("contributor")->insert([
			"project_id"       => $project_id,
			"name"             => $request->get("name"),
			"membernumber"     => $request->get("membernumber"),
			"amount"           => $request->get("amount"),
			"email"            => $request->get("email"),
			"message"          => $request->get("message"),
			"privacy"          => $request->get("privacy"),
			"newsletter"       => $request->get("newsletter"),
			"payment_type"     => $request->get("payment_type"),
			"payment_data"     => json_encode($request->get("payment_data")),
			"payment_verified" => $verified,
		]);

		// Send response to client
		return Response()->json([
			"status"  => "ok",
		], 200);
	}

	/**
	* Handles CORS pre-flight requests
	*
	* This is an API, so everything should be allowed
	*/
	public function handleOptions(Request $request)
	{
		return response("", 201);
	}
}