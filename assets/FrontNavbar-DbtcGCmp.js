import{d as h,e as b,_ as y,o as i,c,a as t,b as n,j as o,g as e,t as d,l as p,f as u,r as v}from"./index-BbvUdh_o.js";import{c as f}from"./cartStore-CaAN10cb.js";import{s as x}from"./statusStore-Bmf0kU7H.js";var k={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/PorkShop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:g}=k,S=x(),V={props:["title"],data(){return{isSignIn:!1}},methods:{check(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.isSignIn=!!a.length},logout(){const a=`${g}/logout`;h.post(a).then(()=>{S.pushMessage({style:"success",title:"登出成功"}),this.$router.push("/login");const l="";document.cookie=`shopToken=${l}; expires=${new Date}`}),this.isSignIn=!1}},mounted(){this.check()},computed:{...b(f,["cartslength"])}},E={class:"navbar fixed-top navbar-expand-sm navbar-dark bg-light py-2"},I={class:"container text-secondary py-1 px-3 d-flex justify-content-end"},R={class:"collapse navbar-collapse"},T={class:"navbar-nav category list-unstyled d-flex justify-content-left"},$={class:"nav-item"},B={class:"nav-item"},C={class:"nav-item"},D={class:"nav-item"},L={class:"nav-item"},N={class:"nav-item"},j={class:"nav-item"},P={key:0,type:"button",class:"btn btn-outline-secondary position-relative"},U=t("i",{class:"bi bi-bag"},null,-1),w={key:0,class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"},A=t("span",{class:"visually-hidden"},"unread messages",-1);function F(a,l,r,H,_,m){const s=v("RouterLink");return i(),c("nav",E,[t("div",I,[n(s,{class:"router-link-active px-3 px-md-4 py-1",style:{"text-decoration":"none",color:"#6c757d"},to:"/"},{default:o(()=>[e(d(r.title),1)]),_:1}),t("div",R,[t("ul",T,[t("li",$,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/"},{default:o(()=>[e("Home")]),_:1})]),t("li",B,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/about"},{default:o(()=>[e("關於我們")]),_:1})]),t("li",C,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/products"},{default:o(()=>[e("商品列表(前)")]),_:1})]),t("li",D,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/admin/products"},{default:o(()=>[e("商品列表(後-未搬遷)")]),_:1})]),t("li",L,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/admin/orders"},{default:o(()=>[e("訂單列表(後)")]),_:1})]),t("li",N,[n(s,{class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/admin/coupon"},{default:o(()=>[e("優惠卷(後-未製作)")]),_:1})]),t("li",j,[_.isSignIn?(i(),p(s,{key:1,class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"#",onClick:m.logout},{default:o(()=>[e("帳號登出")]),_:1},8,["onClick"])):(i(),p(s,{key:0,class:"btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",to:"/login"},{default:o(()=>[e("登入頁面")]),_:1}))])])]),r.title=="這是前台"?(i(),c("button",P,[U,e(" 購物車 "),a.cartslength>0?(i(),c("span",w,[e(d(a.cartslength)+" ",1),A])):u("",!0)])):u("",!0)])])}const z=y(V,[["render",F]]);export{z as F};
