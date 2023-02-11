<script lang="ts">
  import Window from "./Window.svelte";
  export let id: string;
  export let icon: string;
  export let name: string;
</script>

<Window {id} {name} {icon}>
  <p>test window</p>
</Window>
