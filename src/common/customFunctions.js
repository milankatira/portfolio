var opacity = 0;
var intervalID = 0;
function show(el) {
  opacity = Number(window.getComputedStyle(el).getPropertyValue("opacity"));
  if (opacity < 1) {
    opacity = opacity + 1;
    el.style.opacity = opacity;
  } else {
    clearInterval(intervalID);
  }
}

export const delay = (time, callback) => {
  setTimeout(function () {
    callback;
  }, time);
};

export const getSiblings = (e) => {
  let siblings = [];
  if (!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export const animateEl = (el, to) => {
  function draw() {
    el.style.left = to;
  }
  draw();
};