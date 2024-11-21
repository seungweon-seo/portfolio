const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

$(window).on('load', function() {
    $('body').addClass('loaded');
});

$('.header .group-top .logo a .name-wrap .name2').on('animationend', function() {
    $('.header .group-top .logo a').hover(
    function(){
        $(this).addClass('on');
    },
    function(){
        $(this).removeClass('on');
    }
    )
});

$('.header .group-top .btn-menu').click(function(){
    $('.header .group-mobile').toggleClass('on');
    $('.header.style2 .group-top').toggleClass('on');
    $('body').toggleClass('hidden');
    $('.header .group-top .btn-menu').toggleClass('on');
    if ($('body').hasClass('hidden')) {
        lenis.stop();
    } else {
        lenis.start();
    }
})

$(window).resize(function(){
    sizeChk2();
})
sizeChk2();

function sizeChk2(){
    if ($(window).width()>768) {
        $('.header .group-mobile').removeClass('on');
        $('.header .group-top .btn-menu').removeClass('on');
        $('body').removeClass('hidden');
        lenis.start();
    }
}


const paginationSlide = new Swiper(".pagination-slide", {
    direction: "vertical",
    mousewheel: true,
    loop: true,
    loopedSlides:7,
    slidesPerView: 5,
    spaceBetween: 12,
    centeredSlides: true,
});


const projectSlide = new Swiper(".project-slide", {
    direction: "vertical",
    spaceBetween:24,
    centeredSlides: true,
    mousewheel: {
        releaseOnEdges:'true',
        eventsTarget:'.sc-project2'
    },
    loop: true,
    loopedSlides:7,
    slidesPerView:"auto",
    freeMode: {
        enabled: true,
        sticky: true,
    },
});

projectSlide.on('slideChange',function(){
    const activeSlideIndex = this.realIndex;
    const titleElement = document.querySelector('.title');
    titleElement.classList.add('hidden');

    setTimeout(() => {
        titleElement.innerText = getProjectTitle(activeSlideIndex);
        titleElement.classList.remove('hidden');
    }, 320);
})

function getProjectTitle(slideIndex) {
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


$('.sc-project2 .project-slide .swiper-slide').mousemove(function(e){
    const projectCursor = $('.project-cursor [data-target="cursor"]');
        gsap.to(projectCursor,{
            x: e.clientX + "px",
            y: e.clientY + "px",
            duration:.7,
            stagger:{
                each: .1
            }
        })
})

gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap',{opacity:0})
gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap .desc-box .desc',{opacity:0})
gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap .desc-box .desc .line',{width:0})

$(window).resize(function(){
    sizeChk();
})
sizeChk();

function sizeChk(){
    const headerHeight = $('.header .group-top').innerHeight();
    $('.header .group-mobile').css('--top', headerHeight + 'px');
    
    if ($(window).width()<768) {
        $('.sc-project2 .project-slide .swiper-slide .content').off('mouseover mouseleave');
        
    } else {
        $('.sc-project2 .project-slide .swiper-slide .content').off('mouseover mouseleave');
        
        $('.sc-project2 .project-slide .swiper-slide .content').mouseover(function(){

            if ($(this).find('video').length > 0) {
                const video = $(this).find('video').get(0).play();
                if (video !== undefined) {
                    video.then(_ => {
                        video.pause();
                    })
                    .catch(error => {
                    });
                }
            }
            $('.sc-project2 .project-cursor').addClass('on');
            $(this).find('.img').addClass('on');
        
            descTl = gsap.timeline();
            descTl
            .to($(this).find('.desc-wrap'),{
                opacity:1,
                duration:1,
            },'a')
            .to($(this).find('.desc'),{
                opacity:1,
                duration:1,
                stagger:{
                    each: 0.2
                }
            },'a+=.5')
            .to($(this).find('.desc-box').find('.line'),{
                width:'100%',
                duration:1,
                stagger:{
                    each:.7
                },
                ease:"power1.out"
            },'a+=1')
        })
        
        $('.sc-project2 .project-slide .swiper-slide .content').mouseleave(function(){
            $('.sc-project2 .project-cursor').removeClass('on');
            $(this).find('.img').removeClass('on');
        
            gsap.to($(this).find('.desc-wrap'),{
                opacity:0,
                duration:1,
            })
            
            if ($(this).find('video').length > 0) {
                $(this).find('video').get(0).pause();
                $(this).find('video').get(0).currentTime = 0;
            }
            
        })
    }
}





