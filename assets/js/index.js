const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

$(window).on("load", function () {
  $("body").addClass("loaded");
  sizeChk();
});

$(".header .group-top .logo a .name-wrap .name2").on(
  "animationend",
  function () {
    $(".header .group-top .logo a").hover(
      function () {
        $(this).addClass("on");
      },
      function () {
        $(this).removeClass("on");
      }
    );
  }
);

$(".header .group-top .btn-menu").click(function () {
  $(".header .group-mobile").toggleClass("on");
  $("body").toggleClass("hidden");
  $(".header .group-top .btn-menu").toggleClass("on");
  if ($("body").hasClass("hidden")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

$(".gnb .gnb-list .gnb-item .link-about").click(function (e) {
  e.preventDefault();
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: "#about" },
    ease: "power3.out",
  });
});

$(".gnb .gnb-list .gnb-item .link-contact").click(function (e) {
  e.preventDefault();
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: "#footer" },
    ease: "power3.out",
  });
});

$(".header .group-mobile .gnb-list .gnb-item .link-about").click(function (e) {
  e.preventDefault();
  $(".header .group-mobile").removeClass("on");
  $("body").removeClass("hidden");
  $(".header .group-top .btn-menu").removeClass("on");
  lenis.start();
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: "#about" },
    ease: "power3.out",
  });
});

$(".header .group-mobile .gnb-list .gnb-item .link-contact").click(function (
  e
) {
  e.preventDefault();
  $(".header .group-mobile").removeClass("on");
  $("body").removeClass("hidden");
  $(".header .group-top .btn-menu").removeClass("on");
  lenis.start();
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: "#footer" },
    ease: "power3.out",
  });
});

projectTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".group-project",
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0,
  },
  ease: "none",
});

projectTl
  .to(".sc-project .group-intro .sticky-intro", {
    bottom: "100%",
  })
  .to(".sc-project .group-project .sticky-project .p1", {
    bottom: "100%",
  })
  .to(".sc-project .group-project .sticky-project .p2", {
    bottom: "100%",
  })
  .to(".sc-project .group-project .sticky-project .p3", {
    bottom: "100%",
  })
  .to(".sc-project .group-project .sticky-project .p4", {
    bottom: "100%",
  })
  .to(".sc-project .group-project .sticky-project .p5", {
    bottom: "100%",
  });

$(".sc-project").mousemove(function (e) {
  const projectCursor = $('.project-cursor [data-target="cursor"]');
  gsap.to(projectCursor, {
    x: e.clientX + "px",
    y: e.clientY + "px",
    duration: 0.7,
    stagger: {
      each: 0.1,
    },
  });
});

$(".sc-project .group-project").mouseover(function () {
  $(".sc-project .project-cursor").addClass("on");
});

$(".sc-project .group-project").mouseleave(function () {
  $(".sc-project .project-cursor").removeClass("on");
});

gsap.set(".sc-about .group-title .title-area .line .word", { opacity: 0 });

$(window).resize(function () {
  sizeChk();
});

function sizeChk() {
  $(".sc-learn .group-bottom .learn-list .learn-item .name2").each(function () {
    const name2Width = $(this).width() + 40;
    const wrapOffset = $(this).parent(".name-wrap").offset().left;
    const boxOffset = $(this).siblings(".name-box").offset().left;
    const nameOffset = boxOffset - wrapOffset;
    const minusWidth = name2Width * -1;

    $(this)
      .siblings(".name-box")
      .css("--name2-width", name2Width + "px");
    $(this)
      .siblings(".name-box")
      .css("--name-offset", nameOffset + "px");
    $(this)
      .siblings(".name-box")
      .css("--minus-width", minusWidth + "px");
  });
  const headerHeight = $(".header .group-top").innerHeight();
  $(".header .group-mobile").css("--top", headerHeight + "px");

  ScrollTrigger.create({
    trigger: ".sc-about",
    start: "0% 50%",
    onEnter: function () {
      gsap.to(".sc-about .group-title .title-area .line .word", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        stagger: {
          each: 0.3,
        },
      });
      setTimeout(() => {
        gsap.to(".sphere", {
          duration: 7,
          ease: "none",
          repeat: -1,
          motionPath: {
            path: "#orbitPath",
            align: "#orbitPath",
            alignOrigin: [0.5, 0.5],
          },
        });
      }, 100);
    },
  });

  if ($(window).width() < 768) {
    ScrollTrigger.batch("[data-batch2]", {
      start: "0% 70%",
      end: "100% 70%",
      // markers:true,
      onEnter: function (batch) {
        $(batch).addClass("on");
      },
      onLeaveBack: function (batch) {
        $(batch).removeClass("on");
      },
    });
  } else {
    $("[data-batch2]").removeClass("on");
    $(".header .group-mobile").removeClass("on");
    $(".header .group-top .btn-menu").removeClass("on");
    $("body").removeClass("hidden");
    lenis.start();
  }
}

ScrollTrigger.batch("[data-batch]", {
  start: "0% 90%",
  onEnter: function (batch) {
    $(batch).addClass("on");
  },
});
