export default async function (style) {
    switch (style) {
        case 'sidebar': return await import('../../css/sidebar.scss'); break;
        case 'modal': return await import('../../css/modal.scss'); break;
        default: return await import('../../css/modal.scss'); break;
    }
}
