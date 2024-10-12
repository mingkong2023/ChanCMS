/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726 (5.7.26)
 Source Host           : localhost:3306
 Source Schema         : chanyue

 Target Server Type    : MySQL
 Target Server Version : 50726 (5.7.26)
 File Encoding         : 65001

 Date: 23/09/2024 23:15:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cms_article
-- ----------------------------
DROP TABLE IF EXISTS `cms_article`;
CREATE TABLE `cms_article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NULL DEFAULT NULL COMMENT '栏目id',
  `subCid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '其它栏目id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `shortTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短标题',
  `tagId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签id',
  `attr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1头条 2推荐 3轮播 4热门',
  `articleView` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详情页模板',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '来源',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章简述',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '缩略图',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章内容',
  `status` tinyint(2) NULL DEFAULT 0 COMMENT '0 发布 1 不发布',
  `pv` int(10) NULL DEFAULT 0 COMMENT '浏览量',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '外链',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_article
-- ----------------------------
INSERT INTO `cms_article` VALUES (1, 1, NULL, 'ChanCMS内容管理系统', '', '', '', '', '', '', 'ChanCMS是一款基于Node、Express、MySQL、Vue3研发的高质量实用型CMS系统。轻量、灵活、稳定、高性能、易扩展，让开发更简单。', '', '<p>ChanCMS是一款基于Node、Express、MySQL、Vue3研发的高质量实用型CMS系统。轻量、灵活、稳定、高性能、易扩展，让开发更简单。</p>\n<ul>\n<li>自研。基于自研chanjs轻量级mvc框架实现，轻量、灵活、稳定、高性能、可持续。</li>\n<li>SEO。专注于<code>seo</code>,伪静态<code>html</code>和拼音导航，灵活设置关键词和描述。</li>\n<li>安全。基于<code>knex</code>,高防<code>sql</code>注入，接口权限校验，为安全提供保障。</li>\n<li>灵活。碎片功能，支持零碎文案配置，方便各类灵活文案配置。</li>\n<li>高扩展。支持扩展模型，字段配置，可动态生成表，超强扩展。</li>\n<li>模块化。一切模块相互独立，互不干扰。</li>\n<li>插件化。灵活开发，支持完整功能模块。</li>\n<li>无头cms，为多端提供接口支持。</li>\n</ul>', 0, 3, '', '2024-09-13 22:49:28', '2024-09-13 22:58:22');
INSERT INTO `cms_article` VALUES (2, 2, '', '风景图', '', '', '', '', '', '', '山峰树林湖泊', '/public/cover/04.jpg', '<p><img src=\"https://q5.itc.cn/q_70/images03/20240706/62869b54ec3c4ea5a842b97ac9722630.jpeg\" alt=\"\" width=\"2062\" height=\"1200\"></p>', 0, 7, '', '2024-09-13 22:55:57', '2024-09-21 21:19:24');
INSERT INTO `cms_article` VALUES (3, 3, NULL, 'ChanCMS后台基本操作', '', '', '', '', '', '', 'ChanCMS后台基本操作', '', '<p><iframe src=\"//player.bilibili.com/player.html?isOutside=true&amp;aid=877077167&amp;bvid=BV17N4y1Y7WC&amp;cid=1362009352&amp;p=1\" height=\"520\" frameborder=\"no\" scrolling=\"no\" allowfullscreen=\"allowfullscreen\"></iframe></p>', 0, 3, '', '2024-09-13 22:59:58', '2024-09-13 23:03:20');
INSERT INTO `cms_article` VALUES (4, 4, NULL, 'ChanCMS v3.0.6下载', '', '', '', '', '', '', 'ChanCMS v3.0.6下载', '', '欢迎使用ChanCMS系统', 0, 2, '', '2024-09-13 23:03:25', '2024-09-13 23:04:41');
INSERT INTO `cms_article` VALUES (5, 6, '', 'ChanCMS简介', '', '', '', '', '', '', 'ChanCMS简介', '', '欢迎使用ChanCMS系统', 0, 6, '', '2024-09-13 23:06:30', '2024-09-21 21:19:33');

-- ----------------------------
-- Table structure for cms_articletag
-- ----------------------------
DROP TABLE IF EXISTS `cms_articletag`;
CREATE TABLE `cms_articletag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL COMMENT '文章id',
  `tid` int(11) NULL DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章-标签表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_articletag
-- ----------------------------
INSERT INTO `cms_articletag` VALUES (1, 1, 0);
INSERT INTO `cms_articletag` VALUES (3, 3, 0);
INSERT INTO `cms_articletag` VALUES (4, 4, 0);
INSERT INTO `cms_articletag` VALUES (6, 5, 0);
INSERT INTO `cms_articletag` VALUES (8, 2, 0);

-- ----------------------------
-- Table structure for cms_category
-- ----------------------------
DROP TABLE IF EXISTS `cms_category`;
CREATE TABLE `cms_category`  (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT COMMENT '栏目id',
  `pid` tinyint(2) NOT NULL DEFAULT 0 COMMENT '父级栏目',
  `seoTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'seo标题',
  `seoKeywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'seo关键字',
  `seoDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'seo描述',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '栏目名称',
  `pinyin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '栏目标识',
  `path` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '栏目路径',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '栏目描述',
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '0 栏目 1 页面',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '网址',
  `orderBy` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `target` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '打开方式 0 当前页面打开 1 新页面打开',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '0 显示 1隐藏',
  `mid` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '0' COMMENT '模型id',
  `listView` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'list.html' COMMENT '列表页模板',
  `articleView` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'article.html' COMMENT '详情页模板',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '网站栏目' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_category
-- ----------------------------
INSERT INTO `cms_category` VALUES (1, 0, '', '', '', '文章', 'art', '/art', '', '0', '', 0, '0', '0', '0', 'list.html', 'article.html', '2024-09-13 22:38:12', '2024-09-13 22:51:31');
INSERT INTO `cms_category` VALUES (2, 0, '', '', '', '图片', 'pics', '/pics', '', '0', '', 0, '0', '0', '0', 'list.html', 'article.html', '2024-09-13 22:39:02', '2024-09-13 22:39:02');
INSERT INTO `cms_category` VALUES (3, 0, '', '', '', '视频', 'video', '/video', '', '0', '', 0, '0', '0', '0', 'list.html', 'article.html', '2024-09-13 22:39:22', '2024-09-13 22:39:22');
INSERT INTO `cms_category` VALUES (4, 0, '', '', '', '下载', 'down', '/down', '', '0', '', 0, '0', '0', '0', 'list.html', 'article.html', '2024-09-13 22:39:44', '2024-09-13 22:39:44');
INSERT INTO `cms_category` VALUES (5, 0, '', '', '', '专题', 'topic', '/topic', '', '1', '', 0, '0', '0', '0', 'list.html', 'page.html', '2024-09-13 22:42:10', '2024-09-13 23:09:22');
INSERT INTO `cms_category` VALUES (6, 0, '', '', '', '关于', 'about', '/about', '', '1', '', 0, '0', '0', '0', 'list.html', 'page.html', '2024-09-13 22:42:55', '2024-09-13 23:09:29');

-- ----------------------------
-- Table structure for cms_field
-- ----------------------------
DROP TABLE IF EXISTS `cms_field`;
CREATE TABLE `cms_field`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NULL DEFAULT NULL COMMENT '模型id',
  `cname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模型字段中文名称',
  `ename` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '模型字段英文名称',
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '表单类型\r\n1单行文本	\r\n2.多行文本 \r\n3.下拉菜单 \r\n4.单选 \r\n5.多选 \r\n6.时间和日期 7.数字',
  `val` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字段配置 下拉菜单多选等选项配置',
  `defaultVal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '默认值',
  `orderBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '字段顺序',
  `length` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字段长度',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `model_id`(`mid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字段字典' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_field
-- ----------------------------

-- ----------------------------
-- Table structure for cms_frag
-- ----------------------------
DROP TABLE IF EXISTS `cms_frag`;
CREATE TABLE `cms_frag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '名称',
  `mark` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标识',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `type` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '类型 1 富文本 2 文本框',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '碎片' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_frag
-- ----------------------------
INSERT INTO `cms_frag` VALUES (1, 'chancms简介', 'chancms', '<p>ChanCMS是一款基于Node、Express、MySQL、Vue3研发的高质量实用型CMS系统。轻量、灵活、稳定、高性能、易扩展，让开发更简单。</p>', '1', '2024-09-13 22:53:33', '2024-09-13 22:53:51');

-- ----------------------------
-- Table structure for cms_friendlink
-- ----------------------------
DROP TABLE IF EXISTS `cms_friendlink`;
CREATE TABLE `cms_friendlink`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链接名称',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链接地址',
  `orderBy` tinyint(255) NULL DEFAULT 0 COMMENT '排序',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '友情链接' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_friendlink
-- ----------------------------

-- ----------------------------
-- Table structure for cms_message
-- ----------------------------
DROP TABLE IF EXISTS `cms_message`;
CREATE TABLE `cms_message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('1','2','3','4') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言分类 1->咨询 2->建议 3->投诉 4->其它',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言标题',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `tel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `wechat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信',
  `company` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司名称',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言内容',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '留言' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_message
-- ----------------------------

-- ----------------------------
-- Table structure for cms_model
-- ----------------------------
DROP TABLE IF EXISTS `cms_model`;
CREATE TABLE `cms_model`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模型名称',
  `tableName` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模型对应的表名',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '1->开启 0->关闭',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '模型字典' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_model
-- ----------------------------

-- ----------------------------
-- Table structure for cms_site
-- ----------------------------
DROP TABLE IF EXISTS `cms_site`;
CREATE TABLE `cms_site`  (
  `id` int(2) NOT NULL AUTO_INCREMENT COMMENT '站点id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网站名称',
  `domain` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网站域名',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `wx` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信',
  `icp` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ICP备案号',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '站点统计代码',
  `json` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '万能配置',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '页面标题',
  `keywords` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '页面关键词',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '页面描述',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '网站信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_site
-- ----------------------------
INSERT INTO `cms_site` VALUES (1, 'ChanCMS', 'www.chancms.top', '867528315@qq.com', NULL, '皖ICP备2024033678号-1', '', '', 'ChanCMS', 'ChanCMS', 'ChanCMS是一款基于Express和MySQL研发的高质量实用型CMS管理系统。它具备多种类型网站开发，易扩展、基于模块化和插件化开发模式，适用于商用企业级程序开发。', NULL, '2024-08-22 15:46:40');

-- ----------------------------
-- Table structure for cms_slide
-- ----------------------------
DROP TABLE IF EXISTS `cms_slide`;
CREATE TABLE `cms_slide`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '轮播图',
  `linkUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '轮播链接',
  `mark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '轮播图' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_slide
-- ----------------------------

-- ----------------------------
-- Table structure for cms_tag
-- ----------------------------
DROP TABLE IF EXISTS `cms_tag`;
CREATE TABLE `cms_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '标识',
  `count` int(11) NULL DEFAULT 0 COMMENT '引用次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '标签' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cms_tag
-- ----------------------------

-- ----------------------------
-- Table structure for plus_collect
-- ----------------------------
DROP TABLE IF EXISTS `plus_collect`;
CREATE TABLE `plus_collect`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `taskName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '任务名称',
  `targetUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '采集地址',
  `listTag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '列表tag标签',
  `startNum` int(11) NULL DEFAULT 1 COMMENT '开始页面',
  `endNum` int(11) NULL DEFAULT NULL COMMENT '结束页面',
  `increment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '递增数量默认1',
  `titleTag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `articleTag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文章内容',
  `charset` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '编码 1-> utf-8  2-> gb2312',
  `pages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '采集地址集合',
  `parseData` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '格式化数据函数',
  `cid` int(11) NULL DEFAULT NULL COMMENT '存储到栏目',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '发布状态 1 草稿 2 发布',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '采集' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of plus_collect
-- ----------------------------
INSERT INTO `plus_collect` VALUES (1, '草堂札记', 'http://www.news.cn/', '#headline h1 a', 1, 1, '1', '.head-line h1', '#detail', '1', 'http://www.news.cn/politics/xxjxs/20240810/e3701f953af54eb796a3fbd278748366/c.html', '// 你的目标URL前缀\nvar urlPrefix = \"http://www.news.cn/politics/xxjxs/20240810/e3701f953af54eb796a3fbd278748366/\";\n// 使用正则表达式进行全局匹配和替换\ndata = data.replaceAll(/(<img[^>]*src=[\"\'])([^\"\']*)(\".*>)/g, function(match, p1, p2, p3) {\n    return p1 + urlPrefix + p2 + p3;\n});\n\n// 移除所有 <span> 标签\ndata = data.replace(/<span[^>]*>(.*?)<\\/span>/g, \'$1\');\n// 移除所有 class 属性\ndata = data.replace(/ class\\s*=\\s*[\"\\\']([^\"\\\']*)[\"\\\']/g, \'\');\n// 移除所有内联样式 style 属性\ndata = data.replace(/ style\\s*=\\s*[\"\\\']([^\"\\\']*)[\"\\\']/g, \'\');\n// 使用replace函数删除匹配的部分\ndata= data.replace(/<div[^>]+id\\s*=\\s*[\'\"]articleEdit[\'\"][^>]*>[\\s\\S]*<\\/div>/g, \'\');\n// 移除多余空格，注意保留 <p> 标签内的空格\ndata = data.replace(/>\\s+</g, \'> <\'); // 移除标签间的空格\ndata = data.replace(/\\s{2,}/g, \' \');  // 移除两个或以上的空格\n// 移除首尾空格\ndata = data.trim();\nreturn data;', 15, '1', '2023-09-29 19:33:57', '2024-08-11 18:09:56');
INSERT INTO `plus_collect` VALUES (2, '人民网-top文章', 'http://www.people.com.cn/', '#rm_topline a', 1, 1, '1', '#newstit', '.rm_txt_con', '1', 'http://js.people.com.cn/n2/2024/0822/c360301-40951625.html', '//图片加域名\nvar urlPrefix = \"http://www.people.com.cn/\";\n    data = data.replace(/(<img[^>]*src=[\"\'])([^\"\']*)(\".*>)/g, function(match, p1, p2, p3) {\n        return p1 + urlPrefix + p2 + p3;\n    });\n//删除分享\ndata = data .replace(/<p\\s+class=\"paper_num\"[^>]*>[\\s\\S]*<\\/p>/gi, \'\');\n//删除编辑\ndata = data .replace(/<div\\s+class=\"(?:edit\\s+)[^\"]*\"[^>]*>[\\s\\S]*<\\/div>/gi, \'\');\n// 移除 style 属性中的所有样式，但保留 text-align: center;\ndata = data .replace(/ style\\s*=\\s*[\'\"]([^\'\"]*)[\'\"]/g, function(match, style) {\n    // 检查是否已包含 text-align: center;\n    if (style.includes(\'text-align: center;\')) {\n        // 如果存在 text-align: center; 则只保留它\n        return ` style=\"text-align: center;\"`;\n    } else {\n        // 如果不存在 text-align: center; 则移除整个 style 属性\n        return \'\';\n    }\n});\n//清理class\ndata = data.replace(/ class\\s*=\\s*[\'\"]([^\'\\\"]*)[\'\"]/g, \'\');\n//清理空格\ndata = data.replace(/\\s+/g, \' \');\ndata = data.trim();\n//清理空span标签\ndata = data.replaceAll(\'<span></span>\', \'\');\n//清理空p标签\ndata = data.replaceAll(\'<p></p>\', \'\');\n//清理空div标签\ndata = data.replaceAll(\'<div></div>\', \'\');\n//清理空table标签\ndata = data .replace(/<table[^>]*>[\\s\\S]*<\\/table>/gi, \'\');\nreturn data;', 3, '1', '2024-08-22 16:27:19', '2024-08-22 17:27:09');

-- ----------------------------
-- Table structure for plus_gather
-- ----------------------------
DROP TABLE IF EXISTS `plus_gather`;
CREATE TABLE `plus_gather`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `taskName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '任务名称',
  `targetUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '采集地址',
  `parseData` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '格式化数据函数',
  `cid` int(11) NULL DEFAULT NULL COMMENT '存储到栏目',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '发布状态 1 草稿 2 发布',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '开源接口采集' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of plus_gather
-- ----------------------------
INSERT INTO `plus_gather` VALUES (3, '60s1', 'https://api.qqsuu.cn/api/dm-60s?type=json', 'let cont = \'\';\ndata.data.news.map((item)=>{\n   cont +=\'<p>\'+ item+\'</p>\'\n})\nreturn {article:cont ,weiyu:data.data.weiyu,title:\'ChanCMS早间新闻—\'+data.data.date};', 1, '2', '2023-11-29 19:10:45', '2024-08-23 16:09:49');
INSERT INTO `plus_gather` VALUES (4, '60s稳定版本', 'https://api.j4u.ink/v1/store/other/proxy/remote/news/60.json', 'let obj = {\n	title:\'\',\n	content:\'\'\n}\nif(data.code == 200){\n	obj.title = \"香港日报新闻60秒\"+ data.data.date_info.date;\n	let p = \'\';\n	data.data.news.forEach((item)=>{\n	  p += \'<p>\'+item +\'</p>\'\n	});\n       p+=\'<p>[香港日报微语]：\'+data.data.weiyu+\'</p>\'\n      obj.content = p;\n}\nreturn obj;', 15, '1', '2023-12-01 00:03:35', '2023-12-10 19:36:36');

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `template` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'default' COMMENT 'view模板名称',
  `appid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信小程序appid',
  `secret` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信小程序秘钥',
  `accessKey` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '七牛云ak',
  `secretKey` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '七牛云sk',
  `domain` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '七牛云域名',
  `bucket` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '七牛云bucket',
  `uploadWay` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '上传方式 1->普通 2->七牛云',
  `maxAge` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '静态资源缓存 1开启 2关闭',
  `dataCache` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '全局模板数据缓存 1开启 2关闭',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '应用配置' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, 'default', 'chancms', 'chancms', 'test', 'test', 'chancms.top', 'test', '1', '2', '2', '2023-10-07 21:52:21', '2024-09-13 22:35:04');

-- ----------------------------
-- Table structure for sys_loginlog
-- ----------------------------
DROP TABLE IF EXISTS `sys_loginlog`;
CREATE TABLE `sys_loginlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '国家',
  `prov` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '省',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '市',
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '区',
  `isp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网络提供商',
  `lat` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '纬度',
  `lng` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '经度',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid`(`uid`, `createdAt`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_loginlog
-- ----------------------------
INSERT INTO `sys_loginlog` VALUES (1, 3, '112.80.235.47', '中国', '江苏省', '南京市', '秦淮区', '中国联通', '32.003749', '118.805657', '2024-09-13 22:34:45');
INSERT INTO `sys_loginlog` VALUES (2, 2, '112.80.235.47', '中国', '江苏省', '南京市', '秦淮区', '中国联通', '32.003749', '118.805657', '2024-09-13 22:35:37');
INSERT INTO `sys_loginlog` VALUES (3, 1, '112.80.234.195', '中国', '江苏省', '南京市', '秦淮区', '中国联通', '32.003749', '118.805657', '2024-09-21 21:08:49');
INSERT INTO `sys_loginlog` VALUES (4, 1, '112.80.234.195', '中国', '江苏省', '南京市', '秦淮区', '中国联通', '32.003749', '118.805657', '2024-09-23 23:10:03');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '菜单配置',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (2, '{\"route\":[{\"path\":\"/home\",\"name\":\"home-info\",\"component\":\"@/views/home/info.vue\",\"meta\":{\"title\":\"网站信息\",\"icon\":\"DataLine\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/site\",\"name\":\"site\",\"meta\":{\"title\":\"站点管理\",\"icon\":\"Monitor\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]},\"redirect\":\"/site-index\",\"children\":[{\"path\":\"/site-index\",\"name\":\"site-index\",\"component\":\"@/views/home/site.vue\",\"meta\":{\"title\":\"站点设置\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}}]},{\"path\":\"/content\",\"name\":\"content\",\"meta\":{\"title\":\"内容管理\",\"isShow\":true,\"icon\":\"Grid\",\"role\":[\"admin\",\"super\",\"editor\"]},\"redirect\":\"/category\",\"children\":[{\"path\":\"/category\",\"name\":\"category-index\",\"component\":\"@/views/category/index.vue\",\"meta\":{\"title\":\"栏目管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/category/add\",\"name\":\"category-add\",\"component\":\"@/views/category/add.vue\",\"meta\":{\"title\":\"栏目管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/category/edit/:id\",\"name\":\"category-edit\",\"component\":\"@/views/category/edit.vue\",\"meta\":{\"title\":\"页面管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/article\",\"name\":\"article-index\",\"component\":\"@/views/article/index.vue\",\"meta\":{\"title\":\"文章管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/article/add\",\"name\":\"article-add\",\"component\":\"@/views/article/add.vue\",\"meta\":{\"title\":\"文章管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/article/edit/:id\",\"name\":\"article-edit\",\"component\":\"@/views/article/edit.vue\",\"meta\":{\"title\":\"文章管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/slide\",\"name\":\"slide-index\",\"component\":\"@/views/slide/index.vue\",\"meta\":{\"title\":\"轮播管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/slide/add\",\"name\":\"slide-add\",\"component\":\"@/views/slide/add.vue\",\"meta\":{\"title\":\"轮播管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/slide/edit/:id\",\"name\":\"slide-edit\",\"component\":\"@/views/slide/edit.vue\",\"meta\":{\"title\":\"轮播管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/tag\",\"name\":\"tag-index\",\"component\":\"@/views/tag/index.vue\",\"meta\":{\"title\":\"标签管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/tag/add\",\"name\":\"tag-add\",\"component\":\"@/views/tag/add.vue\",\"meta\":{\"title\":\"标签管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/tag/edit/:id\",\"name\":\"tag-edit\",\"component\":\"@/views/tag/edit.vue\",\"meta\":{\"title\":\"标签管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/frag\",\"name\":\"frag-index\",\"component\":\"@/views/frag/index.vue\",\"meta\":{\"title\":\"碎片管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/frag/add\",\"name\":\"frag-add\",\"component\":\"@/views/frag/add.vue\",\"meta\":{\"title\":\"碎片管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/frag/edit/:id\",\"name\":\"frag-edit\",\"component\":\"@/views/frag/edit.vue\",\"meta\":{\"title\":\"碎片管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}}]},{\"path\":\"/gather\",\"name\":\"gather\",\"meta\":{\"title\":\"采集功能\",\"icon\":\"MagicStick\",\"isShow\":true,\"role\":[\"super\"]},\"redirect\":\"/collect\",\"children\":[{\"path\":\"/collect\",\"name\":\"collect-index\",\"component\":\"@/views/collect/index.vue\",\"meta\":{\"title\":\"页面采集\",\"isShow\":true,\"role\":[\"super\"]}},{\"path\":\"/collect/add\",\"name\":\"collect-add\",\"component\":\"@/views/collect/add.vue\",\"meta\":{\"title\":\"页面采集-新增\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/collect/:id\",\"name\":\"collect-edit\",\"component\":\"@/views/collect/edit.vue\",\"meta\":{\"title\":\"页面采集-更新\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/gather\",\"name\":\"gather-index\",\"component\":\"@/views/gather/index.vue\",\"meta\":{\"title\":\"接口采集\",\"isShow\":true,\"role\":[\"super\"]}},{\"path\":\"/gather/add\",\"name\":\"gather-add\",\"component\":\"@/views/gather/add.vue\",\"meta\":{\"title\":\"接口采集-新增\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/gather/edit/:id\",\"name\":\"gather-edit\",\"component\":\"@/views/gather/edit.vue\",\"meta\":{\"title\":\"接口采集-更新\",\"isShow\":false,\"role\":[\"super\"]}}]},{\"path\":\"/extend\",\"name\":\"extend\",\"meta\":{\"title\":\"功能管理\",\"icon\":\"Operation\",\"isShow\":true,\"role\":[\"super\",\"admin\",\"editor\"]},\"children\":[{\"path\":\"/model\",\"name\":\"model-index\",\"component\":\"@/views/model/index.vue\",\"meta\":{\"title\":\"模型管理\",\"isShow\":true,\"role\":[\"super\"]}},{\"path\":\"/model/add\",\"name\":\"model-add\",\"component\":\"@/views/model/add.vue\",\"meta\":{\"title\":\"模型管理-新增\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/model/edit/:id\",\"name\":\"model-edit\",\"component\":\"@/views/model/edit.vue\",\"meta\":{\"title\":\"模型管理-更新\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/model/field\",\"name\":\"field-index\",\"component\":\"@/views/field/index.vue\",\"meta\":{\"title\":\"字段管理\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/model/field/add\",\"name\":\"field-add\",\"component\":\"@/views/field/add.vue\",\"meta\":{\"title\":\"字段管理-新增\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/model/field/edit\",\"name\":\"field-edit\",\"component\":\"@/views/field/edit.vue\",\"meta\":{\"title\":\"字段管理-更新\",\"isShow\":false,\"role\":[\"super\"]}},{\"path\":\"/friendlink\",\"name\":\"friendlink-index\",\"component\":\"@/views/friendlink/index.vue\",\"meta\":{\"title\":\"友情链接\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/friendlink/add\",\"name\":\"friendlink-add\",\"component\":\"@/views/friendlink/add.vue\",\"meta\":{\"title\":\"友情链接-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/friendlink/edit/:id\",\"name\":\"friendlink-edit\",\"component\":\"@/views/friendlink/edit.vue\",\"meta\":{\"title\":\"友情链接-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/message\",\"name\":\"message-index\",\"component\":\"@/views/message/index.vue\",\"meta\":{\"title\":\"消息管理\",\"isShow\":true,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/message/add\",\"name\":\"message-add\",\"component\":\"@/views/message/add.vue\",\"meta\":{\"title\":\"消息管理-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}},{\"path\":\"/message/edit/:id\",\"name\":\"message-edit\",\"component\":\"@/views/message/edit.vue\",\"meta\":{\"title\":\"消息管理-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\",\"editor\"]}}]},{\"path\":\"/sys\",\"name\":\"sys\",\"meta\":{\"title\":\"系统管理\",\"isShow\":true,\"icon\":\"Setting\",\"role\":[\"admin\",\"super\"]},\"redirect\":\"/user\",\"children\":[{\"path\":\"/user\",\"name\":\"user-index\",\"component\":\"@/views/user/index.vue\",\"meta\":{\"title\":\"用户管理\",\"isShow\":true,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/user/add\",\"name\":\"user-add\",\"component\":\"@/views/user/add.vue\",\"meta\":{\"title\":\"用户列表-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/user/edit/:id\",\"name\":\"user-edit\",\"component\":\"@/views/user/edit.vue\",\"meta\":{\"title\":\"用户列表-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/role\",\"name\":\"role-index\",\"component\":\"@/views/role/index.vue\",\"meta\":{\"title\":\"角色管理\",\"isShow\":true,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/role/add\",\"name\":\"role-add\",\"component\":\"@/views/role/add.vue\",\"meta\":{\"title\":\"角色列表-新增\",\"isShow\":false,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/role/edit/:id\",\"name\":\"role-edit\",\"component\":\"@/views/role/edit.vue\",\"meta\":{\"title\":\"角色列表-更新\",\"isShow\":false,\"role\":[\"admin\",\"super\"]}},{\"path\":\"/menu\",\"name\":\"menu-index\",\"component\":\"@/views/menu/index.vue\",\"meta\":{\"title\":\"菜单管理\",\"isShow\":true,\"role\":[\"super\"]}},{\"path\":\"/loginlog\",\"name\":\"loginLog-index\",\"component\":\"@/views/loginlog/index.vue\",\"meta\":{\"title\":\"登录日志\",\"isShow\":true,\"role\":[\"admin\",\"super\"]}}]}]}', NULL);

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告类型（1通知 2公告）',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公告内容',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公告状态（0关闭  1正常）',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '通知公告表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `value` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色值',
  `sort` int(4) NOT NULL DEFAULT 0 COMMENT '显示顺序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '角色状态（1正常 0停用）',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'super', 0, '1', NULL, '2023-10-30 21:57:52', '2023-10-30 22:00:50');
INSERT INTO `sys_role` VALUES (2, '普通管理员', 'admin', 0, '1', NULL, '2023-10-30 22:01:04', '2023-10-30 22:01:04');
INSERT INTO `sys_role` VALUES (3, '编辑管理', 'editor', 0, '1', NULL, '2023-10-30 22:01:11', '2023-10-30 22:02:14');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `role_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号',
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '帐号状态（1正常 0停用）',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, '1', 'chancms', '1d73632ebe6497078f6744bf79bd2861', '1', NULL, '2023-10-30 22:42:01', '2024-05-31 21:33:11');
INSERT INTO `sys_user` VALUES (2, '1', 'super', '1d73632ebe6497078f6744bf79bd2861', '1', NULL, '2023-10-30 22:42:18', '2024-09-13 22:45:53');
INSERT INTO `sys_user` VALUES (3, '3', 'admin', '1d73632ebe6497078f6744bf79bd2861', '1', NULL, '2023-10-31 00:06:55', '2024-09-13 22:46:01');

SET FOREIGN_KEY_CHECKS = 1;
