<script lang="ts">
  import Background from "./lib/Background.svelte";
  import Taskbar from "./lib/Taskbar.svelte";
  import NotePad from "./lib/NotePad.svelte";
  import TestWindow from "./lib/TestWindow.svelte";
  import { windows, type WindowBox } from "./functions/store";
  import { onDestroy } from "svelte";
  let backgroundImage = "background-dark.jpg";

  let windows2: WindowBox[] = [];
  const windowsUnsubscribe = windows.subscribe((value) => (value = windows2));

  $: {
    console.log(windows2);
  }

  onDestroy(() => {
    windowsUnsubscribe();
  });
</script>

<main style="background-image: url({backgroundImage})">
  <Background />
  <!-- <NotePad /> -->
  {#each windows2 as window}
    <TestWindow id={window.id} name={window.name} icon={window.icon} />
  {/each}
  <Taskbar />
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    grid-template-rows: auto 48px;
  }
</style>
