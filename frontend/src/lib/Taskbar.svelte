<script lang="ts">
	import TaskbarIcon from "./taskbar/TaskbarIcon.svelte";

	export let showMainMenu: boolean;
</script>

<div class="taskbar">
	<TaskbarIcon on:click={() => showMainMenu = !showMainMenu} />
	<div class="spacer"></div>
</div>

<style>
	.taskbar {
		width: 100vw;
		height: 48px;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		/* background-color: rgba(51, 51, 51, 0.705); */
		background-color: rgba(27, 32, 46, 0.705);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.spacer {
		width: 490px;
		height: 5px;
	}
</style>
