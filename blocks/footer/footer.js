export default async function decorate(block) {

  const event = new CustomEvent("LoadFooter", {
    detail: { }
  });
  document.dispatchEvent(event);

}
