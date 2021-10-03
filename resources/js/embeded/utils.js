import * as Sqrl from 'squirrelly'

export function htmlToElement(html, data) {
    const template = document.createElement('template');
    const trimmed_html = html.trim();
    template.innerHTML = Sqrl.render(trimmed_html, data);
    return template.content.firstChild;
}
