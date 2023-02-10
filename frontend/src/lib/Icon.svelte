<script lang="ts">
  import type { IconType } from "src/functions/store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let icon: IconType;
  export let imgLink: string;
  export let name: string;
  export let clicked: boolean;
</script>

<button
  on:click={() => dispatch("click")}
  on:dblclick={() => dispatch("dblclick")}
  class="icon {icon.focus ? 'focus' : ''} {icon.click ? 'clicked' : ''}"
  id={icon.id}
>
  <div class="imgCover {clicked ? 'clicked' : ''}">
    <img src={imgLink} alt={`Icon Image for ${name}`} />
  </div>
  <p>{name}</p>
</button>

<style>
  .imgCover {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: padding 0.05s linear;
  }

  .imgCover.clicked {
    padding: 5px;
  }

  .imgCover img {
    width: 80%;
  }

  p {
    font-size: 1.05rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
    width: 100%;
    cursor: default;
    color: var(--file-icon-color);
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
