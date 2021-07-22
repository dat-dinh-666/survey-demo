<?php
namespace App\Http\Controllers\Api;

use App\Http\Requests\GetBankRequest;
use App\Services\BankService;

class BankController extends \Illuminate\Routing\Controller
{
    /**
     * @var BankService
     */
    private $bankService;

    /**
     * BankController constructor.
     * @param BankService $bankService
     */
    public function __construct(
        BankService $bankService
    )
    {
        $this->bankService = $bankService;
    }

    public function getByUrl(GetBankRequest $request) {
        $url = $request->get('url');
        $bank = $this->bankService->getBankByUrl($url);
        if(!$bank) {
            return response([
                'message' => 'Not found'
            ], 400);
        }

        return response([
            'data' => $bank
        ]);
    }
}
