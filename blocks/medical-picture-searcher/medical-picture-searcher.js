export default async function decorate(block) {

    block.setAttribute('data-component', 'cmp-medical-picture-search-react');

    const event = new CustomEvent('LoadSearch', {
      detail: { }
    });
    document.dispatchEvent(event);

}