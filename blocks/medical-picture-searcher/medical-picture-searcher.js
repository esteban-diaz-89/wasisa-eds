export default async function decorate(block) {

  const event = new CustomEvent("LoadSearch", {
    detail: { }
  });
  document.dispatchEvent(event);

}