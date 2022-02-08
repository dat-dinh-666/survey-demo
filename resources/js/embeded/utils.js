import * as Sqrl from 'squirrelly';

export default function htmlToElement(html, data) {
  const template = document.createElement('template');
  const trimmedHtml = html.trim();
  template.innerHTML = Sqrl.render(trimmedHtml, data);
  return template.content.firstChild;
}
