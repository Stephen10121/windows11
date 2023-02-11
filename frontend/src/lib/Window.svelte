<script lang="ts">
  import { onDestroy } from "svelte";
  import { hitbox } from "../functions/store";
  import ResizedWindow from "./ResizedWindow.svelte";

  export let name: string;
  export let icon: string;
  export let id: string;

  let mouseDown = false;
  let oldx: number;
  let oldy: number;
  let box: HTMLElement;

  let showHitbox = false;

  const hitboxUnsubscribe = hitbox.subscribe((value) => (showHitbox = value));

  function moveMouse(
    e: MouseEvent,
    window2: HTMLElement,
    rightHalf: HTMLElement,
    leftHalf: HTMLElement
  ) {
    box.style.top = "-500px";
    box.style.left = "-500px";
    box.style.width = "calc(100% + 1000px)";
    box.style.height = "calc(100% + 1000px)";
    window2.style.left = `${e.pageX - oldx}px`;
    window2.style.top = `${e.pageY - oldy}px`;

    if (e.pageX + 10 >= document.body.offsetWidth) {
      rightHalf.style.width = "50vw";
    } else {
      rightHalf.style.width = "0";
    }
    if (e.pageX === 0) {
      leftHalf.style.width = "50vw";
    } else {
      leftHalf.style.width = "0";
    }
  }

  onDestroy(() => {
    hitboxUnsubscribe();
  });
</script>

<ResizedWindow {id} let:leftHalf let:rightHalf let:window2>
  <div class="header">
    <div class="iconName">
      <div class="imgCover"><img src={icon} alt="Icon" /></div>
      <p>{name}</p>
      <div
        class="cover"
        style={showHitbox ? "background-color: #ff000059;" : ""}
        bind:this={box}
        on:mousedown={(event) => {
          //@ts-ignore
          oldx = event.layerX;
          //@ts-ignore
          oldy = event.layerY;
          mouseDown = true;
        }}
        on:mouseup={(e) => {
          mouseDown = false;
          box.style.top = "0";
          box.style.height = "100%";
          box.style.left = "0";
          box.style.width = "100%";
          if (e.pageX + 10 >= document.body.offsetWidth) {
            window2.style.width = "50vw";
            window2.style.height = "calc(100vh - 48px)";
            window2.style.top = "0px";
            window2.style.left = "50%";
            rightHalf.style.width = "0";
          } else if (e.pageX === 0) {
            window2.style.width = "50vw";
            window2.style.height = "calc(100vh - 48px)";
            window2.style.top = "0px";
            window2.style.left = "0";
            leftHalf.style.width = "0";
          }
        }}
        on:mousemove={(e) => {
          if (mouseDown) {
            moveMouse(e, window2, rightHalf, leftHalf);
          }
        }}
      />
    </div>
    <div class="closebuttons">
      <button class="minimize"><div class="dash" /></button>
      <button class="resize"><div class="box" /></button>
      <button class="close"><img src="x.svg" alt="Close" /></button>
    </div>
  </div>
  <div class="rest">
    <slot />
  </div>
</ResizedWindow>

<style>
  .header {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 135px;
  }

  .rest {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
  }

  .iconName {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 15px;
    padding-left: 15px;
    position: relative;
  }

  .iconName .cover {
    background: none;
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .imgCover {
    height: 16px;
  }

  .imgCover img {
    height: 100%;
  }

  .iconName p {
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 100;
    word-spacing: 3px;
    letter-spacing: 1px;
  }

  .resize,
  .minimize {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .resize:hover,
  .minimize:hover {
    background-color: rgba(71, 71, 71, 0.356);
  }

  .minimize .dash {
    width: 11px;
    height: 1px;
    background-color: white;
  }

  .resize .box {
    width: 10px;
    height: 10px;
    border: 1px solid white;
    border-radius: 2px;
  }

  .closebuttons {
    display: grid;
    grid-template-columns: 45px 45px 45px;
    height: 28px;
    border-top-right-radius: 5px;
    overflow: hidden;
  }

  .closebuttons button {
    border: none;
    background: none;
    width: 100%;
    height: 28px;
  }

  .close {
    padding: 2px 10px;
  }

  .close:hover {
    background-color: rgb(206, 14, 14);
  }

  .close img {
    width: 100%;
    filter: invert(1);
  }
</style>
