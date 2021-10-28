<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Forms;
use File;

class FormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //create fake forms
        Forms::truncate();
  
        $json = File::get("database/data/forms.json");
        $countries = json_decode($json);
  
        foreach ($countries as $key => $value) {
            Forms::create([
                "formName" => $value->formName,
                "Submissions" => $value->submissions
            ]);
        }
    }
}
