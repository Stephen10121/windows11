<script lang="ts">
  import Icon from "./Icon.svelte";

  type MouseInfo = {
    x: number;
    y: number;
    down: boolean;
  };
  let mouseIsDown: MouseInfo = { x: 0, y: 0, down: false };
  let box = null;
  let icons = [
    { id: "icon1", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon2", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon3", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon11", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon12", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon13", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon21", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon22", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon23", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon31", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon32", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon33", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon41", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon42", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon43", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon51", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon52", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon53", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon63", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon61", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon62", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon73", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon71", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon72", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon83", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon81", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon82", name: "Recycle Bin", img: "recycle.png", focus: false },
    { id: "icon93", name: "Recycle Bin", img: "recycle.png", focus: false },
  ];

  function mouseDown(event: any) {
    box.style.width = `0px`;
    box.style.height = `0px`;
    box.style.display = "block";
    mouseIsDown = {
      x: event.clientX,
      y: event.clientY,
      down: true,
    };
    box.style.top = `${mouseIsDown.y}px`;
    box.style.left = `${mouseIsDown.x}px`;
    for (let i = 0; i < icons.length; i++) {
      icons[i].focus = false;
    }
  }

  function mouseUp(_event) {
    box.style.width = `0px`;
    box.style.height = `0px`;
    box.style.display = "none";
    mouseIsDown.down = false;
  }

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

  function mouseMove(event: any) {
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
        console.log(overlap);
        if (overlap) {
          icons[i].focus = true;
        } else {
          icons[i].focus = false;
        }
      }
    }
  }

  document.body.addEventListener("mousedown", mouseDown);
  document.body.addEventListener("mousemove", mouseMove);
  document.body.addEventListener("mouseup", mouseUp);
</script>

<div class="background">
  {#each icons as icon}
    <div class="icon {icon.focus ? 'focus' : ''}" id={icon.id}>
      <Icon name={icon.name} imgLink={icon.img} />
    </div>
  {/each}
  <div class="box" bind:this={box} />
</div>

<style>
  .background {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100%;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fill, 74px);
    grid-template-rows: repeat(auto-fill, 84px);
    grid-auto-flow: column;
  }
  .box {
    position: absolute;
    width: 0;
    height: 0;
    background-color: rgba(40, 82, 160, 0.658);
    border: 2px solid rgb(40, 82, 160);
    display: none;
  }

  .icon {
    width: 74px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 2px;
    transition: background-color 0.15s linear;
    margin: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .icon.focus {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    outline: 1px dashed gray;
  }

  .icon:hover {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }
</style>
