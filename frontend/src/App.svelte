<script lang="ts">
  import Background from "./lib/Background.svelte";
  import Taskbar from "./lib/Taskbar.svelte";
  import io from "socket.io-client";
  let backgroundImage = "background-dark.jpg";
  const disableselect = (_e: any) => {
    return false;
  };
  document.onselectstart = disableselect;
  document.onmousedown = disableselect;
  const socket = io();
  console.log(socket);
  socket.emit("test", "yesy");

  socket.on("test", (data) => {
    console.log(data);
  });
</script>

<main style="background-image: url({backgroundImage})">
  <Background />
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
