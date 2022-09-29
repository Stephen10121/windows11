<script lang="ts">
  import Icon from "./Icon.svelte";

  type MouseInfo = {
    x: number;
    y: number;
    down: boolean;
  };
  let mouseIsDown: MouseInfo = { x: 0, y: 0, down: false };
  let box = null;

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
  }

  function mouseUp(_event) {
    box.style.width = `0px`;
    box.style.height = `0px`;
    box.style.display = "none";
    mouseIsDown.down = false;
  }

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
    }
  }
</script>

<div
  class="background"
  on:mousedown={mouseDown}
  on:mousemove={mouseMove}
  on:mouseup={mouseUp}
>
  <Icon name="Recycle Bin" imgLink="recycle.png" focus={false} />
  <Icon name="Recycle Bin" imgLink="recycle.png" focus={false} />
  <Icon name="Recycle Bin" imgLink="recycle.png" focus={true} />
  <div class="box" bind:this={box} />
</div>

<style>
  .background {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100%;
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
