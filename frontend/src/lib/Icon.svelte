<script lang="ts">
  export let imgLink: string;
  export let name: string;
  export let focus: boolean;
</script>

<div class="icon {focus ? 'focus' : ''}">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <div class="imgCover">
    <img src={imgLink} alt="Icon Image" />
  </div>
  <p>{name}</p>
</div>

<style>
  .icon {
    width: 74px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 2px;
    transition: background-color 0.15s linear;
    margin: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .focus {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }

  .icon:hover {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(116, 116, 116, 0.445);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  }

  .imgCover {
    width: 100%;
  }

  .imgCover img {
    width: 100%;
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
