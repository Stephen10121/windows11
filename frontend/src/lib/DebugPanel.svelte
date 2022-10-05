<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="debugPanel" id="debugPanel">
  <h1>Debug</h1>
  <div class="checkbox">
    <p>Add folder</p>
    <input type="text" id="check" placeholder="Name " />
    <button>Add Folder</button>
  </div>
  <div class="checkbox">
    <label for="lightTheme">Light theme</label>
    <input
      type="checkbox"
      name="lightTheme"
      id="lightTheme"
      on:change={(e) => {
        //@ts-ignore
        dispatch("lightTheme", e.target.checked);
      }}
    />
  </div>
</div>

<style>
  .debugPanel {
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: fit-content;
    background-color: black;
    border: 1px solid white;
    padding: 10px;
    z-index: 100;
  }

  .debugPanel div {
    border-top: 1px solid white;
    padding: 10px 0;
  }
</style>
