var tl_scrollPrompt = new TimelineMax({delay:1, repeat:-1})
tl_scrollPrompt
  .to(scrollPrompt, 0.75, {scaleX:3, scaleY:3, top:"20px", opacity: 1})
  .to(scrollPrompt, 0.75, {scaleX:1, scaleY:1, top:"20px", opacity: 0})
  .to(scrollPrompt, 1, {top:"-20px"})
