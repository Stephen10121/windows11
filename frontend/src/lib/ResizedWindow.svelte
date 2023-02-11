<script lang="ts">
  import { onDestroy } from "svelte";
  import { focused, hitbox } from "../functions/store";

  export let id: string;
  let whatsFocused = "";
  let showHitbox = false;

  const hitboxUnsubscribe = hitbox.subscribe((value) => (showHitbox = value));
  const focusedUnsubscribe = focused.subscribe(
    (value) => (whatsFocused = value)
  );

  let window2: HTMLElement;

  let rightHalf: HTMLElement;
  let leftHalf: HTMLElement;

  let previousRightPosition = 0;
  let previousBottomPosition = 0;

  let leftHalfDown = false;
  let rightHalfDown = false;
  let topHalfDown = false;
  let bottomHalfDown = false;

  function resize(e: MouseEvent, who: string) {
    if (who === "right") {
      if (!rightHalfDown) return;
      window2.style.width =
        e.pageX - window2.getBoundingClientRect().left + "px";
    }

    if (who === "left") {
      if (!leftHalfDown) return;
      const windowDimentions = window2.getBoundingClientRect();
      const movewidth = previousRightPosition - e.pageX;

      window2.style.left = `${
        movewidth <= 470 ? windowDimentions.left : e.pageX
      }px`;

      window2.style.width = `${
        movewidth <= 470 ? windowDimentions.width : movewidth
      }px`;
    }

    if (who === "top") {
      if (!topHalfDown) return;
      const windowDimentions = window2.getBoundingClientRect();
      const moveheight = previousBottomPosition - e.pageY;

      window2.style.top = `${
        moveheight <= 300 ? windowDimentions.top : e.pageY
      }px`;

      window2.style.height = `${
        moveheight <= 300 ? windowDimentions.height : moveheight
      }px`;
    }

    if (who === "bottom") {
      if (!bottomHalfDown) return;
      window2.style.height =
        e.pageY - window2.getBoundingClientRect().top + "px";
    }
  }

  onDestroy(() => {
    hitboxUnsubscribe();
    focusedUnsubscribe();
  });
</script>

<div class="halfScreen" bind:this={leftHalf}><div /></div>
<div class="halfScreenright" bind:this={rightHalf}><div /></div>
<div
  on:mousedown={() => focused.update(() => id)}
  class="window {whatsFocused !== id ? 'notFocus' : ''}"
  style="z-index: {whatsFocused === id ? '8' : '6'};"
  bind:this={window2}
>
  <div
    class="resize-pointer-top {topHalfDown ? 'big' : ''}"
    id="top"
    style={showHitbox ? "background: #a955f752;" : ""}
    on:mousedown|preventDefault={() => {
      topHalfDown = true;
      previousBottomPosition = window2.getBoundingClientRect().bottom;
    }}
    on:mouseup|preventDefault={() => (topHalfDown = false)}
    on:mousemove={(e) => resize(e, "top")}
  />
  <div
    class="resize-pointer-top {bottomHalfDown ? 'big' : ''}"
    id="bottom"
    style={showHitbox ? "background: #a955f752;" : ""}
    on:mousedown|preventDefault={() => {
      bottomHalfDown = true;
      previousBottomPosition = window2.getBoundingClientRect().bottom;
    }}
    on:mouseup|preventDefault={() => (bottomHalfDown = false)}
    on:mousemove={(e) => resize(e, "bottom")}
  />
  <div
    class="resize-pointer {leftHalfDown ? 'big' : ''}"
    id="left"
    style={showHitbox ? "background: #a955f752;" : ""}
    on:mousedown|preventDefault={() => {
      leftHalfDown = true;
      previousRightPosition = window2.getBoundingClientRect().right;
    }}
    on:mouseup|preventDefault={() => (leftHalfDown = false)}
    on:mousemove={(e) => resize(e, "left")}
  />
  <div
    class="resize-pointer {rightHalfDown ? 'big' : ''}"
    id="right"
    style={showHitbox ? "background: #a955f752;" : ""}
    on:mousedown|preventDefault={() => {
      rightHalfDown = true;
      previousRightPosition = window2.getBoundingClientRect().right;
    }}
    on:mouseup|preventDefault={() => (rightHalfDown = false)}
    on:mousemove={(e) => resize(e, "right")}
  />
  <slot {window2} {leftHalf} {rightHalf} />
</div>

<style>
  .window {
    position: fixed;
    width: 680px;
    height: 800px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(43, 43, 43, 0.534);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    top: 50px;
    left: 90px;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 28px auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
    min-width: 470px;
    min-height: 300px;
  }

  .window.notFocus {
    background-color: rgb(26, 26, 26);
  }

  .window::-webkit-scrollbar {
    width: 0;
    height: 0;
    cursor: default !important;
  }

  .halfScreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: calc(100vh - 48px);
    padding: 10px;
    transition: width 0.15s linear;
  }

  .halfScreenright {
    position: fixed;
    right: 0;
    top: 0;
    width: 0;
    height: calc(100vh - 48px);
    padding: 10px;
    transition: width 0.15s linear;
  }

  .halfScreen div,
  .halfScreenright div {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(131, 131, 131, 0.781);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }
  .resize-pointer {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 50%;
    bottom: 50%;
    margin-top: auto;
    margin-bottom: auto;
    transition-property: transform;
    transition-duration: 0.25s;
  }

  .resize-pointer-top {
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    margin-top: auto;
    margin-bottom: auto;
    transition-property: transform;
    transition-duration: 0.25s;
  }

  #top {
    top: -10px;
    cursor: n-resize;
    z-index: 200;
  }

  #top.big {
    width: 200vw;
    height: 200vh;
    top: -100vh;
    left: -100vw;
  }

  #bottom {
    top: 100%;
    cursor: s-resize;
  }

  #bottom.big {
    width: 200vw;
    height: 200vh;
    top: -50%;
    left: -100vw;
  }

  #left {
    left: -10px;
    cursor: w-resize;
  }

  #left.big {
    width: 200vw;
    height: 200vh;
    top: -50%;
    left: -100vw;
  }

  #right {
    right: -10px;
    cursor: e-resize;
  }

  #right.big {
    width: 200vw;
    height: 200vh;
    top: -50%;
    right: -100vw;
  }
</style>
