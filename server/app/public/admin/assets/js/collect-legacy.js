System.register(["./index-legacy.js"],(function(e,t){"use strict";var l,a;return{setters:[e=>{l=e.e,a=e.A}],execute:function(){e("g",(e=>l({url:`${a.BASE_API}/api/collect/getPages`,method:"post",data:e}))),e("a",(e=>l({url:`${a.BASE_API}/api/collect/getArticle`,method:"post",data:e}))),e("c",(e=>l({url:`${a.BASE_API}/api/collect/create`,method:"post",data:e}))),e("u",(e=>l({url:`${a.BASE_API}/api/collect/update`,method:"post",data:e}))),e("l",(e=>l({url:`${a.BASE_API}/api/collect/list?cur=${e}&pageSize=20`,method:"get"}))),e("b",(e=>l({url:`${a.BASE_API}/api/collect/delete?id=${e}`,method:"get"}))),e("d",(e=>l({url:`${a.BASE_API}/api/collect/detail?id=${e}`,method:"get"})))}}}));