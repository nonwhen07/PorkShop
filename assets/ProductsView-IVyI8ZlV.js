import{_ as q,o as l,c as i,a as e,n as p,w as x,F as b,d as C,t as r,e as S,m as E,f as v,g as f,h as y,i as Q,j as w,v as I,b as u,k as U,r as m,l as D,L as j,p as N}from"./index-BL61C-bO.js";import{c as $}from"./cartStore-BmWfRpzv.js";import{s as P}from"./statusStore-CPEWirWS.js";const B={props:["pages","updatePage"]},O={"aria-label":"Page navigation example"},H={class:"pagination justify-content-center"},z=e("span",{"aria-hidden":"true"},"«",-1),F=[z],G=["onClick"],J=e("span",{"aria-hidden":"true"},"»",-1),K=[J];function W(t,a,n,_,d,g){return l(),i("nav",O,[e("ul",H,[e("li",{class:p(["page-item",{disabled:n.pages.has_pre===!1,invisible:n.pages.has_pre===!1}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[0]||(a[0]=x(c=>n.updatePage(n.pages.current_page-1),["prevent"]))},F)],2),(l(!0),i(b,null,C(n.pages.total_pages,c=>(l(),i("li",{class:p(["page-item",{disabled:n.pages.current_page===c}]),key:c},[e("a",{class:"page-link",href:"#",onClick:x(h=>n.updatePage(c),["prevent"])},r(c),9,G)],2))),128)),e("li",{class:p(["page-item",{disabled:n.pages.has_next===!1,invisible:n.pages.has_next===!1}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:a[1]||(a[1]=x(c=>n.updatePage(n.pages.current_page+1),["prevent"]))},K)],2)])])}const X=q(B,[["render",W]]);var Y={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/PorkShop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:Z,VITE_PATH:ee}=Y,R=P(),te={data(){return{userModal:null,editCarts:{},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{sendOrder(){this.isLoading=!0;let t=`${Z}/api/${ee}/order`;const a=this.form;S.post(t,{data:a}).then(n=>{this.$refs.form.resetForm(),this.isLoading=!1,n.data.success?(this.getCarts(),R.pushMessage({style:"success",title:"已送出訂單"})):R.pushMessage({danger:"success",title:"送出訂單失敗",content:n.data.message.join("、")})})},isPhone(t){return/^(09)[0-9]{8}$/.test(t)?!0:"電話為必填，須為有效的電話號碼"},...E($,["getCarts","addToCart","cartChangeQty","delCartItem","delAllCart"])},watch:{},mounted(){},computed:{...v($,["carts","cartslength"]),...v(P,["addCartLoading","cartQtyLoading","delCart"])}},se={class:"text-end"},oe=["disabled"],ae={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},le={class:"table align-middle"},ne=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"170px"}},"數量/單位"),e("th",{style:{width:"120px"}}),e("th",null,"單價"),e("th",null,"小計")])],-1),ie=["onClick","disabled"],de={key:0,class:"bi bi-x-lg"},re={key:1,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},ce={class:"input-group input-group-sm"},ue={class:"input-group mb-3"},pe=["disabled","onClick"],he=["onUpdate:modelValue","disabled"],_e=["onClick","disabled"],ge={class:"input-group-text",id:"basic-addon2"},me=e("td",null,null,-1),fe={class:"text-end"},ye={key:0},be=e("small",{class:"text-success"},"折扣價：",-1),ve={key:1},ke={key:0,class:"text-end"},Ce={key:1,class:"text-end"},$e=e("td",{colspan:"5",class:"text-end"},"總計",-1),Pe={class:"text-end"},Le={key:0},Ve=e("td",{colspan:"5",class:"text-end text-success"},"折扣價",-1),xe={class:"text-end text-success"},Te={class:"my-5 row justify-content-center"},Ae={class:"mb-3"},Se=e("label",{for:"email",class:"form-label"},"Email",-1),Ee={class:"mb-3"},Ue=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),qe={class:"mb-3"},we=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),Ie={class:"mb-3"},Re=e("label",{for:"address",class:"form-label"},"收件人地址",-1),Me={class:"mb-3"},Qe=e("label",{for:"message",class:"form-label"},"留言",-1),De={class:"text-end"},je=["disabled"];function Ne(t,a,n,_,d,g){const c=m("v-field"),h=m("error-message"),L=m("v-form");return l(),i(b,null,[e("div",se,[e("button",{class:"btn btn-outline-danger",type:"button",onClick:a[0]||(a[0]=(...s)=>t.delAllCart&&t.delAllCart(...s)),disabled:t.delCart==="delAll"},[t.delCart==="delAll"?(l(),i("span",ae)):f("",!0),y(" 清空購物車 ")],8,oe)]),e("table",le,[ne,e("tbody",null,[(l(!0),i(b,null,C(t.carts.carts,s=>(l(),i("tr",{key:s.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:o=>t.delCartItem(s.id),disabled:s.id===t.delCart},[s.id!==t.delCart?(l(),i("i",de)):f("",!0),s.id===t.delCart?(l(),i("span",re)):f("",!0)],8,ie)]),e("td",null,r(s.product.title),1),e("td",null,[e("div",ce,[e("div",ue,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",style:Q(s.qty===1?"display:none;":""),disabled:s.qty===1||s.id===t.cartQtyLoading,onClick:o=>(s.qty--,t.cartChangeQty(s,s.qty,"--"))}," - ",12,pe),w(e("input",{min:"1",type:"number",class:"form-control",style:{"text-align":"center"},"onUpdate:modelValue":o=>s.qty=o,disabled:s.id===t.cartQtyLoading,readonly:""},null,8,he),[[I,s.qty]]),e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:o=>(s.qty++,t.cartChangeQty(s,s.qty,"++")),disabled:s.id===t.cartQtyLoading}," + ",8,_e),e("span",ge,r(s.product.unit),1)])])]),me,e("td",fe,[s.product.price<s.product.origin_price?(l(),i("div",ye,[be,e("del",null,r(s.product.origin_price),1),y(" "+r(s.product.price),1)])):(l(),i("div",ve,r(s.product.origin_price),1))]),s.product.price<s.product.origin_price?(l(),i("td",ke,r(s.product.price*s.qty),1)):(l(),i("td",Ce,r(s.product.origin_price*s.qty),1))]))),128))]),e("tfoot",null,[e("tr",null,[$e,e("td",Pe,r(t.carts.total),1)]),t.carts.final_total<t.carts.total?(l(),i("tr",Le,[Ve,e("td",xe,r(t.carts.final_total),1)])):f("",!0)])]),e("div",Te,[u(L,{ref:"form",class:"col-md-6",onSubmit:g.sendOrder},{default:U(({errors:s})=>[e("div",Ae,[Se,u(c,{id:"email",name:"email",type:"email",class:p(["form-control",{"is-invalid":s.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:d.form.user.email,"onUpdate:modelValue":a[1]||(a[1]=o=>d.form.user.email=o)},null,8,["class","modelValue"]),u(h,{name:"email",class:"invalid-feedback"})]),e("div",Ee,[Ue,u(c,{id:"name",name:"姓名",type:"text",class:p(["form-control",{"is-invalid":s.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:d.form.user.name,"onUpdate:modelValue":a[2]||(a[2]=o=>d.form.user.name=o)},null,8,["class","modelValue"]),u(h,{name:"姓名",class:"invalid-feedback"})]),e("div",qe,[we,u(c,{id:"tel",name:"電話",type:"text",class:p(["form-control",{"is-invalid":s.電話}]),placeholder:"請輸入電話",rules:g.isPhone,modelValue:d.form.user.tel,"onUpdate:modelValue":a[3]||(a[3]=o=>d.form.user.tel=o)},null,8,["class","rules","modelValue"]),u(h,{name:"電話",class:"invalid-feedback"})]),e("div",Ie,[Re,u(c,{id:"address",name:"地址",type:"text",class:p(["form-control",{"is-invalid":s.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:d.form.user.address,"onUpdate:modelValue":a[4]||(a[4]=o=>d.form.user.address=o)},null,8,["class","modelValue"]),u(h,{name:"地址",class:"invalid-feedback"})]),e("div",Me,[Qe,w(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":a[5]||(a[5]=o=>d.form.message=o)},null,512),[[I,d.form.message]])]),e("div",De,[e("button",{type:"submit",class:"btn btn-danger",disabled:d.form.user.id===t.cartQtyLoading}," 送出訂單 ",8,je)])]),_:1},8,["onSubmit"])])],64)}const Be=q(te,[["render",Ne]]);var Oe={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/PorkShop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:T,VITE_PATH:A}=Oe,k=P(),M=D("productStore",{state:()=>({products:[],pages:{},category:[]}),actions:{getProducts(t=1){k.isLoading=!0;let a=`${T}/api/${A}/products?page=${t}`;S.get(a).then(n=>{this.products=n.data.products,this.pages=n.data.pagination;const _=this.products.map(g=>g.category),d=new Set(_);this.category=[...d]}).catch(()=>{this.products=[],this.pages={},this.category=[]}),setTimeout(()=>{k.isLoading=!1},1e3)},filterProducts(t=1,a="all"){k.isLoading=!0;let n=`${T}/api/${A}/products?page=${t}`;a!=="all"&&(n=`${T}/api/${A}/products?page=${t}&category=${a}`),S.get(n).then(_=>{this.products=_.data.products,this.pages=_.data.pagination}).catch(()=>{this.products=[],this.pages={}}),k.isLoading=!1}}}),He={data(){return{tempProduct:{},selectID:"",checkProduct:"",tempArry:[],isActive:"all",path:{category:"all",page:1},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{openModal(t){this.$refs.uModal.openModal(),this.checkProduct=t.id,this.tempProduct={...t},setTimeout(()=>{this.checkProduct=""},200)},...E(M,["getProducts","filterProducts"]),...E($,["getCarts","addToCart","cartChangeQty","delCartItem","delAllCart"]),getPath(){this.path.category=this.$route.query.category||"all",this.path.page=this.$route.query.page||1,this.isActive=this.path.category,this.$router.push(`./products?category=${this.path.category}&page=${this.path.page}`)}},created(){},mounted(){this.getProducts(),this.getPath(),this.getCarts()},components:{Loading:j,Pagination:X,UserCart:Be},computed:{...v(M,["products","pages","category"]),...v($,["carts","cartslength"]),...v(P,["isLoading","addCartLoading","cartQtyLoading","setIsLoading","delCart"])}},ze={class:"container"},Fe={class:"mt-4"},Ge=e("h2",{class:"d-flex justify-content-center",style:{"margin-top":"75px"}},"商品列表",-1),Je={class:"category list-unstyled d-flex justify-content-center mt-4",style:{"margin-bottom":"50px"}},Ke=["onClick"],We={class:"row d-flex list-unstyled"},Xe={class:"img-fluid hovereffect px-3",style:{"background-size":"cover","background-position":"center",width:"100%",height:"250px"}},Ye=["src","alt","title"],Ze={class:"overlay",style:{"margin-top":"100px"}},et=["disabled","onClick"],tt={class:"py-1",style:{"text-align":"center"}},st={class:"products-title m-0",role:"button"},ot={key:0,class:"products-title mt-1",role:"button"},at={class:"small"},lt={class:"small",style:{color:"red"}},nt={key:1,class:"products-title mt-1",role:"button"},it={class:"small"},dt=["disabled","onClick"],rt=e("i",{class:"fas fa-spinner fa-pulse"},null,-1),ct={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"};function ut(t,a,n,_,d,g){const c=m("Loading"),h=m("RouterLink"),L=m("Pagination"),s=m("UserCart");return l(),i(b,null,[u(c,{active:t.isLoading},null,8,["active"]),e("div",ze,[e("div",Fe,[Ge,e("ul",Je,[e("li",{class:"p-0 ms-1",onClick:a[0]||(a[0]=o=>(t.filterProducts(1,"all"),d.isActive="all"))},[u(h,{class:p(["btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",d.isActive==="all"?"active":""]),to:{query:{category:"all",page:1}}},{default:U(()=>[y("全部")]),_:1},8,["class"])]),(l(!0),i(b,null,C(t.category,(o,V)=>(l(),i("li",{key:V,class:"p-0 ms-1",onClick:pt=>(t.filterProducts(1,o),d.isActive=o)},[u(h,{class:p(["btn btn-outline-secondary router-link-active px-3 px-md-4 py-1",d.isActive===o?"active":""]),to:{query:{category:o,page:1}}},{default:U(()=>[y(r(o),1)]),_:2},1032,["class","to"])],8,Ke))),128))]),e("ul",We,[(l(!0),i(b,null,C(t.products,o=>(l(),i("li",{class:"col-lg-4 col-md-8",key:o.id},[e("div",Xe,[e("img",{class:"img-responsive",style:{width:"100%",height:"100%"},src:o.imageUrl,alt:o.title,title:o.title+":"+o.description},null,8,Ye),e("div",Ze,[e("h2",null,r(o.title),1),e("a",{href:"#",type:"button",class:"info",disabled:o.id===d.checkProduct,onClick:V=>g.openModal(o)}," 查看更多 ",8,et)])]),e("div",tt,[e("p",st,r(o.title),1),o.price<o.origin_price?(l(),i("p",ot,[e("del",at,"$ "+r(o.origin_price),1),y(" 現在只要  "),e("span",lt,"$ "+r(o.price),1)])):(l(),i("p",nt,[e("span",it,"$ "+r(o.origin_price),1)])),e("button",{type:"button",class:"btn btn-outline-secondary btn-sm mx-auto fs-6",disabled:o.id===t.addCartLoading,onClick:V=>t.addToCart(o.id,1)},[rt,o.id===t.addCartLoading?(l(),i("span",ct)):f("",!0),y(" 加入購物車 ")],8,dt)])]))),128))]),u(L,{pages:t.pages,"update-page":t.filterProducts},null,8,["pages","update-page"]),t.cartslength>0?(l(),N(s,{key:0})):f("",!0)])])],64)}const mt=q(He,[["render",ut]]);export{mt as default};
