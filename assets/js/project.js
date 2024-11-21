const lenis = new Lenis();

// Lenis
function lenisStart() {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

lenisStart();

// Load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  handleResize();
});

// Mouseover
const linkLogo = document.querySelector(".header .link-logo");
const logoName = document.querySelector(".header .name2");

logoName.addEventListener("animationend", () => {
  linkLogo.addEventListener("mouseover", () => {
    linkLogo.classList.add("on");
  });
  linkLogo.addEventListener("mouseout", () => {
    linkLogo.classList.remove("on");
  });
});

// Click menu
const btnMenu = document.querySelector(".header .btn-menu");
const groupMobile = document.querySelector(".header .group-mobile");

btnMenu.addEventListener("click", handleClick);

function handleClick() {
  groupMobile.classList.toggle("on");
  document.body.classList.toggle("hidden");
  btnMenu.classList.toggle("on");
  document.body.classList.contains("hidden") ? lenis.stop() : lenis.start();
}

// Slides
const paginationSlide = new Swiper(".pagination-slide", {
  direction: "vertical",
  mousewheel: true,
  loop: true,
  loopedSlides: 7,
  slidesPerView: 5,
  spaceBetween: 12,
  centeredSlides: true,
});

const projectSlide = new Swiper(".project-slide", {
  direction: "vertical",
  spaceBetween: 24,
  centeredSlides: true,
  mousewheel: {
    releaseOnEdges: "true",
    eventsTarget: ".sc-project2",
  },
  loop: true,
  loopedSlides: 7,
  slidesPerView: "auto",
  freeMode: {
    enabled: true,
    sticky: true,
  },
});

projectSlide.on("slideChange", function () {
  const slideIndex = this.realIndex;
  const title = document.querySelector(".title");
  title.classList.add("hidden");

  setTimeout(() => {
    title.innerText = getTitle(slideIndex);
    title.classList.remove("hidden");
  }, 320);
});

function getTitle(slideIndex) {
  const titles = [
    "Design Idea",
    "EQL",
    "Enterprise Blockchain",
    "40 Wonders",
    "Xexymix",
    "Andar",
    "Seoul City Hall",
    "Naver",
  ];
  return titles[slideIndex];
}

projectSlide.controller.control = paginationSlide;

// Slide Mousemove
const swiperSlides = document.querySelectorAll(".project-slide .swiper-slide");
const projectCursorContainer = document.querySelector(".project-cursor");
const projectCursor = document.querySelector(
  '.project-cursor [data-target="cursor"]'
);

swiperSlides.forEach((slide) => {
  slide.addEventListener("mousemove", (e) => {
    gsap.to(projectCursor, {
      x: e.clientX + "px",
      y: e.clientY + "px",
      duration: 0.7,
      stagger: {
        each: 0.1,
      },
    });
  });
});

gsap.set(".swiper-slide .desc-wrap", {
  opacity: 0,
});
gsap.set(".project-slide .swiper-slide .desc-wrap .desc", { opacity: 0 });
gsap.set(".project-slide .swiper-slide .desc-wrap .line", { width: 0 });

// Resize
let mobile = false;
const slideContents = document.querySelectorAll(".swiper-slide .content");

window.addEventListener("resize", () => {
  handleResize();
});

function handleResize() {
  // Header height
  const headerHeight = document
    .querySelector(".header .group-top")
    .getBoundingClientRect().height;

  groupMobile.style.setProperty("--top", headerHeight + "px");

  if (window.innerWidth < 768) {
    if (mobile) {
      slideContents.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseover", handleMouseOver);
      });
      groupMobile.classList.remove("on");
      btnMenu.classList.remove("on");
      document.body.classList.remove("hidden");
      lenis.start();
      mobile = false;
    }
  } else {
    if (!mobile) {
      slideContents.forEach((el) => {
        el.addEventListener("mouseover", handleMouseOver);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      mobile = true;
    }
  }
}

function handleMouseOver(e) {
  const el = e.currentTarget;
  const video = el.querySelector("video");
  const img = el.querySelector(".img");

  if (video) {
    video.play();
  }
  if (img) {
    img.classList.add("on");
  }
  projectCursorContainer.classList.add("on");

  timeline(el);
}

function handleMouseLeave(e) {
  const el = e.currentTarget;

  const video = el.querySelector("video");
  const img = el.querySelector(".img");
  const descWrap = el.querySelector(".desc-wrap");

  projectCursorContainer.classList.remove("on");
  gsap.to(descWrap, {
    opacity: 0,
    duration: 1,
  });
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  if (img) {
    img.classList.remove("on");
  }
}

function timeline(el) {
  const descWrap = el.querySelector(".desc-wrap");
  const desc = el.querySelectorAll(".desc");
  const line = el.querySelectorAll(".line");

  const descTl = gsap.timeline();
  descTl
    .to(
      descWrap,
      {
        duration: 1,
        opacity: 1,
      },
      "a"
    )
    .to(
      desc,
      {
        duration: 1,
        opacity: 1,
        stagger: {
          each: 0.2,
        },
      },
      "a+=.5"
    )
    .to(
      line,
      {
        width: "100%",
        duration: 1,
        stagger: {
          each: 0.7,
        },
        ease: "power1.out",
      },
      "a+=1"
    );
}
