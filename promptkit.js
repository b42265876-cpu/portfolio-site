const boardSummaries={
  'Project timeline':'A four-stage Double Diamond process connects discovery, definition, development and delivery.',
  'Brief interpretation & scoping':'The brief reframed the challenge around protecting authorship, visual consistency and creative control.',
  'Interview summary':'Five perspectives revealed a shared need for clearer intent, stronger handoffs and traceable iteration.',
  'DNEG client exchange':'Industry input narrowed the project from broad AI generation to pre-production intent control.',
  'Creative risk assessment':'A participant study mapped where AI involvement creates the highest risk of creative drift.',
  'Journey map after using AI':'The workflow map exposed where meaning is lost between feedback, generation, review and handoff.',
  'Key insights':'Research converged on five opportunities: intent locking, structure, translation, history and actionable handoff.',
  'Problem definition':'The final problem statement focuses on keeping visual intent aligned across AI-assisted pre-production.',
  'Six concept directions':'Six early directions explored creation, handoff, iteration, alignment, review and personal workflows.',
  'Concept selection & synthesis':'The strongest ideas were combined into one shared system for teams and individual artists.',
  'One system, two workspaces':'The web workspace supports alignment and traceability; the app enables fast personal capture.',
  'Prompt frame development':'Source review and affinity mapping turned model-specific prompt language into a shared visual vocabulary.',
  'Prompt frame verification':'Iterative testing identified the minimum set of fields needed to preserve intent without adding friction.',
  'Lo-fi prototype evolution':'Three prototype rounds simplified the journey, clarified authorship and made handoff states visible.',
  'Three key changes':'The final iteration balances structured creation, human control and a traceable production handoff.',
  'Information architecture':'PromptKit moves from source analysis to structured framing, video parameters, generation and delivery.',
  'Final web — Analyse Frame':'A sketch anchors the original visual direction before AI suggestions enter the workflow.',
  'Final web — Artist-led direction':'Artists review suggested components and confirm only the choices that match their intent.',
  'Final web — Structured refinement':'Reusable prompt components turn creative decisions into a consistent, editable visual brief.',
  'Final web — Motion direction':'Motion, camera and timing are added as explicit decisions rather than hidden prompt text.',
  'Final web — Preview and parameters':'A unified preview keeps the source, generated result and confirmed parameters visible together.',
  'Final web — Review and handoff':'Review states, ownership and permissions create a clear package for downstream teams.',
  'App — Personal Prompt Companion':'The companion app captures rough ideas quickly and syncs them into the shared team workflow.'
};

document.querySelectorAll('.source-board').forEach((board)=>{
  const marker=board.querySelector('.board-marker');
  const title=marker?.querySelector('h2')?.textContent?.trim();
  if(!marker||!title||!boardSummaries[title])return;
  const figmaBoard=board.querySelector('.board-button');
  if(figmaBoard)figmaBoard.classList.add('figma-board-body');
  const summary=document.createElement('p');
  summary.className='board-summary';
  summary.textContent=boardSummaries[title];
  marker.insertAdjacentElement('afterend',summary);
});

const dialog=document.querySelector('.image-dialog');
const dialogImage=dialog?.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach((button)=>{button.addEventListener('click',()=>{if(!dialog||!dialogImage)return;dialogImage.src=button.dataset.zoom;dialogImage.alt=button.querySelector('img')?.alt||'Project detail';dialog.showModal();dialog.scrollTop=0;dialog.scrollLeft=0;});});
dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});

const deliverSections=[...document.querySelectorAll('.deliver-section')];
const iaViewport=document.querySelector('.ia-viewport');
const iaCanvas=document.querySelector('.ia-canvas');
const iaTitle=document.querySelector('.ia-title');
const iaLede=document.querySelector('.ia-lede');
const sizeInformationArchitecture=()=>{
  if(!iaViewport||!iaCanvas)return;
  const scale=Math.min(1,iaViewport.clientWidth/1940);
  const referenceBoard=document.querySelector('.source-board');
  const referenceTitle=referenceBoard?.querySelector('.board-marker h2');
  const referenceLede=document.querySelector('.board-summary');
  const referenceBody=referenceBoard?.querySelector('.figma-board-body');
  const targetLedeSize=referenceLede?parseFloat(getComputedStyle(referenceLede).fontSize):20;
  const titleLedeGap=referenceTitle&&referenceLede?referenceLede.getBoundingClientRect().top-referenceTitle.getBoundingClientRect().bottom:60;
  const ledeBodyGap=referenceLede&&referenceBody?referenceBody.getBoundingClientRect().top-referenceLede.getBoundingClientRect().bottom:118;
  iaCanvas.style.setProperty('--ia-scale',String(scale));
  iaCanvas.style.setProperty('--ia-lede-size',`${targetLedeSize/scale}px`);
  const ledeTop=95+(iaTitle?.offsetHeight||114)+(titleLedeGap/scale);
  iaCanvas.style.setProperty('--ia-lede-top',`${ledeTop}px`);
  const bodyShift=ledeTop+(iaLede?.offsetHeight||30)+(ledeBodyGap/scale)-324;
  iaCanvas.style.setProperty('--ia-body-shift',`${bodyShift}px`);
  iaViewport.style.setProperty('--ia-scale',String(scale));
};
const sizePage2=()=>{
  deliverSections.forEach((section)=>{
    const viewport=section.querySelector('.deliver-section-viewport');
    const canvas=section.querySelector('.deliver-section-canvas');
    const layer=section.querySelector('.p2-local-layer');
    if(!viewport||!canvas||!layer)return;
    const canvasStyle=getComputedStyle(canvas);
    const sectionOffset=parseFloat(canvasStyle.getPropertyValue('--section-offset'))||0;
    const sectionPaddingBottom=parseFloat(canvasStyle.getPropertyValue('--section-padding-bottom'))||0;
    const measuredBottom=[...layer.children]
      .filter((item)=>!item.classList.contains('p2-material'))
      .reduce((bottom,item)=>Math.max(bottom,item.offsetTop+item.offsetHeight),sectionOffset);
    const naturalHeight=Math.ceil(measuredBottom-sectionOffset+sectionPaddingBottom);
    canvas.style.setProperty('--section-height',`${naturalHeight}px`);
    const scale=Math.min(1,viewport.clientWidth/1940);
    canvas.style.setProperty('--deliver-scale',String(scale));
    viewport.style.height=`${naturalHeight*scale}px`;
  });
};
sizeInformationArchitecture();
sizePage2();
document.querySelectorAll('.deliver-section img').forEach((image)=>{
  if(!image.complete)image.addEventListener('load',sizePage2,{once:true});
});
document.fonts?.ready.then(sizePage2);
window.addEventListener('resize',()=>{sizeInformationArchitecture();sizePage2();},{passive:true});

