<?php
namespace App\Http\Controllers\Api;

use App\Http\Requests\GetBankRequest;
use App\Models\Template;
use App\Services\BankService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
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
        // try {
        //     if(Cache::tags(['survey'])->has($url)) {
        //         return response([
        //             'data' => Cache::tags(['survey'])->get($url),
        //             'from_cache' => true
        //         ]);
        //     }
        // }
        // catch(\Exception $e) {
        //     Log::error($e);
        // }
        $banks = $this->bankService->getBanksByUrl($url);
        foreach ($banks as &$bank) {
            if($bank->type === 'template') {
                $template_id = $bank->template_id;
                $template = Template::query()->where('id', $template_id)->first();
                if(!$template) {
                    continue;
                }
                $templateStr = File::get(storage_path('app/' . $template->path));
                $templateVars = $bank->variables;
                if(!$templateVars) {
                    continue;
                }
                $templateVarsPretty = [] ;
                foreach ($templateVars as $templateVar) {
                    $templateVarsPretty[$templateVar['name']] = $templateVar['value'];
                }
                $bank['template'] = \replaceVar($templateStr, $templateVarsPretty);
            }
        }
        try {
            Cache::tags(['survey'])->set($url, $banks);
        }
        catch (\Exception $e) {
            Log::error($e);
        }
        if(!$banks) {
            return response([
                'message' => 'Not found'
            ], 400);
        }

        return response([
            'data' => $banks,
            'from_cache' => false
        ]);
    }
}
