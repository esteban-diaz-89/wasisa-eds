export default async function decorate(block) {

    const searchComponent = document.createElement('div');
    searchComponent.setAttribute('data-component', 'cmp-medical-picture-search-react');
    block.querySelector('div > div').appendChild(searchComponent);

    const event = new CustomEvent('LoadSearch', {
      detail: { }
    });
    document.dispatchEvent(event);

}