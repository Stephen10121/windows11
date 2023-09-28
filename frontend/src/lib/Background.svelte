<script lang="ts">
  import DebugPanel from "./DebugPanel.svelte";
  import Icon from "./Icon.svelte";
  import RightClickMenu from "./RightClickMenu.svelte";
  import { mouseMove, type MouseInfo } from "./mouse";
  import { onDestroy } from "svelte";
  import {
    lightTheme,
    windowIcons,
    type IconType,
    type Menu,
  } from "../functions/store";

  // Debug Variables

  let folderSelected = false;

  // End Debug Variables
  let menu: Menu = { x: 0, y: 0, show: false };
  let mouseIsDown: MouseInfo = { x: 0, y: 0, down: false };
  let box: HTMLElement;
  let icons: IconType[] = [];
  let isLightTheme = false;

  const lightThemeUnsubscribe = lightTheme.subscribe(
    (data) => (isLightTheme = data)
  );
  const iconUnsubscribe = windowIcons.subscribe((data) => (icons = data));

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
      windowIcons.update(() => icons2);
    }
  }

  function mouseMoveFunction(e: MouseEvent) {
    let movedMouse = mouseMove(e, mouseIsDown, box, icons, folderSelected);

    windowIcons.update(() => movedMouse.icons);
    folderSelected = movedMouse.folderSelected;
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

  function iconClicked(iconId: string) {
    let icons2: IconType[] = [];
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === iconId) {
        icons2.push({ ...icons[i], focus: true });
      } else {
        icons2.push({ ...icons[i], focus: false });
      }
    }
    windowIcons.update(() => icons2);
    folderSelected = true;
  }

  onDestroy(() => {
    iconUnsubscribe();
    lightThemeUnsubscribe();
    document.body.removeEventListener("keyup", upKey);
  });
</script>

<div
  class="background"
  id="background"
  on:mousedown={mouseDown}
  on:mousemove={mouseMoveFunction}
  on:mouseup={mouseUpFunction}
  on:contextmenu|preventDefault={() => false}>
  <DebugPanel
    {icons}
    {isLightTheme}
    on:addIcon={({ detail }) => {
      let icons2 = icons;
      icons2.push({
        id: detail.imageId,
        click: false,
        focus: true,
        img: detail.imageVal,
        name: detail.folderName,
      });
      windowIcons.update(() => icons2);
      folderSelected = true;
    }}
    on:folderSelected={({ detail }) => {
      folderSelected = detail;
    }}
    on:lightTheme={({ detail }) => {
      lightTheme.update(() => detail);
      console.log();
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
      windowIcons.update(() => icons2);
      menu = { show: false, x: menu.x, y: menu.y };
    }}
  />
  {#each icons as icon}
    <Icon
      {icon}
      name={icon.name}
      imgLink={icon.img}
      clicked={icon.click}
      on:dblclick={() => {
        console.log("doubleClicked");
      }}
      on:click={() => {
        iconClicked(icon.id);
        buttonClick(icon.id);
      }}
    />
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
</style>
