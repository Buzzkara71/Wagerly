const qs = (s)=>document.querySelector(s);
const qsa=(s)=>[...document.querySelectorAll(s)];

function jitterOdds(){
  qsa('.odd').forEach(b=>{
    const n=parseFloat(b.textContent||'0');
    if(!n) return;
    const d=(Math.random()-.5)*.08;
    b.textContent=Math.max(1.2,Math.min(4.5,n+d)).toFixed(2);
  });
}

function setupBet(){
  qsa('.bet-now').forEach(btn=>{
    btn.onclick=()=>{
      const c=btn.closest('.match-card');
      const o=c.querySelector('.odd');
      openSlip(c,o);
    };
  });
  qsa('.odd').forEach(o=>o.onclick=()=>openSlip(o.closest('.match-card'),o));
}

function openSlip(card,odd){
  const m=qs('#betModal');
  qs('#slipMatch').textContent=`${card.querySelector('.home').textContent} vs ${card.querySelector('.away').textContent}`;
  qs('#slipMarket').textContent=odd.dataset.market.toUpperCase();
  qs('#slipOdds').textContent=odd.textContent;
  const s=qs('#slipStake');
  const r=qs('#slipReturn');
  const calc=()=>{r.textContent=(s.value*parseFloat(odd.textContent)).toFixed(2)};
  s.oninput=calc;calc();
  m.showModal();
}

qs('#ctaBet').onclick=()=>document.getElementById('matches').scrollIntoView({behavior:'smooth'});
setupBet();
setInterval(jitterOdds,2500);