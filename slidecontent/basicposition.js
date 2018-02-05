tl.to(element, 1, {x:200})
  .to(element, 1, {y:200}, "+=1") //1 second after end of timeline (gap)
  .to(element, 1, {rotation:360}, "-=0.5") //0.5 seconds before end of timeline (overlap)
  .to(element, 1, {scale:4}, 6); //at exactly 6 seconds from the beginning of the timeline

//add a label named scene1 at an exact time of 2-seconds into the timeline
tl.add("scene1", 2)
  .to(element, 4, {x:200}, "scene1")  // add tween at scene1 label
  .to(element, 1, {opacity:0}, "scene1+=3"); // add tween 3 seconds after scene1 label
