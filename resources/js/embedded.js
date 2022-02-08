import { baseUrl } from './embeded/config';
import '../css/default.scss';
import Modal from './embeded/modal';

(function () {
  const currentUrl = window.location.href;

  async function getContent() {
    const res = await fetch(`${baseUrl}/api/v1/banks?url=${currentUrl}`);
    const response = await res.json();
    return response.data;
  }

  window.addEventListener('load', () => {
    getContent().then((data) => {
      let modalData = data;
      if (!Array.isArray(data)) {
        modalData = [data];
      }
      modalData.forEach((item, index) => {
        if (!item || !item.is_enable) {
          return;
        }
        const modal = new Modal(`survey-${index + 1}`, item);
        modal.init();
      });
    });
  });
}());
