var detectOverlap = (function () {
  function getPositions(elem) {
    var pos = elem.getBoundingClientRect();
    return [
      [pos.left, pos.right],
      [pos.top, pos.bottom],
    ];
  }

  function comparePositions(p1, p2) {
    var r1, r2;
    if (p1[0] < p2[0]) {
      r1 = p1;
      r2 = p2;
    } else {
      r1 = p2;
      r2 = p1;
    }
    return r1[1] > r2[0] || r1[0] === r2[0];
  }

  return function (a, b) {
    var pos1 = getPositions(a),
      pos2 = getPositions(b);
    return (
      comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1])
    );
  };
})();


export function mouseMove({event, mouseIsDown, box, icons}) {
  let folderSelected = false;
    if (mouseIsDown.down) {
      if (event.clientX < mouseIsDown.x) {
        box.style.left = `${event.clientX}px`;
        box.style.width = `${mouseIsDown.x - event.clientX}px`;
      } else {
        box.style.left = `${mouseIsDown.x}px`;
        box.style.width = `${event.clientX - mouseIsDown.x}px`;
      }
      if (event.clientY < mouseIsDown.y) {
        box.style.top = `${event.clientY}px`;
        box.style.height = `${mouseIsDown.y - event.clientY}px`;
      } else {
        box.style.top = `${mouseIsDown.y}px`;
        box.style.height = `${event.clientY - mouseIsDown.y}px`;
      }
      for (let i = 0; i < icons.length; i++) {
        let overlap = detectOverlap(box, document.getElementById(icons[i].id));
        if (overlap) {
          icons[i].focus = true;
          folderSelected = true;
        } else {
          icons[i].focus = false;
        }
      }
    }
    return {icons, folderSelected};
  }