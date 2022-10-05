<script lang="ts">
  export let imgLink: string;
  export let name: string;
  export let clicked: boolean;

  const disableselect = (_e: any) => {
    return false;
  };
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<div
  class="imgCover {clicked ? 'clicked' : ''}"
  on:selectstart={disableselect}
  on:mousedown={disableselect}
>
  <img
    src={imgLink}
    alt="Icon Image"
    on:selectstart={disableselect}
    on:mousedown={disableselect}
  />
</div>
<p on:selectstart={disableselect} on:mousedown={disableselect}>{name}</p>

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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  p {
    font-size: 1.05rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
    width: 100%;
    cursor: default;
    color: var(--file-icon-color);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
