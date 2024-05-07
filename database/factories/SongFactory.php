<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Song::class;

    public function definition(): array
    {
        return [
//            'user_id' => fake()->text(),
//            'username' => fake()->userName(),
//            'link' => fake()->url(),
//            'name' => fake()->text(),
//            'status' => 'hold'


            'user_id' => fake()->randomNumber(),
            'username' => fake()->userName,
            'link' => fake()->url,
            'name' => fake()->sentence,
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
