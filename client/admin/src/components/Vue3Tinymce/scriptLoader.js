import { uuid } from './utils';

const scriptLoaderCreator = () => {
  let state = {
    status: {},
    loadedCallbacks: {}
  };

  // 新建标签 script
  const creactScriptElm = (url, callback) => {
    const scriptElm = document.createElement('script');
    scriptElm.id = uuid('tiny-script');
    scriptElm.type = 'application/javascript';
    scriptElm.src = url;
    scriptElm.referrerPolicy = 'origin';

    const handler = () => {
      scriptElm.removeEventListener('load', handler);
      callback();
    };
    scriptElm.addEventListener('load', handler);

    (document.head || document.body).appendChild(scriptElm);
  };

  // 执行 callback function
  const execCallbacks = url => {
    if (!state.loadedCallbacks[url]) return;

    state.loadedCallbacks[url].forEach(callback => {
      if (typeof callback['handler'] === 'function') {
        callback['handler'].call(callback.scope);
      }
    });
    // 避免多次触发 LOADING 阶段 push 的 callback
    state.loadedCallbacks[url] = undefined;
  };

  /**
   * load 主函数
   * @param {*} url
   * @param {*} callback
   * @param {*} scope - 默认 this
   * @returns
   */
  const load = (url, callback, scope) => {
    if (callback) {
      if (!state.loadedCallbacks[url]) {
        state.loadedCallbacks[url] = [];
      }
      state.loadedCallbacks[url].push({
        handler: callback,
        scope: scope || this
      });
    }

    if (state.status[url] === 'LOADED') {
      execCallbacks(url);
      return;
    }

    if (state.status[url] !== 'LOADING') {
      state.status[url] = 'LOADING';
      creactScriptElm(url, () => {
        state.status[url] = 'LOADED';
        execCallbacks(url);
      });
    }
  };

  return {
    load
  };
};

const scriptLoader = scriptLoaderCreator();

export { scriptLoader };
