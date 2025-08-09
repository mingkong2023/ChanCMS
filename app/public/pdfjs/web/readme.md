# pdf版本需求

pdfjs 3 可支持翻页
pdfjs-4.2.67-legacy-dist 也支持，不能翻页只能点击翻页

## 配置

``` javascript

 "disableAutoFetch": true,
 "disableStream": true
 ```

## 使用

```html
<p><iframe src="/public/pdfjs/web/viewer.html?file=/public/document/pdf/1.pdf" width="100%" height="800"></iframe></p>
```
