<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="debugPanel" id="debugPanel">
  <h1>Debug</h1>
  <div class="checkbox">
    <label for="check">Folder selected</label>
    <input
      type="checkbox"
      name="check"
      id="check"
      on:change={(e) => {
        //@ts-ignore
        dispatch("folderSelected", e.target.checked);
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
  }
</style>
