var tween = TweenLite.to($box, 2, {
   x: 100,
   delay: 2,
   ease: Power1.easeInOut, // HLxxx
   onComplete: myFunction,
   onCompleteParams: [element, 'param2']
});
