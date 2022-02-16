<?php

namespace App\Console\Commands;

use App\Services\CustomFormDataService;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PushDataToISB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'isb:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync data to ISB';

    private $customFormDataService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(
        CustomFormDataService $customFormDataService
    )
    {
        $this->customFormDataService = $customFormDataService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $allData = $this->customFormDataService->getAll();
        $dataToPush = $allData;
        $i = 0;
        while($dataToPush->count() > 0) {
            $data = $dataToPush->pop();
            $body = [
                'ansobj' => json_encode($data->json),
                'csrftoken' => '102030',
                'submittime' => Carbon::parse($data->updated_at)->toDateTimeString(),
                'ip' => 'none',
                'timestamp' => Carbon::parse($data->updated_at)->toDateTimeString(),
            ];
            echo json_encode($body) . "\n";
            $response = Http::withHeaders([
                'X-Surveycake-Token' => '*XNT2T5UkDszXH5R',
                'Cookie' => 'csrftoken=102030',
            ])
            ->contentType('application/x-www-form-urlencoded')
            ->post('https://voice2025-surveycake.fast-insight.com/api/v1/s/submit-isc', [
                'form_params' => $body
            ]);
            if($response->ok() && $response['status']) {
                echo "Pushed 1 item to ISB \n";
            }
            else {
                echo "Error: 1\n";
                echo json_encode($response->json()) . "\n";
            }
            echo "---\n";
        }
        echo "All data pushed\n";
        return 0;
    }
}
