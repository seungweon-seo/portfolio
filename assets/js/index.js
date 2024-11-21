const lenis = new Lenis();

// Lenis
function lenisStart() {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

lenisStart();

// Load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  handleResize();
});

// Mouseover
const linkLogo = document.querySelector('.header .link-logo');
const logoName = document.querySelector('.header .name2');

logoName.addEventListener('animationend', () => {
  linkLogo.addEventListener('mouseover', () => {
    linkLogo.classList.add('on');
  });
  linkLogo.addEventListener('mouseout', () => {
    linkLogo.classList.remove('on');
  });
});

// Click menu
const btnMenu = document.querySelector('.header .btn-menu');
const groupMobile = document.querySelector('.header .group-mobile');

btnMenu.addEventListener('click', handleClick);

function handleClick() {
  groupMobile.classList.toggle('on');
  document.body.classList.toggle('hidden');
  btnMenu.classList.toggle('on');
  document.body.classList.contains('hidden') ? lenis.stop() : lenis.start();
}

// ScrollTo
const scrollToLinks = [];
const linkAbout = document.querySelectorAll('.header .link-about');
const linkContact = document.querySelectorAll('.header .link-contact');
scrollToLinks.push(...linkAbout, ...linkContact);

scrollToLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.classList.contains('link-about') ? '#about' : '#footer';
    const size = window.innerWidth < 768 ? 'mobile' : 'desktop';
    handleScrollTo(e, id, size);
  });
});

function handleScrollTo(e, id, size) {
  e.preventDefault();
  if (size === 'mobile') {
    groupMobile.classList.remove('on');
    document.body.classList.remove('hidden');
    btnMenu.classList.remove('on');
    lenis.start();
  }
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: id },
    ease: 'power3.out',
  });
}

// Project timeline
const stickyProjects = document.querySelectorAll(
  '.sc-project .sticky-project > div:not(.p6)'
);

const projectTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.group-project',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 0,
  },
  ease: 'none',
});

projectTl.to('.sc-project .group-intro .sticky-intro', {
  bottom: '100%',
});

stickyProjects.forEach((el) => {
  projectTl.to(el, {
    bottom: '100%',
  });
});

// Project mousemove
const scProject = document.querySelector('.sc-project');

scProject.addEventListener('mousemove', (e) => {
  const cursors = document.querySelectorAll(
    '.project-cursor [data-target="cursor"]'
  );
  gsap.to(cursors, {
    x: e.clientX + 'px',
    y: e.clientY + 'px',
    duration: 0.7,
    stagger: {
      each: 0.1,
    },
  });
});

// Project mouseover
const groupProject = document.querySelector('.sc-project .group-project');
const projectCursor = document.querySelector('.sc-project .project-cursor');

groupProject.addEventListener('mouseover', () => {
  projectCursor.classList.add('on');
});

groupProject.addEventListener('mouseleave', () => {
  projectCursor.classList.remove('on');
});

gsap.set('.sc-about .group-title .title-area .line .word', { opacity: 0 });

// Init motionpath
let tween;
function initMotionPath() {
  let progress = tween ? tween.progress() : 0;
  tween && tween.progress(0).kill();

  tween = gsap.to('.sphere', {
    motionPath: {
      path: '#orbitPath',
      align: '#orbitPath',
      alignOrigin: [0.5, 0.5],
    },
    duration: 7,
    ease: 'none',
    repeat: -1,
  });

  tween.progress(progress);
}

// Resize
window.addEventListener('resize', () => {
  handleResize();
});

const learnItems = document.querySelectorAll('.sc-learn .learn-item');

let mobile = false;
let mobileTriggers = null;
const mobileBatches = document.querySelectorAll('[data-batch2]');

function handleResize() {
  // Learn offset
  learnItems.forEach((el) => {
    const name = el.querySelector('.name2');
    const wrap = el.querySelector('.name-wrap');
    const box = el.querySelector('.name-box');

    const nameRect = name.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    const nameWidth = nameRect.width + 40;
    const nameOffset = boxRect.left - wrapRect.left;
    const invertedNameWidth = -nameWidth;

    box.style.setProperty('--name2-width', nameWidth + 'px');
    box.style.setProperty('--name-offset', nameOffset + 'px');
    box.style.setProperty('--minus-width', invertedNameWidth + 'px');
  });

  // Header height
  const headerHeight = document
    .querySelector('.header .group-top')
    .getBoundingClientRect().height;

  groupMobile.style.setProperty('--top', headerHeight + 'px');

  // Path resize
  initMotionPath();

  // Learn trigger
  if (window.innerWidth < 768) {
    if (!mobile) {
      mobileTriggers = ScrollTrigger.batch(mobileBatches, {
        start: '0% 70%',
        end: '100% 70%',
        onEnter: function (batches) {
          batches.forEach((batch) => {
            batch.classList.add('on');
          });
        },
        onLeaveBack: function (batches) {
          batches.forEach((batch) => {
            batch.classList.remove('on');
          });
        },
      });
      mobile = true;
    }
  } else {
    if (mobile) {
      mobileTriggers.forEach((trigger) => {
        trigger.kill();
        trigger.trigger.classList.remove('on');
      });
      groupMobile.classList.remove('on');
      btnMenu.classList.remove('on');
      document.body.classList.remove('hidden');
      lenis.start();
      mobile = false;
    }
  }
}

// About trigger
ScrollTrigger.create({
  trigger: '.sc-about',
  start: '0% 50%',
  onEnter: () => {
    gsap.to('.sc-about .group-title .title-area .line .word', {
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      stagger: {
        each: 0.3,
      },
    });
    initMotionPath();
  },
});

// Study trigger
ScrollTrigger.batch('[data-batch]', {
  start: '0% 90%',
  onEnter: function (batches) {
    batches.forEach((batch) => {
      batch.classList.add('on');
    });
  },
});
