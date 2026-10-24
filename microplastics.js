const sections=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.chapter-nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;links.forEach(link=>link.classList.toggle('is-active',link.hash==='#'+visible.target.id));},{rootMargin:'-20% 0px -65%',threshold:[0,.25,.5]});
sections.forEach(section=>observer.observe(section));

const zoomableImages=[...document.querySelectorAll('.source-board,.flow-image')];
const imageDialog=document.createElement('dialog');
imageDialog.className='microplastics-image-dialog';
imageDialog.setAttribute('aria-label','Full-size project image');
imageDialog.innerHTML='<button class="microplastics-dialog-close" type="button" aria-label="Close image">×</button><img alt="">';
document.body.append(imageDialog);

const dialogImage=imageDialog.querySelector('img');
const closeDialog=()=>imageDialog.close();
imageDialog.querySelector('button').addEventListener('click',closeDialog);
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)closeDialog();});

zoomableImages.forEach(image=>{
  const title=image.closest('section')?.querySelector('.section-head h2')?.textContent.trim()||'project image';
  image.tabIndex=0;
  image.setAttribute('role','button');
  image.setAttribute('aria-label',`Enlarge ${title}`);
  const hint=document.createElement('p');
  hint.className='board-zoom-hint';
  hint.textContent='Tap to view details';
  image.insertAdjacentElement('afterend',hint);
  const openImage=()=>{
    dialogImage.src=image.currentSrc||image.src;
    dialogImage.alt=image.alt;
    imageDialog.showModal();
    imageDialog.scrollTo(0,0);
  };
  image.addEventListener('click',openImage);
  image.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();openImage();}
  });
});
