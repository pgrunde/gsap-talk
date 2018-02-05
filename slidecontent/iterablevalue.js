TweenMax.to(".box", 1, {
  x: function(index, target) {
    console.log(index, target);
    return (index + 1) * 100 // 100, 200, 300
  }
});
