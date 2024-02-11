const scriptUrl = 'https://editor.unlayer.com/embed.js';
const callbacks = [];
let loaded = false;

const isScriptInjected = () => {
  const scripts = document.querySelectorAll('script');
  let injected = false;

  scripts.forEach((script) => {
    if (script.src.includes(scriptUrl)) {
      injected = true;
    }
  });

  return injected;
};

const addCallback = (callback: any) => {
  callbacks.push(callback);
};

const runCallbacks = () => {
  if (loaded) {
    let callback;

    // tslint:disable-next-line:no-conditional-assignment
    while ((callback = callbacks.shift())) {
      callback();
    }
  }
};

export const loadScript = (callback) => {
  addCallback(callback);

  if (!isScriptInjected()) {
    const embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = () => {
      loaded = true;
      runCallbacks();
    };
    document.head.appendChild(embedScript);
  } else {
    runCallbacks();
  }
};
