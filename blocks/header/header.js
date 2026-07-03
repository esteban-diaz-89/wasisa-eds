import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {

  const event = new CustomEvent("LoadHeader", {
    environment: 'stage'
  });
  window.dispatchEvent(event);

}
