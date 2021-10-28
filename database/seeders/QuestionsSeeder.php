<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questions;
use File;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Questions::truncate();
  
        $json = File::get("database/data/questions.json");
        $countries = json_decode($json);
  
        foreach ($countries as $key => $value) {
            Questions::create([
                "formId" => $value->formId,
                "label" => $value->label,
                "type" => $value->type
            ]);
        }
    }
}
