const projects = {
  lea: {
    presentation: 'assets/project-lea-presentation.pdf',
    category: 'REAL-CLIENT CONSULTING / PROJECT LEA',
    title: 'Finding nonprofit partners in NYC.',
    intro: 'Our consulting team helped Leadership Impact identify potential NYC nonprofit partners and plan its first steps for outreach.',
    sections: [
      ['The challenge', 'Support a nonprofit’s NYC expansion with a practical approach to finding and assessing potential partners.'],
      ['My role', 'I served as client liaison and outreach strategy lead. I handled client communication and contributed to the recommendations for finding and approaching potential partners.'],
      ['The work', 'The team narrowed a broad pool of 200+ organizations into a 71-organization pipeline, grouping candidates by function and health focus. We recommended a scoring matrix, prioritized outreach, and a phased launch through the NYU ecosystem.'],
      ['What we handed over', 'A candidate register, an assessment framework, and recommendations for scoring organizations, prioritizing outreach, and planning an initial launch.']
    ], metric: '71 organizations', metricLabel: 'in the team’s candidate pipeline',
    note: 'Real-client consulting engagement. The pipeline is a team deliverable; it does not represent 71 confirmed partnerships.'
  },
  sync: {
    presentation: 'assets/asana-adaptive-sync-presentation.pdf',
    category: 'HACKATHON FINAL PITCH / ASANA ADAPTIVE SYNC',
    title: 'From Slack messages to Asana tasks.',
    intro: 'Asana Adaptive Sync was our hackathon proposal for turning decisions made in Slack into tasks and updates in Asana.',
    sections: [
      ['The question', 'A team agrees on a task or changes a deadline in Slack, but nobody updates Asana. The project board then shows an old version of the plan.'],
      ['My contribution', 'As team lead, I led development of the workflow proposal, collaborated with Asana representatives, and guided the team from initial concept to final pitch.'],
      ['The approach', 'The concept connects Slack conversations to structured Asana work through three proposed capabilities: generating projects from tasks and deadlines in chat, confirming task updates in real time, and surfacing risk patterns such as unresolved blockers or repeated deadline shifts.'],
      ['Where the project stands', 'The materials describe the proposed workflow and its three capabilities. We have not measured time savings or deployed a production integration.']
    ], metric: 'Slack → Asana', metricLabel: 'Project setup · Task updates · Risk alerts',
    note: 'Our team was selected for the hackathon challenge and delivered this final presentation directly to Asana.'
  },
  operations: {
    category: 'PROFESSIONAL EXPERIENCE / NEWTON OIL COMPANY',
    title: 'Moving billing off manual processes.',
    intro: 'At Newton Oil, I worked on the mobile billing transition, record migration, and vendor file transfers.',
    sections: [
      ['The challenge', 'Manual billing processes and fragmented records added work to routine operations and slowed the flow of information.'],
      ['My role', 'As Office Assistant / Analyst, I led the transition to mobile billing and managed the migration of 10,000+ records using SQL and Excel.'],
      ['The result', 'The billing transition reduced manual processing time for transport records and invoices by 40%. The record migration improved data accuracy by 15%. I also partnered with vendors on EDI and Managed File Transfer solutions, reducing reporting lag from days to hours.'],
      ['Other responsibilities', 'I also reconciled more than $1 million in monthly accounts and supported tax and regulatory recordkeeping.']
    ], metric: '40% less manual processing', metricLabel: 'for transport records and invoices',
    note: 'Newton Oil Company · December 2023–August 2024.'
  }
};
const dialog = document.getElementById('project-dialog');
const body = document.getElementById('dialog-body');
let lastTrigger;
function closeProject(){dialog.close();document.body.classList.remove('modal-open');if(lastTrigger)lastTrigger.focus();}
document.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();lastTrigger=link;const p=projects[link.dataset.project];
  body.replaceChildren();
  const add=(tag,text,className)=>{const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;body.append(el);return el;};
  add('p',p.category,'eyebrow');const heading=add('h2',p.title);heading.id='dialog-title';add('p',p.intro);
  const metric=add('div',p.metric,'dialog-metric');const label=document.createElement('span');label.textContent=p.metricLabel;metric.append(label);
  p.sections.forEach(([title,text])=>{add('h3',title);add('p',text);});add('p',p.note,'scope-note');if(p.presentation){const a=add('a','View team presentation (PDF) ↗','presentation-link');a.href=p.presentation;a.target='_blank';a.rel='noopener noreferrer';}
  dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;
}));
document.querySelector('.close-dialog').addEventListener('click',closeProject);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeProject();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeProject();}});
document.getElementById('copy-email').addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText('simiao.song26@gmail.com');status.textContent='Email copied!';}catch{status.textContent='simiao.song26@gmail.com';}setTimeout(()=>{status.textContent='';},5000);});


// Reflect the reader's current section in the persistent navigation.
(() => {
 const links=[...document.querySelectorAll('.nav nav a[href^="#"]')];
 const sections=links.map(link=>({link,section:document.querySelector(link.getAttribute('href'))})).filter(x=>x.section);
 let scheduled=false;
 function update(){scheduled=false;const threshold=document.querySelector('.nav').getBoundingClientRect().height+65;let current=null;for(const item of sections){if(item.section.getBoundingClientRect().top<=threshold)current=item;}for(const item of sections){if(item===current)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');}}
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();
})();

(() => {const gallery=document.getElementById('nature-gallery');if(!gallery)return;const previous=document.getElementById('nature-previous'),next=document.getElementById('nature-next');function update(){previous.disabled=gallery.scrollLeft<5;next.disabled=gallery.scrollLeft+gallery.clientWidth>=gallery.scrollWidth-5;}function move(direction){const figure=gallery.querySelector('figure');gallery.scrollBy({left:direction*(figure.getBoundingClientRect().width+parseFloat(getComputedStyle(gallery).gap)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));gallery.addEventListener('scroll',update,{passive:true});gallery.addEventListener('keydown',e=>{if(e.target!==gallery)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});window.addEventListener('resize',update);update();})();

(() => {const toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('section-navigation');function close(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});document.addEventListener('click',e=>{if(!e.target.closest('.nav'))close();});window.addEventListener('resize',()=>{if(window.innerWidth>1100)close();});})();
