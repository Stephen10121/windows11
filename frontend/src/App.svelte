<script lang="ts">
	import Background from "./lib/Background.svelte";
	import Taskbar from "./lib/Taskbar.svelte";
	import NotePad from "./lib/NotePad.svelte";
	import TestWindow from "./lib/TestWindow.svelte";
	import { focused, windows } from "./functions/store";
    import { onMount } from "svelte";
    import MainMenu from "./lib/taskbar/MainMenu.svelte";
	let backgroundImage = "background-dark.jpg";
	let mounted = false;
	let showMainMenu = false;

	$: {
		if (mounted) {
			const windowsSTR = JSON.stringify($windows);
			window.localStorage.setItem("windows", windowsSTR);
		}
	}

	onMount(() => {
		const windowsSTR = window.localStorage.getItem("windows");

		if (!windowsSTR) return mounted = true;
		if (windowsSTR.length === 0) return mounted = true;

		try {
			const windowsJSON = JSON.parse(windowsSTR);
			windows.set(windowsJSON);

			if (windowsJSON > 0) {
				focused.set(windowsJSON.reverse()[0].id);
			}
		} catch(err) {
			console.error(err);
		}
		mounted = true;
	});


	function mainMenuClose(e) {
		showMainMenu = showMainMenu ? e.target.id === "mainMenu" || e.target.id ==="mainMenuOpener" : false
	}
</script>

<main style="background-image: url({backgroundImage})">
	<Background />
	{#each $windows as window (window.id)}
		{#if window.appType === "notepad"}
			<NotePad id={window.id} name={window.name} text={window.textData} minimized={window.minimized} fullScreen={window.fullScreen} />
		{:else if window.appType === "window"}
			<TestWindow id={window.id} name={window.name} icon={window.icon} minimized={window.minimized} />
		{/if}
	{/each}
	{#if showMainMenu}
		<MainMenu />
	{/if}
	<Taskbar bind:showMainMenu={showMainMenu} />
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
