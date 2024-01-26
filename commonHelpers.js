import{a as C}from"./assets/vendor-a2e8d7fa.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();console.log(document.body.clientWidth);const b=document.querySelector(".exercises-title-span"),m=document.querySelector(".exercises-list"),p=document.querySelector(".exercises-list-pages");p.addEventListener("click",k);m.addEventListener("click",E);const c=document.querySelector(".exercises-form");c.addEventListener("submit",B);const h=document.querySelector(".exercises-button-list");let u=1,y=8,f="Muscles",l="",g="";const P=document.querySelectorAll(".exercises-button");[...P].map((e,s)=>{s===0&&e.classList.add("exercises-button-active"),e.addEventListener("click",L)});async function x(e,s,i,n,t,r){console.log(y);let a={};t&&s=="Body parts"&&(s="Body part"),t?a[s.toLowerCase().replace(" ","")]=t:a.filter=s,a.page=i,a.limit=n,r&&(a.keyword=r),document.body.clientWidth>=1440&&t&&(a.limit=9),document.body.clientWidth>=768&&!t&&(a.limit=12),document.body.clientWidth>=768&&t&&(a.limit=8),console.log(a);let o=new URLSearchParams(a).toString();console.log(o);try{const d=await C.get(`https://energyflow.b.goit.study/api/${e}?${o}`);if(console.log(d.data.results.length),r&&d.data.results.length==0){T();return}return d.data}catch(d){console.log(d)}}function T(){m.innerHTML=`<div class="no-results-wrapper">
  <p class="no-results-message">
    Unfortunately, <span class="no-results-messag-span">no results</span> no
    results were found. You may want to consider other search options to find
    the exercise you are looking for. Our range is wide and you have the
    opportunity to find more options that suit your needs.
  </p>
</div>`,p.innerHTML=""}L();function L(e){if(h.classList.remove("form-is-open"),c.classList.add("form-is-hiden"),l="",b.innerHTML="",u=1,e){const s=e.target;if(s.classList.contains("exercises-button-active"))return;f=s.dataset.name,document.querySelector(".exercises-button-active").classList.remove("exercises-button-active"),s.classList.add("exercises-button-active")}$(f)}async function $(e){const s=await x("filters",e,u,y).then(i=>i).catch(i=>console.log(i));w(s.results,s.totalPages)}function w(e,s){if(e[0]._id){console.log(e[0]._id);let n=e.reduce((t,{_id:r,rating:a,name:o,burnedCalories:d,time:S,bodyPart:q,target:O})=>t+=`<li class="exer-card-item">
          <div class="exer-card-background">
            <div class="card-workout-wrapper">
              <p class="exer-workout-text">WORKOUT</p>
              <p class="exer-card-rating">${a}</p>
              <svg class="card-rating-svg" width="16" height="16">
                <use href="../img/symbol-defs.svg#icon-star"></use>
              </svg>
              <button class="card-start-button">
                Start
                <svg class="card-arrow-svg" width="14" height="14">
                  <use href="./img/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
            <div class="card-runing-men-wrapper">
              <svg class="card-runing-men-svg" width="24" height="24">
                <use href="../img/symbol-defs.svg#icon-running-men"></use>
              </svg>
              <span class="card-name-traning">${o}
            </span></div>
            <p class="card-burned-calories-text">Burned calories:
            <span class="card-burned-calories-span">${d} / ${S} min</span>
            </p>
            
            <p class="card-body-part-text">Body part:
               <span class="card-burned-calories-span">${q}</span>
            </p>
            <p class="card-target-text">Target:
              <span class="card-burned-calories-span">${O}</span>
            </p>

          </div>
        </li>`,"");m.innerHTML=n}if(!e[0]._id){let n=e.reduce((t,{filter:r,imgUrl:a,name:o})=>(c.dataset.filter=r,t+=`<li class="exercises-item" data-type="${o}" style="background-image: linear-gradient(
      0deg,
      rgba(16, 16, 16, 0.7) 0%,
      rgba(16, 16, 16, 0.7) 100%
    ),url(${a}); ">
          <p class="exercises-item-text" data-type="${o}">${o}</p>
          <p class="exercises-item-text-second" data-type="${o}">${r}</p>
        </li>`),"");m.innerHTML=n}(!p.textContent||f!==document.querySelector(".exercises-pages-button").dataset.type||c.dataset.status)&&(c.dataset.status="",i());function i(){c.dataset.status="";let n="";for(let t=1;t<s+1;t++)n+=`<li>
          <button class="exercises-pages-button" data-card="${l}" data-number="${t}" data-type="${f}">${t}</button>
        </li>`;p.innerHTML=n,document.querySelector(".exercises-pages-button").classList.add("select-pages-ative")}}function k(e){if(u==e.target.dataset.number)return;if(document.querySelector(".select-pages-ative").classList.remove("select-pages-ative"),e.target.classList.add("select-pages-ative"),u=e.target.dataset.number,l==""){$(e.target.dataset.type);return}console.log(g),v(e.target.dataset.type,e.target.dataset.card,g)}function E(e){if(e.target.dataset.type){let s=document.querySelector(".exercises-button-active").dataset.name;s==="Body parts"&&(s="Body part"),l=e.target.dataset.type,u=1,c.classList.remove("form-is-hiden"),p.innerHTML="",h.classList.add("form-is-open"),b.innerHTML=`<span class="exer-title-slash">/</span> ${l.slice(0,1).toUpperCase()}${l.slice(1)}`,v(s,l)}}async function v(e,s,i=""){try{const n=await x("exercises",e,u,y,s,i);n&&w(n.results,n.totalPages)}catch(n){console.log(n)}}function B(e){if(e.preventDefault(),g=e.target.elements.usertext.value.trim(),g.length!==0){const s=e.target.dataset.filter;e.target.dataset.status="ok",c.reset(),v(s,l,g),console.log(e.target)}}
//# sourceMappingURL=commonHelpers.js.map
