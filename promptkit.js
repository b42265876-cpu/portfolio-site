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
  'Lo-fi prototype evolution':'Four prototype rounds simplified the journey, clarified authorship and made handoff states visible.',
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

const promotedBoardLeads={
  'Project timeline':'We used the Double Diamond model to organise our weekly project plan from research to final delivery.This model helped us make the project process clearer, more focused, and easier to manage as a team. Details of the plan list can be found in the attachment',
  'Six concept directions':'Based on the pain points and problem statement identified in research, we explored six ways to preserve creative intent across AI-assisted production workflows.',
  'Concept selection & synthesis':'From six directions to one integrated solution — selected through clear criteria and combined into a practical workflow.',
  'One system, two workspaces':'PromptKit uses one shared prompt framework across two complementary products: an App for fast individual creation and a Web workspace for team alignment, refinement and hand-off.·',
  'Prompt frame development':'Reviewed prompting guidance across six major  image-generation systems, normalised overlapping terms, and used affinity mapping to develop a shared prompt structure.',
  'Prompt frame verification':'Through approximately 70 exploratory generations in fal.ai, we compared how Prompt Frame components shaped the output. We then assessed each component’s impact and omission risk to prioritise six inputs for the Minimum Prompt.',
  'Lo-fi prototype evolution':'Four rounds of user testing transformed PromptKit from an overloaded prompt generator into a structured, human-controlled and reviewable workflow.',
  'Three key changes':'The key shift was not visual polish-it was giving artists clearer control over what Al suggested, what humans confirmed and what teams inherited.'
};
const promotedLeadTexts=new Set(Object.values(promotedBoardLeads).map((text)=>text.trim()));
const promotedSummaryWeight=(style='')=>{
  const value=String(style).toLowerCase();
  if(value.includes('bold'))return value.includes('semi')?600:700;
  if(value.includes('medium'))return 500;
  return 400;
};
const renderPromotedSummary=(summary,textNode)=>{
  if(!textNode?.segs?.length){
    summary.textContent=textNode?.c||'';
    return;
  }
  textNode.segs.forEach((segment)=>{
    const span=document.createElement('span');
    const fill=segment.fill;
    span.textContent=segment.c;
    const isBaseText=fill&&fill.r>.95&&fill.g>.95&&fill.b>.95;
    if(fill&&!isBaseText)span.style.color=`rgba(${Math.round(fill.r*255)},${Math.round(fill.g*255)},${Math.round(fill.b*255)},${fill.o??1})`;
    span.style.fontWeight=promotedSummaryWeight(segment.st);
    summary.append(span);
  });
};

document.querySelectorAll('.source-board').forEach((board)=>{
  const marker=board.querySelector('.board-marker');
  const title=marker?.querySelector('h2')?.textContent?.trim();
  if(!marker||!title||!boardSummaries[title])return;
  const figmaBoard=board.querySelector('.board-button');
  let boardNumber='';
  if(figmaBoard){
    figmaBoard.classList.add('figma-board-body');
    const image=figmaBoard.querySelector('img');
    boardNumber=image?.alt?.match(/board\s+(\d{2})/i)?.[1]||'';
    if(boardNumber){
      const cleanBackground=`assets/promptkit/clean-backgrounds/promptkit-${boardNumber}-clean@2x.png`;
      image.removeAttribute('srcset');
      image.src=cleanBackground;
      figmaBoard.dataset.zoom=cleanBackground;
    }
  }
  const summary=document.createElement('p');
  summary.className='board-summary';
  const promotedLead=promotedBoardLeads[title];
  const promotedNode=promotedLead&&window.PROMPTKIT_BOARD_TEXT?.[Number(boardNumber)]?.texts?.find((textNode)=>textNode.c.trim()===promotedLead.trim());
  if(promotedNode){
    summary.classList.add('board-summary--promoted');
    renderPromotedSummary(summary,promotedNode);
  }else{
    summary.textContent=boardSummaries[title];
  }
  marker.insertAdjacentElement('afterend',summary);
});

const dialog=document.querySelector('.image-dialog');
const dialogImage=dialog?.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach((button)=>{button.addEventListener('click',()=>{if(!dialog||!dialogImage)return;dialogImage.src=button.dataset.zoom;dialogImage.alt=button.querySelector('img')?.alt||'Project detail';dialog.showModal();dialog.scrollTop=0;dialog.scrollLeft=0;});});
dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});

const fontWeightFromStyle=(style='')=>{
  const value=String(style||'').toLowerCase();
  if(value.includes('black'))return 900;
  if(value.includes('extra bold'))return 800;
  if(value.includes('bold'))return 700;
  if(value.includes('semi'))return 600;
  if(value.includes('medium'))return 500;
  if(value.includes('light'))return 300;
  if(value.includes('thin'))return 200;
  return 400;
};

const cssColor=(fill)=>{
  if(!fill)return '#ffffff';
  const r=Math.round(fill.r*255);
  const g=Math.round(fill.g*255);
  const b=Math.round(fill.b*255);
  return `rgba(${r},${g},${b},${fill.o??1})`;
};

const createBoardTextLayer=(button,boardNumber,board)=>{
  const image=button.querySelector('img');
  if(!image||!board?.texts?.length)return;
  const layer=document.createElement('div');
  layer.className='board-text-layer';
  layer.lang='en';
  layer.setAttribute('aria-label',`Translatable text for board ${boardNumber}`);

  board.texts
    .filter((textNode)=>!promotedLeadTexts.has(textNode.c?.trim())&&!textNode.c?.includes('Evidence Deck')&&!/^\s*Section\s+0\d/i.test(textNode.c||''))
    .forEach((textNode)=>{
    if(!textNode.c?.trim())return;
    const node=document.createElement('div');
    const content=document.createElement('span');
    node.className='board-text-node';
    const emojiOnly=/^[\p{Extended_Pictographic}\uFE0F\u200D]+$/u.test(textNode.c.trim());
    if(emojiOnly)node.classList.add('is-emoji');
    const compactLabels=new Set(['HMW','Issue:','Decision:','Before:','After:','Design Response:']);
    const compactLabel=compactLabels.has(textNode.c.trim());
    if(compactLabel)node.classList.add('is-compact-label');
    node.dataset.original=textNode.c;
    content.className='board-text-content';
    if(textNode.segs?.length){
      textNode.segs.forEach((segment)=>{
        const run=document.createElement('span');
        run.className='board-text-segment';
        run.textContent=segment.c;
        run.style.setProperty('--segment-font',`"${segment.ff||textNode.ff||'Inter'}",Inter,Arial,sans-serif`);
        run.style.setProperty('--segment-weight',fontWeightFromStyle(segment.st||textNode.st));
        run.style.setProperty('--segment-style',(segment.st||textNode.st)?.toLowerCase().includes('italic')?'italic':'normal');
        run.style.setProperty('--segment-color',cssColor(segment.fill||textNode.fill));
        run._sourceSegment=segment;
        content.append(run);
      });
    }else{
      content.textContent=textNode.c;
    }
    node.append(content);
    node.style.left=`${textNode.x/board.w*100}%`;
    const sourceY=boardNumber==='10'&&textNode.c.trim()==='Assemble | Export'?1025.037109375:textNode.y;
    node.style.top=`${sourceY/board.h*100}%`;
    node.style.width=`${textNode.w/board.w*100}%`;
    node.style.height=`${textNode.h/board.h*100}%`;
    node.style.setProperty('--text-color',cssColor(textNode.fill));
    node.style.setProperty('--text-font',`"${textNode.ff||'Inter'}",Inter,Arial,sans-serif`);
    node.style.setProperty('--text-weight',fontWeightFromStyle(textNode.st));
    node.style.setProperty('--text-style',textNode.st?.toLowerCase().includes('italic')?'italic':'normal');
    node.style.setProperty('--text-align',(textNode.ah||'LEFT').toLowerCase());
    node.style.setProperty('--text-opacity',textNode.op??1);
    layer.append(node);
    node._sourceText=textNode;
    });
  button.append(layer);

  const updateScale=()=>{
    const scale=button.clientWidth/board.w;
    layer.style.height=`${board.h*scale}px`;
    layer.querySelectorAll('.board-text-node').forEach((node)=>{
      const source=node._sourceText;
      const fontSize=(source.fs||16)*scale;
      node._boardScale=scale;
      node.style.fontSize=`${fontSize}px`;
      if(source.lh?.unit==='PIXELS')node.style.setProperty('--text-line-height',`${source.lh.value*scale}px`);
      else if(source.lh?.unit==='PERCENT')node.style.setProperty('--text-line-height',`${source.lh.value/100}`);
      else node.style.setProperty('--text-line-height','normal');
      if(source.ls?.unit==='PIXELS')node.style.setProperty('--text-letter-spacing',`${source.ls.value*scale}px`);
      else if(source.ls?.unit==='PERCENT')node.style.setProperty('--text-letter-spacing',`${fontSize*source.ls.value/100}px`);
      else node.style.setProperty('--text-letter-spacing','normal');
      node.querySelectorAll('.board-text-segment').forEach((segment)=>{
        if(segment._sourceSegment?.fs)segment.style.fontSize=`${segment._sourceSegment.fs*scale}px`;
      });
    });
    scheduleTranslationFit();
  };

  let fitFrame=0;
  const fitTranslatedText=()=>{
    fitFrame=0;
    layer.querySelectorAll('.board-text-node').forEach((node)=>{
      const content=node.querySelector('.board-text-content');
      if(!content)return;
      const original=String(node.dataset.original||'').replace(/\s+/g,'').trim();
      const current=String(node.textContent||'').replace(/\s+/g,'').trim();
      const translated=Boolean(current&&current!==original);
      node.classList.toggle('is-translated',translated);
      content.style.transform='none';
      const source=node._sourceText;
      const boardScale=node._boardScale||1;
      const largestSourceFont=Math.max(source.fs||0,...(source.segs||[]).map((segment)=>segment.fs||0),16);
      const cleanSourceText=String(source.c||'').trim();
      const sourceSingleLine=!/[\r\n]/.test(cleanSourceText)&&source.h<=largestSourceFont*1.6;
      node.classList.toggle('is-source-single-line',sourceSingleLine&&!translated);
      node.style.fontSize=`${(source.fs||16)*boardScale}px`;
      node.style.height='auto';
      node.style.minHeight=`${source.h/board.h*100}%`;
      node.querySelectorAll('.board-text-segment').forEach((segment)=>{
        if(segment._sourceSegment?.fs)segment.style.fontSize=`${segment._sourceSegment.fs*boardScale}px`;
      });
      if(sourceSingleLine&&!translated){
        const naturalWidth=content.scrollWidth;
        const availableWidth=source.w*boardScale;
        if(naturalWidth>availableWidth+.5)content.style.transform=`scale(${availableWidth/naturalWidth})`;
      }
    });
  };
  const scheduleTranslationFit=()=>{
    cancelAnimationFrame(fitFrame);
    fitFrame=requestAnimationFrame(()=>requestAnimationFrame(fitTranslatedText));
  };

  updateScale();
  new ResizeObserver(updateScale).observe(button);
  new MutationObserver(scheduleTranslationFit).observe(layer,{subtree:true,childList:true,characterData:true});
};

Object.entries(window.PROMPTKIT_BOARD_TEXT||{}).forEach(([boardNumber,board])=>{
  const image=document.querySelector(`.board-button img[alt*="board ${String(boardNumber).padStart(2,'0')}"]`);
  const button=image?.closest('.board-button');
  if(button)createBoardTextLayer(button,boardNumber,board);
});

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

const heroTitle=document.querySelector('.case-hero h1');
const updateHeroTranslationState=()=>{
  const translated=heroTitle&&heroTitle.textContent.trim()!=='PromptKit';
  heroTitle?.classList.toggle('is-translated-title',Boolean(translated));
};
if(heroTitle){
  updateHeroTranslationState();
  new MutationObserver(updateHeroTranslationState).observe(heroTitle,{subtree:true,childList:true,characterData:true});
}

// Warm the prototype connection only when the visitor shows intent to open it.
// The regular document prefetch remains as a browser-level fallback.
const prototypeLinks=[...document.querySelectorAll('a[href*="b42265876-cpu.github.io/Cynthia/web.html"]')];
let prototypeWarmupStarted=false;
const warmPrototype=()=>{
  if(prototypeWarmupStarted)return;
  prototypeWarmupStarted=true;
  const resources=[
    'https://b42265876-cpu.github.io/Cynthia/web.html',
    'https://b42265876-cpu.github.io/Cynthia/promptkit.css?v=20261102',
    'https://b42265876-cpu.github.io/Cynthia/promptkit.js?v=20261102'
  ];
  resources.forEach((href)=>{
    const hint=document.createElement('link');
    hint.rel='prefetch';
    hint.href=href;
    document.head.append(hint);
  });
};
prototypeLinks.forEach((link)=>{
  link.addEventListener('pointerenter',warmPrototype,{once:true,passive:true});
  link.addEventListener('focus',warmPrototype,{once:true,passive:true});
  link.addEventListener('touchstart',warmPrototype,{once:true,passive:true});
});


