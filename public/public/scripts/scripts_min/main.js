function animationHover(e,a){e=$(e),e.hover(function(){e.addClass("animated "+a)},function(){window.setTimeout(function(){e.removeClass("animated "+a)},2e3)})}function animationClick(e,a){e=$(e),e.click(function(){e.addClass("animated "+a),window.setTimeout(function(){e.removeClass("animated "+a)},2e3)})}function openNav(){document.getElementById("myNav").style.width="100%"}function closeNav(){document.getElementById("myNav").style.width="0%"}function onRepeat(){t0.invalidate().restart()}function randomScale(e){return"x"===e?1.4:1.5}$(document).ready(function(){$(".owl-carousel").owlCarousel({animateOut:"slideOutDown fadeOut",animateIn:"fadeIn",items:1,merge:!0,loop:!0,margin:10,video:!0,lazyLoad:!0,center:!0,stagePadding:0,dots:true,nav:true,smartSpeed:0,pagination:!0,autoplay:!0,autoplaySpeed:60,autoplayHoverPause:!0})}),$(document).ready(function(){$.timeliner({})}),$("a[href='#top']").click(function(){return $("html, body").animate({scrollTop:0},"slow"),!1}),$(function(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html, body").animate({scrollTop:e.offset().top},1e3),!1}})});var t0=new TimelineMax({onComplete:onRepeat});t0.to(".svg_rotate",.1,{rotation:"+=1",transformOrigin:"0 0",scale:50}),$(".equalizer").click(function(){$("span").hasClass("bar-1")?$(".equalizer span").removeClass("bar-1 bar-2 bar-3 bar-4").addClass("equalizer-nopop"):($(".equalizer span:nth-of-type(1)").addClass("bar-1").removeClass("equalizer-nopop"),$(".equalizer span:nth-of-type(2)").addClass("bar-2").removeClass("equalizer-nopop"),$(".equalizer span:nth-of-type(3)").addClass("bar-3").removeClass("equalizer-nopop"),$(".equalizer span:nth-of-type(4)").addClass("bar-4").removeClass("equalizer-nopop"))});