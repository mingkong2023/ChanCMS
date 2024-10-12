//http://tinymce.ax-z.cn/configure/content-filtering.php#allow_conditional_comments
//  http://tinymce.ax-z.cn/
export let tinymceSet = {
  //避免图片地址和链接地址转换成相对路径
  convert_urls: false,
  // 开启组件拓展的 上传图片功能，工具栏 图片按钮 弹框中出现 `upload` 选项
  custom_images_upload: true,
  // 复用 图片上传 api 地址
  images_upload_url: "/api/upload",
  // 图片上传大小限制,默认200kb
  custom_images_limit_size: 1024 * 200,
  branding: false, //是否禁用“Powered by TinyMCE”
  menubar: true, //顶部菜单栏显示
  // image_dimensions: false, //去除宽高属性
  body_class: "article-content ",
  object_resizing: true, //是否允许调整图像大小.
  paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
  paste_merge_formats: true, //启用PowerPaste插件的合并格式功能，例如：<b>abc <b>bold</b> 123</b>成为<b>abc bold 123</b>
  end_container_on_empty_block: true, //如果在空的内部块元素中按下Enter键，则可以使用此选项拆分当前容器块元素。
  powerpaste_word_import: "clean", //保留标题，表格和列表等内容的结构，但删除内联样式和类。这样就产生了使用站点CSS样式表的简单内容，同时保留了原始文档的语义结构。
  advlist_bullet_styles: "default,circle,disc,square",
  advlist_number_styles:
    "default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman",
  default_link_target: "_blank", //默认链接是当前窗口打开，你也可以通过此参数将其变为_blank新窗口打开。
  link_title: false,
  nonbreaking_force_tab: true, // 按tab键插入三个&nbsp;。一直按一直插。
  // 上传成功回调函数，return 图片地址。默认 response.location
  custom_images_upload_callback: (res) => {
    if (res.code === 200) {
      return res.data.path;
    }
  },
  images_upload_credentials: true,
  // 上传 api 请求头
  custom_images_upload_header: { "X-Token": "xxxx" },
  // 上传 api 额外的参数。图片默认 file
  custom_images_upload_param: {},
  height: 550, // editor 高度
  toolbar:
    "undo redo| bold italic underline strikethrough | forecolor backcolor fontsize | blocks alignleft aligncenter alignright alignjustify   |numlist bullist | image media table |   link unlink  | indent outdent | superscript subscript | removeformat | code codesample |  fullscreen preview",
  toolbar_mode: "sliding",
  quickbars_selection_toolbar:
    "removeformat | bold italic underline strikethrough | fontsize forecolor backcolor",
  plugins:
    "link image media table lists fullscreen quickbars codesample preview code fullscreen",
  font_size_formats:
    "12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 44px 46px 48px 50px 52px",
  link_default_target: "_blank",
  //其他配置参数

  allow_html_in_named_anchor: true, //允许name锚点 <a name="tagId"></a>

  valid_children: "+div[p],+div[style]", // 支持div 包含p,支持style 支持class
  // 以中文简体为例
  language: "zh-Hans",
  language_url: "/public/admin/tinymce/zh-Hans.js",

  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
};
