import{k as n,d}from"./index-BbvUdh_o.js";import{s as g}from"./statusStore-Bmf0kU7H.js";var p={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/PorkShop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:c,VITE_PATH:r}=p,t=g(),L=n("cartStore",{state:()=>({carts:[],cartslength:0}),actions:{getCarts(){t.isLoading=!0;const a=`${c}/api/${r}/cart`;d.get(a).then(s=>{this.carts=s.data.data,this.cartslength=s.data.data.carts.length}).catch(()=>{this.carts=[],this.cartslength=0}),t.isLoading=!1},addToCart(a,s=1){t.isLoading=!0,t.addCartLoading=a;let e=`${c}/api/${r}/cart`,i="post",o={product_id:a,qty:s};d[i](e,{data:o}).then(l=>{t.addCartLoading="",l.data.success&&(this.getCarts(),t.pushMessage({style:"success",title:"已加入購物車"}))}).catch(()=>{t.addCartLoading="",t.isLoading=!1})},cartChangeQty(a,s=1,e="++"){t.isLoading=!0,t.cartQtyLoading=a.id;let i=`${c}/api/${r}/cart/${a.id}`,o="put",l={product_id:a.product.id,qty:s};d[o](i,{data:l}).then(h=>{t.cartQtyLoading="",h.data.success&&(this.getCarts(),e==="++"?t.pushMessage({style:"success",title:"已增加數量"}):t.pushMessage({style:"success",title:"已刪減數量"}))}).catch(h=>{t.pushMessage({style:"danger",title:"數量調整失敗",content:h.data.message.join("、")}),t.cartQtyLoading="",t.isLoading=!1})},delCartItem(a){t.isLoading=!0,t.delCart=a;let s=`${c}/api/${r}/cart/${a}`;d["delete"](s).then(i=>{t.delCart="",i.data.success&&(this.getCarts(),t.pushMessage({style:"success",title:"已刪除品項"}))}).catch(()=>{t.isLoading=!1})},delAllCart(){t.isLoading=!0,t.delCart="delAll";let a=`${c}/api/${r}/carts`;d["delete"](a).then(e=>{t.delCart="",e.data.success&&(this.getCarts(),t.pushMessage({style:"success",title:"已清空購物車"}))}).catch(()=>{t.isLoading=!1})}}});export{L as c};