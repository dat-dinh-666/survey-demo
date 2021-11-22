export default function (style) {
    switch (style) {
        case 'sidebar': return import('../../css/sidebar.scss'); break;
        case 'modal': return import('../../css/modal.scss'); break;
        default: return import('../../css/modal.scss'); break;
    }
}
