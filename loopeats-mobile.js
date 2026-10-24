const mobileBoardContent = [
  {
    figure: '.direct-system-map',
    eyebrow: 'Service blueprint',
    title: 'How the service works',
    summary: 'The map connects food providers, the LoopEats app, shared kitchens and collectors across one local exchange system.'
  },
  {
    figure: '#food-management .direct-design-board',
    eyebrow: 'Final design · 01',
    title: 'Manage food before it becomes waste',
    summary: 'Meal planning, inventory and food details help people notice surplus early and choose a useful next action.'
  },
  {
    figure: '#sharing-flow .direct-design-board',
    eyebrow: 'Final design · 02',
    title: 'Share and collect with less coordination',
    summary: 'Clear listings, reservations and pickup information make local exchange more discreet, predictable and trustworthy.'
  },
  {
    figure: '.final-design-board-section:last-of-type .direct-design-board',
    eyebrow: 'Final design · 03',
    title: 'Make community impact visible',
    summary: 'Community activities and personal progress turn individual food-saving actions into a shared sense of contribution.'
  }
];

const dialog = document.createElement('dialog');
dialog.className = 'loopeats-image-dialog';
dialog.setAttribute('aria-label', 'Full-resolution project image');
dialog.innerHTML = '<button class="loopeats-dialog-close" type="button" aria-label="Close image">×</button><img alt="">';
document.body.append(dialog);

const dialogImage = dialog.querySelector('img');

mobileBoardContent.forEach(({ figure: selector, eyebrow, title, summary }) => {
  const figure = document.querySelector(selector);
  const image = figure?.querySelector('img');
  if (!figure || !image) return;

  const intro = document.createElement('header');
  intro.className = 'mobile-board-intro';
  intro.innerHTML = `<span>${eyebrow}</span><h2>${title}</h2><p>${summary}</p>`;
  figure.insertAdjacentElement('beforebegin', intro);

  const hint = document.createElement('span');
  hint.className = 'mobile-zoom-hint';
  hint.textContent = 'Tap to view full detail';
  figure.insertAdjacentElement('afterend', hint);

  figure.tabIndex = 0;
  figure.setAttribute('role', 'button');
  figure.setAttribute('aria-label', `Enlarge ${title}`);
  const open = () => {
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.scrollLeft = 0;
  };
  figure.addEventListener('click', open);
  figure.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

dialog.querySelector('.loopeats-dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
