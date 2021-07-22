<?php


namespace App;


use App\Models\RadioQuestion;
use Prettus\Repository\Eloquent\BaseRepository;

class RadioQuestionValueRepository extends BaseRepository
{
    public function model()
    {
        return RadioQuestion::class;
    }
}
