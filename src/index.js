// import TweenMax from 'gsap';
// import $ from 'jquery';
require('gsap')
var $ = require('jquery')

window.onbeforeunload = function () {
    // window.scrollTo(0, 0);
}

// beginAnimation starts the opening sequence at the top of the page
function beginAnimation() {
  var tao = $("#tao");
  var about = $(".about");
  var scrollPrompt = $(".scrollprompt");
  about.css("visibility", "visible");

  TweenMax.to(tao, 0.5, {rotation:10, transformOrigin:"50% 50%", ease: Power1.easeOut});
  TweenMax.to(tao, 0.5, {delay: 0.5, rotation:-20, transformOrigin:"50% 50%", ease: Power1.easeOut});
  TweenMax.to(tao, 1, {delay: 1, rotation:0, transformOrigin:"50% 50%", ease:Elastic.easeOut});

  TweenMax.from(about, 1, {delay: 1, opacity: 0, left: "100px", ease: Elastic.easeOut});

  var tl_scrollPrompt = new TimelineMax({delay:3, repeat:-1})
  tl_scrollPrompt
    .to(scrollPrompt, 0.75, {scaleX:3, scaleY:3, top:"20px", opacity: 1})
    .to(scrollPrompt, 0.75, {scaleX:1, scaleY:1, top:"20px", opacity: 0})
    .to(scrollPrompt, 1, {top:"-20px"})
}

// setJustAfter places the box contents just outside of view, no matter the viewport size
function setJustAfter() {
  var windowHeight = $(window).height()
  var promptBottom = document.getElementById("scrollpromptcontainer").
		getBoundingClientRect().bottom
	$("#justafter").css('top', windowHeight - promptBottom);
	$("#justafter").css('opacity', 1);
}

// mouseMoved calls all functions which depend on knowing the mouse location on the document
function mouseMoved() {
	var mouseDidMove = (document.lastPointerX != document.pointerX || document.lastPointerY != document.pointerY);
	// somehow the mouse could be in a new place
	if (mouseDidMove || document.userScrolling) {
    // mouse reacting content changes
		handleBoxes(document.pointerX, document.pointerY)

    // reset movement indicators
		document.userScrolling = false;
		document.lastPointerX = document.pointerX;
		document.lastPointerY = document.pointerY;
	}
}

// handleBoxes moves 
function handleBoxes(mouseX, mouseY) {
  for (var i=1;i<6;i++){
    var boxLeft = document.getElementById("boxleft"+i);
    var boxRight = document.getElementById("boxright"+i);

    // We cannot rely on just the bounding client rect of the element; it is relative to the client view
    // We need it relative to the whole document, which is what our mouseY and mouseX values keep
    // As-is this implementation will not use the correct coordinates!
    // var boxLeftCoords = boxLeft.getBoundingClientRect()
    // var boxRightCoords = boxRight.getBoundingClientRect()

    // We need document positioning!
    // getCoords appends doctop and docleft to the bounding client rect
    var boxLeftCoords = getCoords(boxLeft)
    var boxRightCoords = getCoords(boxRight)

    if (boxRightCoords.doctop < mouseY && boxRightCoords.doctop+boxRightCoords.height > mouseY) {
      var boxWidth = 200;
      TweenMax.to(boxLeft, 5, {width: mouseX - boxWidth, ease: Elastic.easeOut.config(1, 0.3)});
      TweenMax.to(boxRight, 5, {width: document.documentElement.clientWidth - mouseX - boxWidth, ease: Elastic.easeOut.config(1, 0.3)});

      // animate text-shadow
      var h2 = boxLeft.parentElement.children[1];
      var colorPick = {1: "#000000", 2:"#ff0000", 3:"#fff695" , 4:"#ff95a8" , 5:"#95baff"};
      TweenMax.to(h2, 5, {textShadow: "1rem 1rem " + colorPick[i]});
    }
  }
}

function balls(tl_bigball) {
  var ballsCoords = getCoords(document.getElementById("balls"));
  // If I can see 200 pixels of the div
  if (ballsCoords.doctop <  window.pageYOffset + $(window).height() - 500 && !tl_bigball.isActive()) {
    tl_bigball.resume()
  }
}

function buildBall() {
  var tl_bigball = new TimelineMax({paused: true, repeat: -1})
  tl_bigball
    .to("#bigball", 1.25, {scaleX: 0.75, scaleY: 0.75, ease: Sine.easeIn})
    .to("#bigball", 1.25, {left: "20rem", fill: "#eb69a1", ease: Sine.easeOut}, "-=1.25")
    .to("#bigball", 1.25, {bottom: "3rem", ease: Sine.easeIn}, "-=1.25")
    .to("#balls", 1.25, {backgroundColor: "#ffa4ca", ease: Sine.easeInOut}, "-=1.25") // moved right

    .to("#bigball", 1.25, {scaleX: 0.35, scaleY: 0.35, ease: Sine.easeOut})
    .to("#bigball", 1.25, {left: "0rem", fill: "#85c0ed", ease: Sine.easeIn}, "-=1.25")
    .to("#bigball", 1.25, {bottom: "9rem", fill: "#85c0ed", ease: Sine.easeOut}, "-=1.25")
    .to("#balls", 1.25, {backgroundColor: "#c1e2ff", ease: Sine.easeInOut}, "-=1.25") // moved back

    .to("#bigball", 1.25, {scaleX: 0.75, scaleY: 0.75, ease: Sine.easeIn})
    .to("#bigball", 1.25, {left: "-20rem", fill: "#cff056", ease: Sine.easeOut}, "-=1.25")
    .to("#bigball", 1.25, {bottom: "3rem", fill: "#cff056", ease: Sine.easeIn}, "-=1.25")
    .to("#balls", 1.25, {backgroundColor: "#e4ff8d", ease: Sine.easeInOut}, "-=1.25") // moved left

    .to("#bigball", 1.25, {scaleX: 1, scaleY: 1, ease: Sine.easeOut})
    .to("#bigball", 1.25, {left: "0rem", fill: "#f0d078", ease: Sine.easeIn}, "-=1.25")
    .to("#bigball", 1.25, {bottom: "0rem", fill: "#f0d078", ease: Sine.easeOut}, "-=1.25")
    .to("#balls", 1.25, {backgroundColor: "#ffebb4", ease: Sine.easeInOut}, "-=1.25") // returned
  return tl_bigball
}

$(document).ready(function() {
  'use strict'

  // setup
  TweenMax.selector = $;
	document.pointerX = document.documentElement.clientWidth / 2;
	document.pointerY = document.documentElement.clientHeight / 2;
	document.lastPointerX = document.pointerX;
	document.lastPointerY = document.pointerY;
	document.userScrolling = false;
  document.onmousemove = handleMouseMove;
	window.onscroll = function() { document.userScrolling = true; };

  setJustAfter();
  setInterval(mouseMoved, 120)

  var tl_bigball = buildBall();
  $("#bigball").on("click", function() {
    TweenMax.to("#boat", 2, {autoAlpha: 1, ease: Sine.easeIn});
  });
  setInterval(balls.bind(this, tl_bigball), 500)

  // start
  setTimeout(beginAnimation, 500);
});

// http://javascript.info/coordinates
// get document coordinates of an element
function getCoords(elem) {
  var box = elem.getBoundingClientRect();
	var docCords = {
    doctop: box.top + pageYOffset,
    docleft: box.left + pageXOffset,
	}
	return $.extend(docCords, box)
}

// https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
function handleMouseMove(event) {
  var dot, eventDoc, doc, body, pageX, pageY;

  event = event || window.event; // IE-ism

	// If pageX/Y aren't available and clientX/Y are,
	// calculate pageX/Y - logic taken from jQuery.
	// (This is to support old IE)
	if (event.pageX == null && event.clientX != null) {
			eventDoc = (event.target && event.target.ownerDocument) || document;
			doc = eventDoc.documentElement;
			body = eventDoc.body;

			event.pageX = event.clientX +
				(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY +
				(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
				(doc && doc.clientTop  || body && body.clientTop  || 0 );
	}
	document.pointerX = event.pageX;
	document.pointerY = event.pageY;
}

