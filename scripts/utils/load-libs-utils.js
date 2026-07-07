export function loadCSS(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[href="${url}"]`);

    if (existing) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    link.onload = resolve;
    link.onerror = reject;

    document.head.appendChild(link);
  });
}

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