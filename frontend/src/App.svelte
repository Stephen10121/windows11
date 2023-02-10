<script lang="ts">
  import Background from "./lib/Background.svelte";
  import Taskbar from "./lib/Taskbar.svelte";
  import NotePad from "./lib/NotePad.svelte";
  import TestWindow from "./lib/TestWindow.svelte";
  let backgroundImage = "background-dark.jpg";
</script>

<main style="background-image: url({backgroundImage})">
  <Background />
  <NotePad />
  <!-- <TestWindow /> -->
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
