<?php

namespace App\Services;

use App\Repositories\BankRepository;

class BankService
{
    /**
     * @var BankRepository
     */
    private $bankRepository;

    /**
     * BankService constructor.
     * @param BankRepository $bankRepository
     */
    public function __construct(
        BankRepository $bankRepository
    )
    {
        $this->bankRepository = $bankRepository;
    }

    public function getBankByUrl($url) {
        return $this->bankRepository->findWhere(['url' => $url, 'is_enable' => true])->first();
    }
}
