import MicroModal from "micromodal";
import style from './embeded/style';
import template from './embeded/template';
import {modal_id, base_url} from './embeded/config';
import {htmlToElement} from "./embeded/utils";

(function (){
    const currentUrl = window.location.href;

    function createPopup(data){
        const button_text = data.button_text ?? 'Open Survey';
        const button_color = data.button_color ?? 'black';
        const button_position = data.button_position ?? 'left';
        const close_btn_title = data.close_btn_title ?? 'Close';
        const header_img_url = data.header_img_url ?? null;

        const position_style = button_position === 'left' ? 'left: 0' : 'right: 0';

        const styles = document.createElement('style');
        styles.innerHTML = style;

        const popup = htmlToElement(template, {close_btn_title, header_img_url});

        const popupOpen = htmlToElement(`
            <div style="position: fixed;
                ${position_style};
                top: 50%;
                z-index: 10000;
                background: white;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.12);
                color: ${button_color};
                padding: 10px 5px;
                writing-mode: vertical-lr;
                cursor: pointer;
                font-weight: bold;">${button_text}</div>
        `)
        popupOpen.addEventListener('click', function () {
            MicroModal.show(modal_id);
        })
        document.querySelector('body').appendChild(styles);
        document.querySelector('body').appendChild(popup);
        document.querySelector('body').appendChild(popupOpen);

        MicroModal.init();
    }

    async function getContent(){
        const res = await fetch(`${base_url}/api/v1/banks?url=${currentUrl}`);
        const response = await res.json();
        return response.data;
    }

    function createIframe(data) {
        const iframe = document.createElement('iframe', {})
        iframe.setAttribute('src', data.survey_url);
        iframe.setAttribute('width', '1000px');
        iframe.setAttribute('height', '500px');
        document.getElementById(`${modal_id}-content`).appendChild(iframe);
    }

    function createTimeout(data) {
        const timeout = data.popup_timeout;
        if(timeout <= 0 || Number.isNaN(timeout)) {
            return;
        }
        setTimeout(() => {
            MicroModal.show(modal_id);
        }, timeout * 1000)
    }

    function createHover(data) {
        let hover_count = 0;
        const hover_id = data.show_when_hover_id;
        const max_hover_time = data.max_show_on_hover_times;
        if(!hover_id) {
            return;
        }
        $(`#${hover_id}`).on('mouseover', () => {
            if(hover_count >= max_hover_time) {
                return;
            }
            hover_count ++;
            MicroModal.show(modal_id);
        })
    }

    window.addEventListener('load', function() {
        getContent().then(data => {
            if (!data.is_enable) {
                return
            }
            createPopup(data);
            createIframe(data);
            createTimeout(data);
            createHover(data);
        })
    })
})();
