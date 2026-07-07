import { loadCSS, loadScript } from '../../scripts/utils/load-libs-utils.js';

export default async function decorate(block) {

    await loadCSS('http://localhost/etc.clientlibs/wasisa/clientlibs/clientlib-react-medical-picture-search-cmp.min.css');
    await loadScript('http://localhost/etc.clientlibs/wasisa/clientlibs/clientlib-react-medical-picture-search-cmp.min.js',
      { type: 'module' }
    );

    const inner = block.querySelector(':scope > div > div');
    const resultA = inner.querySelector('a[title="result"]');

    const searchComponent = document.createElement('div');
    searchComponent.setAttribute('data-component', 'cmp-medical-picture-search-react');
    searchComponent.className = "eds-mp-user";
    const dataPropsJson = `{
        "data" : {
            "view" : "results",
            "networkId" : "1",
            "networkName" : "Salud"
        },
        "paths" : {
            "resultsUrl" : "${resultA?.href}"
        }
    }`;
    searchComponent.setAttribute('data-props', dataPropsJson);

    inner.textContent = '';
    inner.appendChild(searchComponent);

    const event = new CustomEvent('LoadSearch', {
      detail: { }
    });
    document.dispatchEvent(event);

}