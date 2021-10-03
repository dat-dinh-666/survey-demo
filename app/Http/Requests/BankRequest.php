<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'url' => 'required',
            'survey_url' => 'required',
            'is_enable' => 'boolean',
            'user_id' => 'required',
            'button_text' => 'string',
            'button_color' => 'string|min:7|max:7',
            'button_position' => 'string',
            'popup_timeout' => 'numeric|nullable',
            'show_when_hover_id' => 'string',
            'max_show_on_hover_times' => 'numeric|nullable',
            'header_img_url'=> 'nullable|image',
            'close_btn_title' => 'string'
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}
