const themes=[['Black','linear-gradient(135deg,#181818,#050505)'],['Ruby','linear-gradient(135deg,#64112c,#090407)'],['Lavender','linear-gradient(135deg,#65508b,#110b1c)'],['Cosmos','linear-gradient(135deg,#10274a,#02030a)'],['Travel','linear-gradient(135deg,#27565a,#071316)'],['Pink','linear-gradient(135deg,#c15383,#240b19)']];
let use24=true;const cards=[];
function makeDigit(parent){const el=document.createElement('div');el.className='digit';el.dataset.value='0';el.innerHTML='<div class="half top"><span>0</span></div><div class="half bottom"><span>0</span></div>';parent.append(el);cards.push(el)}
for(const id of ['hours','minutes','seconds']){const parent=document.getElementById(id);makeDigit(parent);makeDigit(parent)}
function setDigit(el,value,animate){const old=el.dataset.value;if(old===value)return;const top=el.querySelector('.top span'),bottom=el.querySelector('.bottom span');el.dataset.value=value;if(!animate){top.textContent=value;bottom.textContent=value;return}el.querySelectorAll('.flip-top,.flip-bottom').forEach(n=>n.remove());const a=document.createElement('div');a.className='half top flip-top';const sa=document.createElement('span');sa.textContent=old;a.append(sa);const b=document.createElement('div');b.className='half bottom flip-bottom';const sb=document.createElement('span');sb.textContent=value;b.append(sb);top.textContent=value;el.append(a,b);a.addEventListener('animationend',()=>a.remove(),{once:true});b.addEventListener('animationend',()=>{bottom.textContent=value;b.remove()},{once:true})}
let initialized=false;function tick(){const now=new Date();let hour=now.getHours();if(!use24)hour=hour%12||12;const digits=String(hour).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');[...digits].forEach((d,i)=>setDigit(cards[i],d,initialized));initialized=true;document.getElementById('date').textContent=new Intl.DateTimeFormat('pt-PT',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now)+(use24?'':now.getHours()<12?' · AM':' · PM')}
const themeEl=document.getElementById('themes');themes.forEach(([name,bg],i)=>{const btn=document.createElement('button');btn.className='theme'+(i===0?' active':'');btn.textContent=name;btn.style.setProperty('--preview',bg);btn.onclick=()=>{document.documentElement.style.setProperty('--bg',bg);themeEl.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')};themeEl.append(btn)});
document.getElementById('format').onclick=e=>{use24=!use24;e.currentTarget.textContent=use24?'24H':'12H';tick()};document.getElementById('fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();tick();setInterval(tick,1000);

// O tamanho dos algarismos é calculado a partir da largura e altura úteis da janela.
const focusButton=document.getElementById('focus');
const exitFocusButton=document.getElementById('exitFocus');
let exitHideTimer;
function scheduleExitHide(){
  clearTimeout(exitHideTimer);
  exitFocusButton.classList.remove('auto-hidden');
  exitHideTimer=setTimeout(()=>{
    if(!exitFocusButton.matches(':hover')&&!exitFocusButton.matches(':focus-visible'))
      exitFocusButton.classList.add('auto-hidden');
  },2000);
}
exitFocusButton.addEventListener('mouseenter',()=>{
  clearTimeout(exitHideTimer);
  exitFocusButton.classList.remove('auto-hidden');
});
exitFocusButton.addEventListener('mouseleave',scheduleExitHide);
exitFocusButton.addEventListener('focus',()=>{clearTimeout(exitHideTimer);exitFocusButton.classList.remove('auto-hidden')});
exitFocusButton.addEventListener('blur',scheduleExitHide);
function fitFocusClock(){
  if(!document.body.classList.contains('focus-mode'))return;
  const w=window.innerWidth,h=window.innerHeight;
  const pad=Math.max(12,Math.min(w,h)*.035);
  // 6 cartões, 2 separadores, 3 espaços internos e 4 espaços externos.
  // O tamanho é limitado simultaneamente pela largura e altura disponíveis.
  const digitW=Math.max(12,Math.min((w-pad*2)/7.15,(h-pad*2)/1.62));
  const digitH=digitW*1.48;
  const root=document.documentElement;
  root.style.setProperty('--focus-digit-w',digitW+'px');
  root.style.setProperty('--focus-digit-h',digitH+'px');
  root.style.setProperty('--focus-font',(digitH*.66)+'px');
  root.style.setProperty('--focus-colon',(digitH*.50)+'px');
  root.style.setProperty('--focus-gap',(digitW*.10)+'px');
  root.style.setProperty('--focus-inner-gap',(digitW*.055)+'px');
}
function setFocus(enabled){
  document.body.classList.toggle('focus-mode',enabled);
  focusButton.setAttribute('aria-pressed',String(enabled));
  focusButton.textContent=enabled?'Mostrar painel':'Só relógio';
  if(enabled){fitFocusClock();scheduleExitHide();}
  else{clearTimeout(exitHideTimer);exitFocusButton.classList.remove('auto-hidden');}
}
focusButton.addEventListener('click',()=>setFocus(true));
exitFocusButton.addEventListener('click',()=>setFocus(false));
window.addEventListener('resize',fitFocusClock);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('focus-mode'))setFocus(false)});
