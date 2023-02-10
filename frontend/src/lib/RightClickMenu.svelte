<script lang="ts">
  import type { Menu } from "src/functions/store";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let folderSelected: boolean;
  export let menu: Menu;
</script>

<div
  class="menu {menu.show ? 'show' : ''}"
  style="top: {menu.y}px;left:{menu.x}px"
>
  <button>
    <div class="imgCover"><img src="terminal.png" alt="Terminal Icon" /></div>
    <p>Open in Terminal</p>
  </button>
  <button
    class={folderSelected ? "" : "unable"}
    on:click={() => {
      dispatch("trash", true);
    }}
  >
    <div class="imgCover filter"><img src="trash.svg" alt="Trash" /></div>
    <p>Delete Shortcut/s</p>
  </button>
</div>

<style>
  .menu {
    position: fixed;
    width: 200px;
    height: fit-content;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(51, 51, 51, 0.418);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 5;
    padding: 3px;
    display: none;
    gap: 3px;
    flex-direction: column;
  }

  .menu.show {
    display: flex;
  }

  button {
    width: 100%;
    height: 35px;
    background: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    padding: 2px 5px;
    transition: background-color 0.25s linear;
  }

  button.unable {
    background: rgba(0, 0, 0, 0.219);
    cursor: default;
  }

  button:hover:not(.unable) {
    background-color: rgba(255, 255, 255, 0.096);
  }

  .imgCover {
    height: 22px;
  }

  .imgCover img {
    height: 100%;
  }

  .filter {
    filter: invert(1);
  }

  button p {
    font-family: var(--main-font);
    color: var(--file-icon-color);
  }
</style>
