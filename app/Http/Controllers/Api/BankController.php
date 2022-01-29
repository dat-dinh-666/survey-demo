<?php
namespace App\Http\Controllers\Api;

use App\Http\Requests\GetBankRequest;
use App\Services\BankService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

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
        try {
            if(Cache::tags(['survey'])->has($url)) {
                return response([
                    'data' => Cache::tags(['survey'])->get($url),
                    'from_cache' => true
                ]);
            }
        }
        catch(\Exception $e) {
            Log::error($e);
        }
        $bank = $this->bankService->getBankByUrl($url);
        try {
            Cache::tags(['survey'])->set($url, $bank);
        }
        catch (\Exception $e) {
            Log::error($e);
        }
        if(!$bank) {
            return response([
                'message' => 'Not found'
            ], 400);
        }

        return response([
            'data' => $bank,
            'from_cache' => false
        ]);
    }
}
