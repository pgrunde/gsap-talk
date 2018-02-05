TweenMax.to(logo, 0.5, {rotation:10, transformOrigin:"50% 50%", ease: Power1.easeOut});
TweenMax.to(logo, 0.5, {delay: 0.5, rotation:-20, transformOrigin:"50% 50%", ease: Power1.easeOut});
TweenMax.to(logo, 1, {delay: 1, rotation:0, transformOrigin:"50% 50%", ease:Elastic.easeOut});
TweenMax.from(about, 1, {delay: 1, opacity: 0, left: "100px", ease: Elastic.easeOut});
