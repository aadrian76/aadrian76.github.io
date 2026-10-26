const $=s=>document.querySelector(s);
let z=10,n=0;
const files=document.querySelectorAll('.file');
files.forEach(f=>f.onclick=()=>{files.forEach(x=>x.classList.toggle('sel',x===f));openWin(f.dataset.page,f.dataset.name)});
function focusWin(w){document.querySelectorAll('.win').forEach(x=>x.classList.remove('top'));w.classList.add('top');w.style.zIndex=++z}
function openWin(page,name){
  let w=$(`.win[data-page="${page}"]`);
  if(!w){
    w=document.createElement('section');w.className='win';w.dataset.page=page;
    const o=(n++%6)*30;
    w.style.left=(innerWidth<700?innerWidth*.04:110+o)+'px';w.style.top=(60+o)+'px';
    w.innerHTML=`<header><span class="tl"><button class="c" aria-label="Cerrar"></button><button class="m" aria-label="Minimizar"></button><button class="x" aria-label="Ampliar"></button></span>${name}</header><iframe src="${page}" title="${name}"></iframe>`;
    document.body.append(w);
    const h=w.firstChild;let dx,dy;
    h.querySelector('.c').onclick=()=>w.remove();
    h.querySelector('.m').onclick=()=>w.hidden=true;
    h.querySelector('.x').onclick=()=>w.classList.toggle('max');
    w.onpointerdown=()=>focusWin(w);
    h.onpointerdown=e=>{if(e.target.closest('button')||w.classList.contains('max'))return;dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;h.setPointerCapture(e.pointerId);w.classList.add('dragging')};
    h.onpointermove=e=>{if(!h.hasPointerCapture(e.pointerId))return;w.style.left=Math.min(Math.max(e.clientX-dx,80-w.offsetWidth),innerWidth-80)+'px';w.style.top=Math.min(Math.max(e.clientY-dy,28),innerHeight-60)+'px'};
    h.onpointerup=()=>w.classList.remove('dragging');
  }
  w.hidden=false;focusWin(w);
}
const tick=()=>$('#clock').textContent=new Date().toLocaleString('es-ES',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).replace(',','');
tick();setInterval(tick,3e4);
openWin('pages/sobre-mi.html','Sobre_mi.txt');
const me=$('#me'),card=$('#card');
const toggleCard=open=>{card.hidden=!open;me.setAttribute('aria-expanded',open)};
me.onclick=e=>{e.stopPropagation();toggleCard(card.hidden)};
document.addEventListener('click',e=>{if(!card.contains(e.target))toggleCard(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleCard(false)});
