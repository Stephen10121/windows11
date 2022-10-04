<script lang="ts">
  import DebugPanel from "./DebugPanel.svelte";
  import Icon from "./Icon.svelte";
  import RightClickMenu from "./RightClickMenu.svelte";

  type MouseInfo = {
    x: number;
    y: number;
    down: boolean;
  };

  // Debug Variables

  let folderSelected = false;

  // End Debug Variables

  let mouseIsDown: MouseInfo = { x: 0, y: 0, down: false };
  let box = null;
  let icons = [
    {
      id: "iconRecycle",
      name: "Recycle Bin",
      img: "recycle.png",
      focus: false,
      click: false,
    },
    {
      id: "iconFolder",
      name: "File Explorer",
      img: "folder.png",
      focus: false,
      click: false,
    },
    {
      id: "iconFolder1",
      name: "File Explorer",
      img: "folder.png",
      focus: false,
      click: false,
    },
  ];

  function mouseDown(event: any) {
    if (event.target.id === "background") {
      box.style.width = `0px`;
      box.style.height = `0px`;
      mouseIsDown = {
        x: event.clientX,
        y: event.clientY,
        down: true,
      };
      box.style.top = `${mouseIsDown.y}px`;
      box.style.left = `${mouseIsDown.x}px`;
      box.style.display = "block";
    }

    for (let i = 0; i < icons.length; i++) {
      icons[i].focus = false;
    }
  }

  function mouseUp(_event: any) {
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
        if (overlap) {
          icons[i].focus = true;
        } else {
          icons[i].focus = false;
        }
      }
    }
  }

  function buttonClick(id2: string) {
    const index = icons.findIndex(({ id }) => id === id2);
    icons[index].click = true;
    setTimeout(() => {
      icons[index].click = false;
    }, 100);
  }

  document.body.addEventListener("mousedown", mouseDown);
  document.body.addEventListener("mousemove", mouseMove);
  document.body.addEventListener("mouseup", mouseUp);
</script>

<div class="background" id="background">
  <DebugPanel
    on:folderSelected={({ detail }) => {
      folderSelected = detail;
    }}
  />
  <RightClickMenu {folderSelected} />
  {#each icons as icon}
    <button
      class="icon {icon.focus ? 'focus' : ''} {icon.click
        ? 'clickAnimation'
        : ''}"
      id={icon.id}
      on:click={() => {
        buttonClick(icon.id);
      }}
    >
      <Icon name={icon.name} imgLink={icon.img} clicked={icon.click} />
    </button>
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
    border-radius: 2px;
    padding: 10px;
    gap: 5px;
    transition: background-color 0.15s linear;
    margin: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: none;
    border: none;
  }

  .icon.focus {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    outline: 1px dashed gray;
  }

  .icon.clickAnimation {
    padding: 10px;
  }

  .icon:hover {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }
</style>
