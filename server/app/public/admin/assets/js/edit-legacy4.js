System.register(["./element-plus-legacy.js","./field-legacy.js","./model-legacy.js","./index-legacy.js","./@vue-legacy.js","./lodash-es-legacy.js","./async-validator-legacy.js","./@vueuse-legacy.js","./dayjs-legacy.js","./@element-plus-legacy.js","./@ctrl-legacy.js","./@popperjs-legacy.js","./memoize-one-legacy.js","./normalize-wheel-es-legacy.js","./pinia-legacy.js","./pinia-plugin-persist-legacy.js","./vanilla-jsoneditor-legacy.js","./json-source-map-legacy.js","./@fortawesome-legacy.js","./natural-compare-lite-legacy.js","./@codemirror-legacy.js","./@lezer-legacy.js","./crelt-legacy.js","./style-mod-legacy.js","./w3c-keyname-legacy.js","./@replit-legacy.js","./codemirror-wrapped-line-indent-legacy.js","./fast-deep-equal-legacy.js","./fast-uri-legacy.js","./jmespath-legacy.js","./immutable-json-patch-legacy.js","./vue-router-legacy.js","./axios-legacy.js","./js-cookie-legacy.js","./saduocss-legacy.js"],(function(e,l){"use strict";var a,s,u,t,o,r,n,d,m,c,i,p,g,y,j,h,b,f,v;return{setters:[e=>{a=e.q,s=e.r,u=e.H,t=e.I,o=e.f,r=e.p},e=>{n=e.d,d=e.u},e=>{m=e.h},e=>{c=e._},e=>{i=e.o,p=e.c,g=e.M,y=e.Q,j=e.O,h=e.a8,b=e.R,f=e.U,v=e.a},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){const l={name:"field-edit",data:()=>({params:{id:"",mid:"",tableName:"",cname:"",ename:"",type:"",val:"",defaultVal:"",length:"",orderBy:"0"},type:[{value:"1",label:"单行文本"},{value:"2",label:"多行文本 "},{value:"3",label:"下拉菜单"},{value:"4",label:"单选"},{value:"5",label:"多选 "},{value:"6",label:"时间和日期 "},{value:"7",label:"数字 "},{value:"8",label:"多图上传 "},{value:"9",label:"富文本 "}],disable:!0,value:""}),computed:{},async mounted(){},async created(){const{model:e,fid:l,mid:a,tableName:s}=this.$route.query;this.params.id=l,this.params.mid=a,this.params.tableName=s,this.model=e,await this.detail()},methods:{async hasUse(e){try{let l=await m(e);this.disable=l?.data?.has?.length>0}catch(l){console.log(l)}},async detail(){try{let e=await n(this.params.id);if(200===e.code){let l=e.data;this.params=l,this.hasUse(l.mid)}}catch(e){console.error(e)}},handleAttr(e){console.log("e--\x3e",e)},handleSubCid(e){console.log("e--\x3e",e)},handletag(e){console.log("e--\x3e",e)},handleBox(e){console.log("e--\x3e",e)},async update(){try{let e=await d(this.params);200==e.code?this.$message({message:"更新成功^_^",type:"success"}):this.$message({message:e.msg,type:"success"}),this.$router.go(-1)}catch(e){console.log(e)}},submit(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.update()}))}}},V={class:"mr-10 ml-10 mb-20 pd-20 content-wrap"},_=v("p",{class:"f-12 c-999"},'例如：{"options":[{"label":"本地下载","value":"1"},{"label":"电信下载","value":"2"}]}',-1);e("default",c(l,[["render",function(e,l,n,d,m,c){const v=a,w=s,x=u,U=t,q=o,k=r;return i(),p("div",V,[g(k,{ref:"params",model:e.params,"label-width":"100px",class:"mt-20"},{default:y((()=>[g(w,{label:"中文名称",prop:"cname",rules:[{required:!0,message:"请输入中文名称",trigger:"blur"}]},{default:y((()=>[g(v,{modelValue:e.params.cname,"onUpdate:modelValue":l[0]||(l[0]=l=>e.params.cname=l),placeholder:"请输入字段中文名称"},null,8,["modelValue"])])),_:1}),g(w,{label:"字段名称",prop:"ename",rules:[{required:!0,message:"请输入英文名称",trigger:"blur"}]},{default:y((()=>[g(v,{modelValue:e.params.ename,"onUpdate:modelValue":l[1]||(l[1]=l=>e.params.ename=l),placeholder:"请输入英文小驼峰方式，例：bookName"},null,8,["modelValue"])])),_:1}),g(w,{label:"字段类型",rules:[{required:!0,message:"请选择类型",trigger:"blur"}]},{default:y((()=>[g(U,{modelValue:e.params.type,"onUpdate:modelValue":l[2]||(l[2]=l=>e.params.type=l),placeholder:"请选择"},{default:y((()=>[(i(!0),p(j,null,h(e.type,(e=>(i(),b(x,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),g(w,{label:"字段选项"},{default:y((()=>[g(v,{modelValue:e.params.defaultVal,"onUpdate:modelValue":l[3]||(l[3]=l=>e.params.defaultVal=l),rows:2,type:"textarea",placeholder:"单选、多选、下拉框，请填写json格式。"},null,8,["modelValue"]),_])),_:1}),g(w,{label:"默认值"},{default:y((()=>[g(v,{modelValue:e.params.val,"onUpdate:modelValue":l[4]||(l[4]=l=>e.params.val=l)},null,8,["modelValue"])])),_:1}),g(w,{label:"排序"},{default:y((()=>[g(v,{modelValue:e.params.orderBy,"onUpdate:modelValue":l[5]||(l[5]=l=>e.params.orderBy=l)},null,8,["modelValue"])])),_:1}),g(w,{label:"字段长度"},{default:y((()=>[g(v,{modelValue:e.params.length,"onUpdate:modelValue":l[6]||(l[6]=l=>e.params.length=l)},null,8,["modelValue"])])),_:1}),g(w,null,{default:y((()=>[g(q,{type:"primary",onClick:l[7]||(l[7]=e=>c.submit("params"))},{default:y((()=>[f("保存")])),_:1})])),_:1})])),_:1},8,["model"])])}]]))}}}));
