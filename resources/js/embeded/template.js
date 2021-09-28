import {modal_id} from "./config";

const template = `
<div class="modal micromodal-slide" id="${modal_id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="${modal_id}-title">
        <header class="modal__header">
          <h2 class="modal__title" id="${modal_id}-title">
          </h2>
          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
        </header>
        <main class="modal__content" id="${modal_id}-content">
        </main>
        <footer class="modal__footer">
          <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
        </footer>
      </div>
    </div>
</div>`

export default template;
