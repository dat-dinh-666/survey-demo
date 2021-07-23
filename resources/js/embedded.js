import MicroModal from "micromodal";

(function (){
    const currentUrl = window.location.href;

    function htmlToElement(html) {
        const template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function createPopup(){
        const styles = document.createElement('style');
        styles.innerHTML = '/**************************\\\n' +
            '  Basic Modal Styles\n' +
            '\\**************************/\n' +
            '\n' +
            '.modal {\n' +
            '  font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;\n' +
            '}\n' +
            '\n' +
            '.modal__overlay {\n' +
            '  position: fixed;\n' +
            '  top: 0;\n' +
            '  left: 0;\n' +
            '  right: 0;\n' +
            '  bottom: 0;\n' +
            '  background: rgba(0,0,0,0.6);\n' +
            '  display: flex;\n' +
            '  justify-content: center;\n' +
            '  align-items: center;\n' +
            '}\n' +
            '\n' +
            '.modal__container {\n' +
            '  background-color: #fff;\n' +
            '  padding: 30px;\n' +
            '  max-width: 100vw;\n' +
            '  max-height: 100vh;\n' +
            '  border-radius: 4px;\n' +
            '  overflow-y: auto;\n' +
            '  box-sizing: border-box;\n' +
            '}\n' +
            '\n' +
            '.modal__header {\n' +
            '  display: flex;\n' +
            '  justify-content: space-between;\n' +
            '  align-items: center;\n' +
            '}\n' +
            '\n' +
            '.modal__title {\n' +
            '  margin-top: 0;\n' +
            '  margin-bottom: 0;\n' +
            '  font-weight: 600;\n' +
            '  font-size: 1.25rem;\n' +
            '  line-height: 1.25;\n' +
            '  color: #00449e;\n' +
            '  box-sizing: border-box;\n' +
            '}\n' +
            '\n' +
            '.modal__close {\n' +
            '  background: transparent;\n' +
            '  border: 0;\n' +
            '}\n' +
            '\n' +
            '.modal__header .modal__close:before { content: "\\2715"; }\n' +
            '\n' +
            '.modal__content {\n' +
            '  margin-top: 2rem;\n' +
            '  margin-bottom: 2rem;\n' +
            '  line-height: 1.5;\n' +
            '  color: rgba(0,0,0,.8);\n' +
            '}\n' +
            '\n' +
            '.modal__btn {\n' +
            '  font-size: .875rem;\n' +
            '  padding-left: 1rem;\n' +
            '  padding-right: 1rem;\n' +
            '  padding-top: .5rem;\n' +
            '  padding-bottom: .5rem;\n' +
            '  background-color: #e6e6e6;\n' +
            '  color: rgba(0,0,0,.8);\n' +
            '  border-radius: .25rem;\n' +
            '  border-style: none;\n' +
            '  border-width: 0;\n' +
            '  cursor: pointer;\n' +
            '  -webkit-appearance: button;\n' +
            '  text-transform: none;\n' +
            '  overflow: visible;\n' +
            '  line-height: 1.15;\n' +
            '  margin: 0;\n' +
            '  will-change: transform;\n' +
            '  -moz-osx-font-smoothing: grayscale;\n' +
            '  -webkit-backface-visibility: hidden;\n' +
            '  backface-visibility: hidden;\n' +
            '  -webkit-transform: translateZ(0);\n' +
            '  transform: translateZ(0);\n' +
            '  transition: -webkit-transform .25s ease-out;\n' +
            '  transition: transform .25s ease-out;\n' +
            '  transition: transform .25s ease-out,-webkit-transform .25s ease-out;\n' +
            '}\n' +
            '\n' +
            '.modal__btn:focus, .modal__btn:hover {\n' +
            '  -webkit-transform: scale(1.05);\n' +
            '  transform: scale(1.05);\n' +
            '}\n' +
            '\n' +
            '.modal__btn-primary {\n' +
            '  background-color: #00449e;\n' +
            '  color: #fff;\n' +
            '}\n' +
            '\n' +
            '\n' +
            '\n' +
            '/**************************\\\n' +
            '  Demo Animation Style\n' +
            '\\**************************/\n' +
            '@keyframes mmfadeIn {\n' +
            '    from { opacity: 0; }\n' +
            '      to { opacity: 1; }\n' +
            '}\n' +
            '\n' +
            '@keyframes mmfadeOut {\n' +
            '    from { opacity: 1; }\n' +
            '      to { opacity: 0; }\n' +
            '}\n' +
            '\n' +
            '@keyframes mmslideIn {\n' +
            '  from { transform: translateY(15%); }\n' +
            '    to { transform: translateY(0); }\n' +
            '}\n' +
            '\n' +
            '@keyframes mmslideOut {\n' +
            '    from { transform: translateY(0); }\n' +
            '    to { transform: translateY(-10%); }\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide {\n' +
            '  display: none;\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide.is-open {\n' +
            '  display: block;\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide[aria-hidden="false"] .modal__overlay {\n' +
            '  animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide[aria-hidden="false"] .modal__container {\n' +
            '  animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide[aria-hidden="true"] .modal__overlay {\n' +
            '  animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide[aria-hidden="true"] .modal__container {\n' +
            '  animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);\n' +
            '}\n' +
            '\n' +
            '.micromodal-slide .modal__container,\n' +
            '.micromodal-slide .modal__overlay {\n' +
            '  will-change: transform;\n' +
            '}\n' +
            '{"mode":"full","isActive":false}';

        const popup = htmlToElement(`
         <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
              <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <header class="modal__header">
                  <h2 class="modal__title" id="modal-1-title">
                  </h2>
                  <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                </header>
                <main class="modal__content" id="modal-1-content">
                </main>
                <footer class="modal__footer">
                  <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                </footer>
              </div>
            </div>
          </div>
`);

        const popupOpen = htmlToElement(`
            <div style="position: fixed;
                left: 0;
                top: 50%;
                z-index: 10000;
                background: white;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.12);
                color: #2626e8;
                padding: 10px 5px;
                writing-mode: vertical-lr;
                cursor: pointer;
                font-weight: bold;">Open</div>
        `)
        popupOpen.addEventListener('click', function () {
            MicroModal.show('modal-1');
        })
        document.querySelector('body').appendChild(styles);
        document.querySelector('body').appendChild(popup);
        document.querySelector('body').appendChild(popupOpen);

        MicroModal.init();
    }

    async function getContent(){
        const res = await fetch(`http://54.169.173.107/api/v1/banks?url=${currentUrl}`);
        const response = await res.json();
        return response.data;
    }

    function createIframe(data) {
        const iframe = document.createElement('iframe', {})
        iframe.setAttribute('src', data.survey_url);
        iframe.setAttribute('width', '1000px');
        iframe.setAttribute('height', '500px');
        document.getElementById('modal-1-content').appendChild(iframe);
    }

    window.addEventListener('load', function() {
        getContent().then(data => {
            if (!data.is_enable) {
                return
            }
            createIframe(data);
            createPopup();
        })
    })
})();
