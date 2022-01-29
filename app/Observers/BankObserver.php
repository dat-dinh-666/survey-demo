<?php

namespace App\Observers;

use App\Models\Bank;
use Illuminate\Support\Facades\Cache;

class BankObserver
{
    /**
     * Handle the Bank "created" event.
     *
     * @param  \App\Models\Bank  $bank
     * @return void
     */
    public function created(Bank $bank)
    {
        //
    }

    /**
     * Handle the Bank "updated" event.
     *
     * @param  \App\Models\Bank  $bank
     * @return void
     */
    public function updated(Bank $bank)
    {
        if(Cache::tags(['survey'])->has($bank->url)) {
            Cache::tags(['survey'])->delete($bank->url);
        }
    }

    /**
     * Handle the Bank "deleted" event.
     *
     * @param  \App\Models\Bank  $bank
     * @return void
     */
    public function deleted(Bank $bank)
    {
        if(Cache::tags(['survey'])->has($bank->url)) {
            Cache::tags(['survey'])->delete($bank->url);
        }
    }

    /**
     * Handle the Bank "restored" event.
     *
     * @param  \App\Models\Bank  $bank
     * @return void
     */
    public function restored(Bank $bank)
    {
        if(Cache::tags(['survey'])->has($bank->url)) {
            Cache::tags(['survey'])->delete($bank->url);
        }
    }

    /**
     * Handle the Bank "force deleted" event.
     *
     * @param  \App\Models\Bank  $bank
     * @return void
     */
    public function forceDeleted(Bank $bank)
    {
        if(Cache::tags(['survey'])->has($bank->url)) {
            Cache::tags(['survey'])->delete($bank->url);
        }
    }
}
