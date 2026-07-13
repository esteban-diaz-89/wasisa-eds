export function loadScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);

    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';

    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
}