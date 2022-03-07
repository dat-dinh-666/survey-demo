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
        
    }
}
