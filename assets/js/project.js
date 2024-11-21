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

// Slides
const paginationSlide = new Swiper('.pagination-slide', {
  direction: 'vertical',
  mousewheel: true,
  loop: true,
  loopedSlides: 7,
  slidesPerView: 5,
  spaceBetween: 12,
  centeredSlides: true,
});

const projectSlide = new Swiper('.project-slide', {
  direction: 'vertical',
  spaceBetween: 24,
  centeredSlides: true,
  mousewheel: {
    releaseOnEdges: 'true',
    eventsTarget: '.sc-project2',
  },
  loop: true,
  loopedSlides: 7,
  slidesPerView: 'auto',
  freeMode: {
    enabled: true,
    sticky: true,
  },
});

projectSlide.on('slideChange', function () {
  const slideIndex = this.realIndex;
  const title = document.querySelector('.title');
  title.classList.add('hidden');

  setTimeout(() => {
    title.innerText = getTitle(slideIndex);
    title.classList.remove('hidden');
  }, 320);
});

function getTitle(slideIndex) {
  const titles = [
    'Design Idea',
    'EQL',
    'Enterprise Blockchain',
    '40 Wonders',
    'Xexymix',
    'Andar',
    'Seoul City Hall',
    'Naver',
  ];
  return titles[slideIndex];
}

projectSlide.controller.control = paginationSlide;

// Slide Mousemove
const swiperSlides = document.querySelectorAll('.project-slide .swiper-slide');
swiperSlides.forEach((slide) => {
  slide.addEventListener('mousemove', (e) => {
    const projectCursor = document.querySelector(
      '.project-cursor [data-target="cursor"]'
    );
    gsap.to(projectCursor, {
      x: e.clientX + 'px',
      y: e.clientY + 'px',
      duration: 0.7,
      stagger: {
        each: 0.1,
      },
    });
  });
});

gsap.set('.swiper-slide .desc-wrap', {
  opacity: 0,
});
gsap.set('.project-slide .swiper-slide .desc', { opacity: 0 });
gsap.set('.project-slide .swiper-slide .line', { width: 0 });

// Resize
let mobile = false;

window.addEventListener('resize', () => {
  handleResize();
});

function handleResize() {
  if (window.innerWidth > 768) {
    if (mobile) {
      groupMobile.classList.remove('on');
      btnMenu.classList.remove('on');
      document.body.classList.remove('hidden');
      lenis.start();
      mobile = false;
    }
  } else {
    if (!mobile) {
      mobile = true;
    }
  }
}

$(window).resize(function () {
  sizeChk();
});
sizeChk();

function sizeChk() {
  const headerHeight = $('.header .group-top').innerHeight();
  $('.header .group-mobile').css('--top', headerHeight + 'px');

  if ($(window).width() < 768) {
    $('.sc-project2 .project-slide .swiper-slide .content').off(
      'mouseover mouseleave'
    );
  } else {
    $('.sc-project2 .project-slide .swiper-slide .content').off(
      'mouseover mouseleave'
    );

    $('.sc-project2 .project-slide .swiper-slide .content').mouseover(
      function () {
        if ($(this).find('video').length > 0) {
          const video = $(this).find('video').get(0).play();
          if (video !== undefined) {
            video
              .then((_) => {
                video.pause();
              })
              .catch((error) => {});
          }
        }
        $('.sc-project2 .project-cursor').addClass('on');
        $(this).find('.img').addClass('on');

        descTl = gsap.timeline();
        descTl
          .to(
            $(this).find('.desc-wrap'),
            {
              opacity: 1,
              duration: 1,
            },
            'a'
          )
          .to(
            $(this).find('.desc'),
            {
              opacity: 1,
              duration: 1,
              stagger: {
                each: 0.2,
              },
            },
            'a+=.5'
          )
          .to(
            $(this).find('.desc-box').find('.line'),
            {
              width: '100%',
              duration: 1,
              stagger: {
                each: 0.7,
              },
              ease: 'power1.out',
            },
            'a+=1'
          );
      }
    );

    $('.sc-project2 .project-slide .swiper-slide .content').mouseleave(
      function () {
        $('.sc-project2 .project-cursor').removeClass('on');
        $(this).find('.img').removeClass('on');

        gsap.to($(this).find('.desc-wrap'), {
          opacity: 0,
          duration: 1,
        });

        if ($(this).find('video').length > 0) {
          $(this).find('video').get(0).pause();
          $(this).find('video').get(0).currentTime = 0;
        }
      }
    );
  }
}
