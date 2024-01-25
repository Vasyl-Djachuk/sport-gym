import{a as L}from"./assets/vendor-a2e8d7fa.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const g=document.querySelector(".exercises-list"),u=document.querySelector(".exercises-list-pages");g.addEventListener("click",O);const $=document.querySelector(".exercises-form");let o=1,p=8,d="Muscles";const S=document.querySelectorAll(".exercises-button");[...S].map((t,s)=>{s===0&&t.classList.add("exercises-button-active"),t.addEventListener("click",m)});async function f(t,s,r,n,e,a){let c={};e?c[s.toLowerCase().replace(" ","")]=e:c.filter=s,c.page=r,c.limit=n,a&&(c.keyword=a),console.log(c);let i=new URLSearchParams(c).toString();console.log(i);try{return(await L.get(`https://energyflow.b.goit.study/api/${t}?${i}`)).data}catch(l){console.log(l)}}m();function m(t){if(o=1,t){const s=t.target;if(s.classList.contains("exercises-button-active"))return;d=s.dataset.name,document.querySelector(".exercises-button-active").classList.remove("exercises-button-active"),s.classList.add("exercises-button-active")}y(d)}async function y(t){const s=await f("filters",t,o,p).then(r=>r).catch(r=>console.log(r));b(s.results,s.totalPages)}function b(t,s){if(t[0]._id){console.log(t[0]._id);let n=t.reduce((e,{_id:a,rating:c,name:i,burnedCalories:l,time:v,bodyPart:x,target:h})=>e+=`<li class="exer-card-item">
          <div class="exer-card-background">
            <div class="card-workout-wrapper">
              <p class="exer-workout-text">WORKOUT</p>
              <p class="exer-card-rating">${c}</p>
              <svg class="card-rating-svg" width="14" height="14">
                <use href="./img/symbol-defs.svg#icon-star"></use>
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
              <span class="card-name-traning">${i}
            </span></div>
            <p class="card-burned-calories-text">Burned calories:
            <span class="card-burned-calories-span">${l} / ${v} min</span>
            </p>
            
            <p class="card-body-part-text">Body part:
               <span class="card-burned-calories-span">${x}</span>
            </p>
            <p class="card-target-text">Target:
              <span class="card-burned-calories-span">${h}</span>
            </p>

          </div>
        </li>`,"");g.innerHTML=n}if(!t[0]._id){let n=t.reduce((e,{filter:a,imgUrl:c,name:i})=>e+=`<li class="exercises-item" data-type="${i}" style="background-image: linear-gradient(
      0deg,
      rgba(16, 16, 16, 0.7) 0%,
      rgba(16, 16, 16, 0.7) 100%
    ),url(${c}); ">
          <p class="exercises-item-text" data-type="${i}">${i}</p>
          <p class="exercises-item-text-second" data-type="${i}">${a}</p>
        </li>`,"");g.innerHTML=n}(!u.textContent||d!==document.querySelector(".exercises-pages-button").dataset.type)&&r();function r(){let n="";for(let e=1;e<s+1;e++)n+=`<li>
          <button class="exercises-pages-button" data-number="${e}" data-type="${d}">${e}</button>
        </li>`;u.innerHTML=n,document.querySelector(".exercises-pages-button").classList.add("select-pages-ative"),u.addEventListener("click",w)}}function w(t){if(o==t.target.dataset.number)return;document.querySelector(".select-pages-ative").classList.remove("select-pages-ative"),t.target.classList.add("select-pages-ative"),o=t.target.dataset.number,y(t.target.dataset.type)}function O(t){let s=document.querySelector(".exercises-button-active").dataset.name;s==="Body parts"&&(s="Body part");const r=t.target.dataset.type;o=1,$.classList,P(s,r)}async function P(t,s){try{const r=await f("exercises",t,o,p,s);console.log(r),b(r.results,r.totalPages)}catch(r){console.log(r)}}
//# sourceMappingURL=commonHelpers.js.map
