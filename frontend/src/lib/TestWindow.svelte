<script lang="ts">
  import Window from "./Window.svelte";
  export let id: string;
  export let icon: string;
  export let name: string;
  export let minimized: boolean;
</script>

<Window {id} {name} {icon} {minimized}>
  <p>test window</p>
</Window>
