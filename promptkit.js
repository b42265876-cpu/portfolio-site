const dialog=document.querySelector('.image-dialog');
const dialogImage=dialog?.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach((button)=>{button.addEventListener('click',()=>{if(!dialog||!dialogImage)return;dialogImage.src=button.dataset.zoom;dialogImage.alt=button.querySelector('img')?.alt||'Project detail';dialog.showModal();});});
dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});
