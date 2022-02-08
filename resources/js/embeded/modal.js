import MicroModal from 'micromodal';
import getStyle from './style';
import { baseUrl } from './config';
import modalTemplate from './template';
import htmlToElement from './utils';

export default class Modal {
  modalId;

  data;

  openTime = 0;

  constructor(modalId, data) {
    this.modalId = modalId;
    this.data = data;
  }

  init() {
    this.createPopup();
    this.createIframe();
    this.createTimeout();
    this.createHover();
    this.initClose();
  }

  createPopup() {
    const buttonText = this.data.button_text ?? 'Open Survey';
    const buttonColor = this.data.button_color ?? 'black';
    const buttonBgColor = this.data.button_bg_color ?? 'white';
    const buttonPosition = this.data.button_position ?? 'left';
    const closeBtnTitle = this.data.close_btn_title ?? 'Close';
    const headerImgUrl = this.data.header_img_url ?? null;
    const popupType = this.data.popup_type ?? 'modal';
    const backdropOpacity = parseFloat(this.data.backdrop_opacity) ?? 1;
    const closeAfterSubmit = this.data.close_after_submit;

    const positionStyle = buttonPosition === 'left' ? 'left: 0; writing-mode: vertical-lr' : 'right: 0;  writing-mode: vertical-lr; transform: rotate(180deg)';

    const styles = document.createElement('style');
    styles.innerHTML = getStyle(popupType);

    const popup = htmlToElement(modalTemplate, {
      // eslint-disable-next-line max-len
      close_btn_title: closeBtnTitle,
      header_img_url: headerImgUrl,
      modal_position: buttonPosition,
      popup_type: popupType,
      backdrop_opacity: backdropOpacity,
      modal_id: this.modalId,
    });

    const popupOpen = htmlToElement(`
            <div class="modal-open-original" style="position: fixed;
                ${positionStyle};
                top: 50%;
                z-index: 999;
                background: ${buttonBgColor};
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.12);
                color: ${buttonColor};
                padding: 16px 8px;
                cursor: pointer;
                display: flex;
                font-size: 14px;
                height: 150px;
                justify-content: center;
                align-items: center;">${buttonText} <img style="transform: rotate(90deg); width: 20px;margin-top: 8px;" src="${baseUrl}/images/feedback.svg"/></div>
        `);
    popupOpen.addEventListener('click', () => {
      MicroModal.show(this.modalId);
    });
    document.querySelector('body').appendChild(styles);
    document.querySelector('body').appendChild(popup);
    document.querySelector('body').appendChild(popupOpen);

    if (closeAfterSubmit > 0) {
      window.addEventListener('message', (event) => {
        // eslint-disable-next-line camelcase
        const { is_submitted: isSubmitted } = event?.data ?? {};
        if (isSubmitted) {
          setTimeout(() => {
            MicroModal.close(this.modalId);
          }, closeAfterSubmit);
        }
      });
    }

    MicroModal.init({
      onShow: () => {
        const src = `${document.location.protocol}//${document.location.host}`;
        window.addEventListener('message', (event) => {
          console.log(event);
        }, false);
        window.postMessage('retrieve-shoppingcart', src);
      },
      onClose: () => {
        this.openTime += 1;
      },
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
  }

  createIframe() {
    const iframe = document.createElement('iframe', {});
    iframe.setAttribute('src', this.data.survey_url);
    if (this.data.popup_type === 'modal') {
      iframe.setAttribute('width', '1000px');
      iframe.setAttribute('height', '500px');
    }
    document.getElementById(`${this.modalId}-content`).appendChild(iframe);
  }

  createTimeout() {
    const timeout = this.data.popup_timeout;
    if (timeout <= 0 || Number.isNaN(timeout) || this.openTime > 0) {
      return;
    }
    setTimeout(() => {
      if (this.openTime > 0) {
        return;
      }
      MicroModal.show(this.modalId);
    }, timeout * 1000);
  }

  createHover() {
    let hoverCount = 0;
    const hoverId = this.data.show_when_hover_id;
    const maxHovertime = this.data.max_show_on_hover_times;
    if (!hoverId) {
      return;
    }
    try {
      document.getElementById(`#${hoverId}`).on('mouseover', () => {
        if (hoverCount >= maxHovertime) {
          return;
        }
        hoverCount += 1;
        MicroModal.show(this.modalId);
      });
    } catch (e) {
      console.log('Cannot find element to trigger openning the modal', hoverId);
    }
  }

  close() {
    setTimeout(() => {
      MicroModal.close(this.modalId);
    }, 50);
  }

  initClose() {
    const closers = document.querySelectorAll(`#${this.modalId} [data-modal-close]`);
    closers.forEach((node) => {
      node.addEventListener('click', () => {
        this.close();
      });
    });
  }
}
