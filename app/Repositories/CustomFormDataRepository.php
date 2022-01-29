<?php


namespace App\Repositories;


use App\Models\CustomFormData;
use Prettus\Repository\Eloquent\BaseRepository;

class CustomFormDataRepository extends BaseRepository
{
    public function model()
    {
        return CustomFormData::class;
    }
}
