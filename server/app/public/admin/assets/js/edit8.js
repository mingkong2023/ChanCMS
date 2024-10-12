import{H as e,I as a,r as s,q as l,f as t,p as r}from"./element-plus.js";import{d as o,u as m}from"./message.js";import{_ as p}from"./index.js";import{o as i,c as u,M as d,Q as n,O as c,a8 as j,R as g,U as b}from"./@vue.js";import"./lodash-es.js";import"./async-validator.js";import"./@vueuse.js";import"./dayjs.js";import"./@element-plus.js";import"./@ctrl.js";import"./@popperjs.js";import"./memoize-one.js";import"./normalize-wheel-es.js";import"./pinia.js";import"./pinia-plugin-persist.js";import"./vanilla-jsoneditor.js";import"./json-source-map.js";import"./@fortawesome.js";import"./natural-compare-lite.js";import"./@codemirror.js";import"./@lezer.js";import"./crelt.js";import"./style-mod.js";import"./w3c-keyname.js";import"./@replit.js";import"./codemirror-wrapped-line-indent.js";import"./fast-deep-equal.js";import"./fast-uri.js";import"./jmespath.js";import"./immutable-json-patch.js";import"./vue-router.js";import"./axios.js";import"./js-cookie.js";/* empty css        */const h={class:"mr-10 ml-10 mb-20 pd-20 content-wrap"};const f=p({name:"message-edit",data:()=>({options:[{label:"咨询",value:"1"},{label:"建议",value:"2"},{label:"投诉",value:"3"},{label:"其他",value:"4"}],params:{id:0},paramsRules:{name:[{required:!0,message:"请输入栏目名称",trigger:"blur"},{min:2,max:50,message:"名称长度在 2 到 50 个字符之间",trigger:"blur"}]}}),computed:{},mounted(){},async created(){this.params.id=this.$route.params.id,await this.detail()},methods:{async detail(){try{let e=await o(this.params.id);200===e.code?this.params=e.data:this.$message({message:e.msg,type:"success"})}catch(e){console.error(e)}},handleAttr(e){console.log("e--\x3e",e)},handleSubCid(e){console.log("e--\x3e",e)},async update(){try{let e=await m(this.params);200==e.code?(this.$message({message:"更新成功^_^",type:"success"}),this.$router.go(-1)):this.$message({message:e.msg,type:"success"})}catch(e){console.log(e)}},goBack(){this.$router.go(-1)},submit(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.update()}))}}},[["render",function(o,m,p,f,y,V){const v=e,_=a,w=s,x=l,k=t,q=r;return i(),u("div",h,[d(q,{ref:"params",model:o.params,"label-width":"84px",class:"mt-20"},{default:n((()=>[d(w,{label:"留言类型",rules:[{required:!0,message:"请选择类型",trigger:"blur"}],prop:"type"},{default:n((()=>[d(_,{modelValue:o.params.type,"onUpdate:modelValue":m[0]||(m[0]=e=>o.params.type=e),placeholder:"请选择类型"},{default:n((()=>[(i(!0),u(c,null,j(o.options,(e=>(i(),g(v,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),d(w,{label:"留言标题",rules:[{required:!0,message:"请输入标题",trigger:"blur"}],prop:"title"},{default:n((()=>[d(x,{modelValue:o.params.title,"onUpdate:modelValue":m[1]||(m[1]=e=>o.params.title=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"姓名",prop:"name",rules:[{required:!0,message:"请输入内容",trigger:"blur"}]},{default:n((()=>[d(x,{modelValue:o.params.name,"onUpdate:modelValue":m[2]||(m[2]=e=>o.params.name=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"手机号",prop:"tel",rules:[{required:!0,message:"请输入内容",trigger:"blur"}]},{default:n((()=>[d(x,{modelValue:o.params.tel,"onUpdate:modelValue":m[3]||(m[3]=e=>o.params.tel=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"公司单位"},{default:n((()=>[d(x,{modelValue:o.params.company,"onUpdate:modelValue":m[4]||(m[4]=e=>o.params.company=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"微信"},{default:n((()=>[d(x,{modelValue:o.params.wechat,"onUpdate:modelValue":m[5]||(m[5]=e=>o.params.wechat=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"留言内容",prop:"content",rules:[{required:!0,message:"请输入内容",trigger:"blur"}]},{default:n((()=>[d(x,{type:"textarea",rows:3,placeholder:"请输入内容",modelValue:o.params.content,"onUpdate:modelValue":m[6]||(m[6]=e=>o.params.content=e)},null,8,["modelValue"])])),_:1}),d(w,{class:"flex"},{default:n((()=>[d(k,{type:"primary",onClick:m[7]||(m[7]=e=>V.submit("params"))},{default:n((()=>[b("保存")])),_:1}),d(k,{onClick:V.goBack},{default:n((()=>[b("取消")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])}],["__scopeId","data-v-e42702d6"]]);export{f as default};