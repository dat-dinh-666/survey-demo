import * as Sqrl from 'squirrelly';

export default function htmlToElement(html, data) {
  const template = document.createElement('template');
  const trimmedHtml = html.trim();
  template.innerHTML = Sqrl.render(trimmedHtml, data);
  return template.content.firstChild;
}

export function insertHTML(html, dest, append = false){
    if(!append) dest.innerHTML = '';
    let container = document.createElement('div');
    container.innerHTML = html;
    let scripts = container.querySelectorAll('script');
    let nodes = container.childNodes;
    for( let i=0; i< nodes.length; i++) dest.appendChild( nodes[i].cloneNode(true) );
    for( let i=0; i< scripts.length; i++){
        let script = document.createElement('script');
        script.type = scripts[i].type || 'text/javascript';
        if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
        script.innerHTML = scripts[i].innerHTML;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
    return true;
}
