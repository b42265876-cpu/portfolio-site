const sections=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.chapter-nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;links.forEach(link=>link.classList.toggle('is-active',link.hash==='#'+visible.target.id));},{rootMargin:'-20% 0px -65%',threshold:[0,.25,.5]});
sections.forEach(section=>observer.observe(section));
