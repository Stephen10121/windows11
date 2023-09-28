<script lang="ts">
	import Background from "./lib/Background.svelte";
	import Taskbar from "./lib/Taskbar.svelte";
	import NotePad from "./lib/NotePad.svelte";
	import TestWindow from "./lib/TestWindow.svelte";
	import { windows } from "./functions/store";
	let backgroundImage = "background-dark.jpg";
</script>

<main style="background-image: url({backgroundImage})">
	<Background />
	{#each $windows as window (window.id)}
		{#if window.appType === "notepad"}
			<NotePad id={window.id} icon={window.icon} name={window.name} />
		{:else if window.appType === "window"}
			<TestWindow id={window.id} name={window.name} icon={window.icon} />
		{/if}
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
