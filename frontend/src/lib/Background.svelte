<script lang="ts">
  import DebugPanel from "./DebugPanel.svelte";
  import Icon from "./Icon.svelte";
  import RightClickMenu from "./RightClickMenu.svelte";
  import { mouseMove } from "./mouse";

  type MouseInfo = {
    x: number;
    y: number;
    down: boolean;
  };

  type Menu = {
    x: number;
    y: number;
    show: boolean;
  };

  type Icons = {
    id: string;
    name: string;
    img: string;
    focus: boolean;
    click: boolean;
  };

  // Debug Variables

  let folderSelected = false;

  // End Debug Variables
  let menu: Menu = { x: 0, y: 0, show: false };
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
    {
      id: "iconAboutMe",
      name: "aboutMe.txt",
      img: "txtfile.ico",
      focus: false,
      click: false,
    },
  ] as Icons[];

  function mouseDown(event: any) {
    if (event.target.id === "background" && event.which === 1) {
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
    if (event.which !== 3) {
      if (event.target.id === "background") {
        for (let i = 0; i < icons.length; i++) {
          icons[i].focus = false;
        }
        menu = {
          x: event.clientX,
          y: event.clientY,
          show: false,
        };
      }
      folderSelected = false;
    } else {
      menu = {
        x: event.clientX,
        y: event.clientY,
        show: true,
      };
    }
  }

  function buttonClick(id2: string) {
    console.log(id2);
    const index = icons.findIndex(({ id }) => id === id2);
    icons[index].click = true;
    setTimeout(() => {
      icons[index].click = false;
    }, 100);
  }

  function upKey(event: any) {
    if (event.key === "Delete") {
      let icons2 = [];
      for (let i = 0; i < icons.length; i++) {
        if (!icons[i].focus) {
          icons2.push(icons[i]);
        }
      }
      icons = icons2;
    }
  }

  function mouseMoveFunction(e) {
    let movedMouse = mouseMove({ event: e, mouseIsDown, box, icons });
    icons = movedMouse.icons;
    if (movedMouse.folderSelected) {
      folderSelected = true;
    }
  }

  function mouseUpFunction(_e: any) {
    box.style.width = `0px`;
    box.style.height = `0px`;
    box.style.display = "none";
    mouseIsDown.down = false;
  }

  // document.body.addEventListener("mousedown", mouseDown);
  // document.body.addEventListener("mousemove", mouseMoveFunction);
  // document.body.addEventListener("mouseup", mouseUpFunction);
  document.body.addEventListener("keyup", upKey);

  const disableselect = (_e: any) => {
    return false;
  };
</script>

<div
  class="background"
  id="background"
  on:mousedown={mouseDown}
  on:mousemove={mouseMoveFunction}
  on:mouseup={mouseUpFunction}
  on:contextmenu|preventDefault={() => {
    return false;
  }}
>
  <DebugPanel
    {icons}
    on:addIcon={({ detail }) => {
      let icons2 = icons;
      icons2.push({
        id: detail.imageId,
        click: false,
        focus: true,
        img: detail.imageVal,
        name: detail.folderName,
      });
      icons = icons2;
    }}
    on:folderSelected={({ detail }) => {
      folderSelected = detail;
    }}
    on:lightTheme={({ detail }) => {
      console.log(detail);
    }}
  />
  <RightClickMenu
    {folderSelected}
    {menu}
    on:trash={() => {
      let icons2 = [];
      for (let i = 0; i < icons.length; i++) {
        if (!icons[i].focus) {
          icons2.push(icons[i]);
        }
      }
      icons = icons2;
      menu = { show: false, x: menu.x, y: menu.y };
    }}
  />
  {#each icons as icon}
    <button
      on:selectstart={disableselect}
      on:mousedown={disableselect}
      class="icon {icon.focus ? 'focus' : ''} {icon.click ? 'clicked' : ''}"
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
    transition: background-color 0.15s linear, gap 0.05s linear;
    margin: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: none;
    border: none;
    outline: none;
  }

  .icon.clicked {
    gap: 2px;
  }

  .icon.focus {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    outline: 1px dashed gray;
  }

  .icon:hover,
  .icon:focus {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }
</style>
