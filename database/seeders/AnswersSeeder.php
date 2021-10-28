<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Answers;
use File;

class AnswersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Answers::truncate();
  
        $json = File::get("database/data/answers.json");
        $countries = json_decode($json);
  
        foreach ($countries as $key => $value) {
            Answers::create([
                "questionId" => $value->questionId,
                "answer" => $value->answer
            ]);
        }
    }
}
