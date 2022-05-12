<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Bank extends Model
{
    use CrudTrait;

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'banks';
    // protected $primaryKey = 'id';
    // public $timestamps = false;
    protected $guarded = ['id'];
    // protected $fillable = [];
    protected $hidden = ['user_id'];
    // protected $dates = [];
    protected $casts = [
        'variables' => 'array'
    ];

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */
    protected static function boot(){
        parent::boot();
        static::deleting(function($obj) {
            Storage::disk('storage/app/backpack')->delete($obj->header_img_url);
        });
        static::updated(function ($obj) {
            Cache::tags(['survey'])->delete($obj->url);
        });
        static::deleted(function ($obj) {
            Cache::tags(['survey'])->delete($obj->url);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function template(){
        return $this->belongsTo(Template::class, 'template_id', 'id');
    }
    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    public function getHeaderImgUrlAttribute($value) {
        if(!$value) {
            return $value;
        }
        $url = Storage::url($value);
        return asset($url);
    }

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */

    public function setHeaderImgUrlAttribute($value)
    {
        if(!$value) {
            return $value;
        }
        $attribute_name = "header_img_url";
        $disk = "public";
        $destination_path = "backpack";

        $this->uploadFileToDisk($value, $attribute_name, $disk, $destination_path);
    }
}
