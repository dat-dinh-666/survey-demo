import {
    modal_id
} from "./config";

const template = `
<div class="modal micromodal-slide {{it.modal_position}}" id="${modal_id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close style="background-color: rgba(0,0,0,{{it.backdrop_opacity}})">
    {{@if(it.popup_type === 'sidebar' && it.modal_position == 'right')}}
        <div class="modal-close-button">
            <button data-micromodal-close>
                <span data-micromodal-close>{{it.close_btn_title}}</span>
                <span data-micromodal-close style="font-size: 2rem; line-height: 0; margin-top: -8px">&#x02A2F;</span>
            </button>
        </div>
    {{/if}}
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="${modal_id}-title">
        <header class="modal__header">
          <h2 class="modal__title" id="${modal_id}-title">
          {{@if(it.header_img_url !== null)}}
            <div class="modal_header_img_wrapper">
              <img class="modal__header_img" src="{{it.header_img_url}}" alt="" style="width: 100%"/>
            </div>
            {{/if}}
          </h2>
          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
        </header>

        <main class="modal__content" id="${modal_id}-content">
        </main>
        {{@if(it.popup_type !== 'sidebar')}}
        <footer class="modal__footer">
          <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">{{it.close_btn_title}}</button>
        </footer>
        {{/if}}
      </div>
      {{@if(it.popup_type === 'sidebar' && it.modal_position == 'left')}}
      <div class="modal-close-button">
          <button data-micromodal-close>
              <span data-micromodal-close>{{it.close_btn_title}}</span>
              <span data-micromodal-close style="font-size: 2rem; line-height: 0; margin-top: -8px">&#x02A2F;</span>
          </button>
      </div>
  {{/if}}
    </div>
</div>`

export default template;
