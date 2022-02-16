<?php

namespace App\Services;

use App\Repositories\CustomFormDataRepository;

class CustomFormDataService
{
    /**
     * @var CustomFormDataRepository
     */
    private $customFormDataRepository;

    /**
     * CustomFormDataService constructor.
     * @param CustomFormDataRepository $customFormDataRepository
     */
    public function __construct(
        CustomFormDataRepository $customFormDataRepository
    )
    {
        $this->customFormDataRepository = $customFormDataRepository;
    }

    public function create($data) {
        return $this->customFormDataRepository->create($data);
    }

    /**
     * @return Collection
     */
    public function getAll() {
        return $this->customFormDataRepository->all();
    }
}
