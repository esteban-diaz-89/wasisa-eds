export default async function decorate(block) {

  const event = new CustomEvent("LoadHeader", {
    detail: { }
  });
  document.dispatchEvent(event);

}
