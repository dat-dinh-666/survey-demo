<?php
namespace App;

use App\Models\Question;
use Prettus\Repository\Eloquent\BaseRepository;

class QuestionRepository extends BaseRepository {

    /**
     * Specify Model class name
     *
     * @return string
     */
    function model()
    {
        return Question::class;
    }
}
