/**
 * tinymce 工具函数
 * 无状态函数、可移植
 */
export const uuid = (prefix) => {
  return prefix + "_" + (Date.now() + Math.floor(Math.random() * 1000000));
};

export const getTinymce = () => {
  const root = typeof window !== "undefined" ? window : global;
  return root && "tinymce" in root ? root.tinymce : null;
};

export function getContent(editor) {
  if (!editor) return "";
  return editor.getContent();
}

export function setContent(val, editor) {
  if (!editor) return;
  editor.setContent(val);
}

export function resetContent(val, editor) {
  if (!editor) return;
  if (editor.resetContent) return editor.resetContent(val);
  // 若无 reset fun，则手动 reset
  editor.setContent(val);
  editor.setDirty(false); // 恢复初始状态
  editor.undoManager.clear();
}

export function setModeDisabled(editor, disabled = true) {
  if (!editor) return;
  editor.mode.set(disabled ? "readonly" : "design");
}

// custom images upload handler
// tinymce 6.x return Promise
export function imageUploadHandler(setting, blobInfo, progress) {
  return new Promise((resolve, reject) => {
    let {
      images_upload_url,
      images_upload_credentials,
      custom_images_upload_header,
      custom_images_upload_param,
      custom_images_upload_callback,
      custom_images_limit_size,
    } = setting || {};

    let xhr, formData;

    // 这里进行图片大小检查
    if (
      custom_images_limit_size &&
      blobInfo.blob().size > custom_images_limit_size
    ) {
      let msg = `图片大小不能超过 ${custom_images_limit_size / 1024}KB`;
      reject(msg);
      return;
    }
    xhr = new XMLHttpRequest();
    // 是否开启 withCredentials <= images_upload_credentials
    xhr.withCredentials = !!images_upload_credentials;
    // images_upload_url
    xhr.open("POST", images_upload_url || "");

    if (custom_images_upload_header) {
      Object.keys(custom_images_upload_header).forEach((key) => {
        xhr.setRequestHeader(key, custom_images_upload_header[key]);
      });
    }

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = function () {
      if (xhr.status === 403) {
        reject({ message: "HTTP Error: " + xhr.status, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject("HTTP Error: " + xhr.status);
        return;
      }

      let json = JSON.parse(xhr.responseText);

      if (!json) {
        reject("Invalid JSON: " + xhr.responseText);
        return;
      }

      // 处理返回图片地址 custom_images_upload_callback
      // 默认 json.location
      let backImgUrl =
        typeof custom_images_upload_callback === "function"
          ? custom_images_upload_callback(json)
          : json.location;

      if (!backImgUrl) {
        reject("Failed Path: location image path is error/empty");
        return;
      }

      resolve(backImgUrl);
    };

    xhr.onerror = function () {
      reject(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status,
      );
    };

    formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    // 额外的请求参数 custom_images_upload_param
    if (custom_images_upload_param) {
      Object.keys(custom_images_upload_param).forEach((key) => {
        formData.append(key, custom_images_upload_param[key]);
      });
    }

    xhr.send(formData);
  });
}

export function getContentStyle(style) {
  const defaultStyle = `body{font-size: 14px;} img{padding: 0 2px;} `;
  return defaultStyle + (style ? style : "");
}
