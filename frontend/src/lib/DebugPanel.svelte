<script lang="ts">
  import { hitbox, windows } from "../functions/store";
  import { createEventDispatcher, onDestroy } from "svelte";
  const dispatch = createEventDispatcher();
  type Icons = {
    id: string;
    name: string;
    img: string;
    focus: boolean;
    click: boolean;
  };
  export let icons: Icons[];
  export let isLightTheme: boolean;

  let windowName: string;
  let windowIcon: string;
  let windowId: string;

  let showHitbox = false;
  const hitboxUnsubscribe = hitbox.subscribe((value) => (value = showHitbox));

  let imageVal: string;
  let folderName: string;
  let imageId: string;
  let imageIdError = "";
  let showDebug = false;

  function checkUnique() {
    let notUnique = false;
    for (let i = 0; i < icons.length; i++) {
      if (imageId === icons[i].id) {
        notUnique = true;
      }
    }
    imageIdError = notUnique ? "Id taken" : "";
  }

  function toggleDebug(event: KeyboardEvent) {
    if (!(event.key === "i" && event.ctrlKey)) return;
    showDebug = !showDebug;
  }

  onDestroy(() => {
    hitboxUnsubscribe();
  });
</script>

<svelte:body on:keydown={toggleDebug} />

<div class="debugPanel {showDebug ? '' : 'hide'}" id="debugPanel">
  <h1>Debug</h1>
  <div class="checkbox">
    <p>Add shortcut</p>
    <p style="color:red;font-size:1.25rem">{imageIdError}</p>
    <input
      type="text"
      placeholder="Shortcut Id."
      bind:value={imageId}
      on:keyup={checkUnique}
    />
    <input type="text" id="check" placeholder="Name " bind:value={folderName} />
    <label for="image">Select Image</label>
    <select id="image" name="image" bind:value={imageVal}>
      <option value="terminal.png">Terminal</option>
      <option value="recycle.png">Trash Can</option>
      <option value="txtfile.ico">Text file</option>
      <option value="folder.png">Folder</option>
    </select>
    <button
      on:click={() => {
        checkUnique();
        if (imageIdError === "") {
          dispatch("addIcon", { imageVal, folderName, imageId });
        }
      }}>Add Folder</button
    >
  </div>
  <div class="checkbox">
    <label for="lightTheme">Light theme</label>
    <input
      checked={isLightTheme}
      type="checkbox"
      name="lightTheme"
      id="lightTheme"
      on:change={(e) => {
        //@ts-ignore
        dispatch("lightTheme", e.target.checked);
      }}
    />
  </div>
  <div class="checkbox">
    <label for="showHitbox">Show Hitboxes</label>
    <input
      checked={showHitbox}
      type="checkbox"
      name="showHitbox"
      id="showHitbox"
      on:change={(e) => {
        //@ts-ignore
        hitbox.update(() => e.target.checked);
      }}
    />
  </div>
  <div class="checkbox">
    <p>Open Window</p>
    <p style="color:red;font-size:1.25rem">{imageIdError}</p>
    <input
      type="text"
      placeholder="Window Title"
      bind:value={windowName}
      on:keyup={checkUnique}
    />
    <input
      type="text"
      id="check"
      placeholder="Window Id "
      bind:value={windowId}
    />
    <label for="image">Select Image</label>
    <select id="image" name="image" bind:value={windowIcon}>
      <option value="terminal.png">Terminal</option>
      <option value="recycle.png">Trash Can</option>
      <option value="txtfile.ico">Text file</option>
      <option value="folder.png">Folder</option>
    </select>
    <button
      on:click={() => {
        windows.set([{ icon: windowIcon, id: windowId, name: windowName }]);
        console.log("adding window", {
          icon: windowIcon,
          id: windowId,
          name: windowName,
        });
      }}>Add Window</button
    >
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

  .debugPanel.hide {
    display: none;
  }

  .debugPanel div {
    border-top: 1px solid white;
    padding: 10px 0;
  }
</style>
