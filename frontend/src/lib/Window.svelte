<script lang="ts">
  export let name: string;
  export let icon: string;
  let mouseDown = false;
  let window2;
  let oldx;
  let oldy;
  let box;
  let rightHalf;
  let leftHalf;

  function moveMouse(e: any) {
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
</script>

<div class="halfScreen" bind:this={leftHalf}><div /></div>
<div class="halfScreenright" bind:this={rightHalf}><div /></div>
<div class="window" bind:this={window2}>
  <div class="header">
    <div class="iconName">
      <div class="imgCover"><img src={icon} alt="Icon" /></div>
      <p>{name}</p>
      <div
        class="cover"
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
            moveMouse(e);
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
  <slot />
</div>

<style>
  .window {
    position: fixed;
    z-index: 6;
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
  }

  .header {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 135px;
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
    font-size: 1.15rem;
    color: white;
    font-weight: 100;
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
</style>
