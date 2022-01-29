import {
    modal_id
} from "./config";

const template = `
<div class="modal micromodal-slide {{it.modal_position}}" id="${modal_id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close style="background-color: rgba(0,0,0,{{it.backdrop_opacity}})">
    {{@if(it.popup_type === 'sidebar' && it.modal_position == 'right')}}
        <div class="modal-close-button">
            <button data-micromodal-close>
                <div data-micromodal-close>{{it.close_btn_title}}</div>
                <div data-micromodal-close class="x-icon">
                    <svg aria-hidden="true" data-micromodal-close focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                </div>
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
              <div data-micromodal-close>{{it.close_btn_title}}</div>
              <div data-micromodal-close class="x-icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
              </div>
          </button>
      </div>
  {{/if}}
    </div>
</div>`

export default template;
