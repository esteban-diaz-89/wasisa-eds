import { loadScript } from '../../scripts/utils/load-libs-utils.js';
import { loadCSS } from '../../scripts/aem.js'

export default async function decorate(block) {

    const inner = block.querySelector(':scope > div > div');
    const resultA = inner.querySelector('a[title="result"]');

    const searchComponent = document.createElement('div');
    searchComponent.setAttribute('data-component', 'cmp-medical-picture-search-react');
    searchComponent.className = "eds-mp-react";
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