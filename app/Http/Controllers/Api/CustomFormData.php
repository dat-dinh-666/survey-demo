<?php
namespace App\Http\Controllers\Api;

use App\Http\Requests\CustomFormDataRequest;
use App\Services\CustomFormDataService;

class CustomFormData extends \Illuminate\Routing\Controller
{
    /**
     * @var CustomFormDataService
     */
    private $customFormDataService;

    /**
     * BankController constructor.
     * @param CustomFormDataService $customFormDataService
     */
    public function __construct(
        CustomFormDataService $customFormDataService
    )
    {
        $this->customFormDataService = $customFormDataService;
    }

    public function create(CustomFormDataRequest $request) {
        $created = $this->customFormDataService->create([
            'json' => $request->get('ansobj')
        ]);
        return response([
            'message' => 'success',
            'data' => $created
        ], 200);
    }
}
