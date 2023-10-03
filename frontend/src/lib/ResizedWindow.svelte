<script lang="ts">
	import { focused } from "../functions/store";
    import ResizePointer from "./ResizePointer.svelte";
	export let id: string;
	export let minimized: boolean;

	const MINIMUM_SCREEN_WIDTH = 470;
	const MINIMUM_SCREEN_HEIGHT = 300;

	let resizeWindow: HTMLElement;

	let rightHalf: HTMLElement;
	let leftHalf: HTMLElement;

	let previousRightPosition = 0;
	let previousBottomPosition = 0;

	let leftHalfDown = false;
	let rightHalfDown = false;
	let topHalfDown = false;
	let bottomHalfDown = false;

	function resize(e: MouseEvent, who: string) {
		const windowDimentions = resizeWindow.getBoundingClientRect();
		switch (who) {
			case "right":
				if (!rightHalfDown) break;
				resizeWindow.style.width = e.pageX - windowDimentions.left + "px";
			case "left":
				if (!leftHalfDown) break;
				const movewidth = previousRightPosition - e.pageX;

				resizeWindow.style.left = `${movewidth <= MINIMUM_SCREEN_WIDTH ? windowDimentions.left : e.pageX}px`;
				resizeWindow.style.width = `${movewidth <= MINIMUM_SCREEN_WIDTH ? windowDimentions.width : movewidth}px`;
			case "top":
				if (!topHalfDown) break;
				const moveheight = previousBottomPosition - e.pageY;

				resizeWindow.style.top = `${moveheight <= MINIMUM_SCREEN_HEIGHT ? windowDimentions.top : e.pageY}px`;
				resizeWindow.style.height = `${moveheight <= MINIMUM_SCREEN_HEIGHT ? windowDimentions.height : moveheight}px`;
			case "bottom":
				if (!bottomHalfDown) break;
				resizeWindow.style.height = e.pageY - windowDimentions.top + "px";
		}
	}

	function changeTopHalfDown({detail}: { detail: boolean }) {
		if (detail) {
			topHalfDown = true;
			previousBottomPosition = resizeWindow.getBoundingClientRect().bottom;
		} else {
			topHalfDown = false;
		}
	}

	function changeBottomHalfDown({detail}: { detail: boolean }) {
		if (detail) {
			bottomHalfDown = true;
			previousBottomPosition = resizeWindow.getBoundingClientRect().bottom;
		} else {
			bottomHalfDown = false;
		}
	}

	function changeLeftHalfDown({detail}: { detail: boolean }) {
		if (detail) {
			leftHalfDown = true;
			previousRightPosition = resizeWindow.getBoundingClientRect().right;
		} else {
			leftHalfDown = false;
		}
	}

	function changeRightHalfDown({detail}: { detail: boolean }) {
		if (detail) {
			rightHalfDown = true;
			previousRightPosition = resizeWindow.getBoundingClientRect().right;
		} else {
			rightHalfDown = false;
		}
	}
</script>

<div class="halfScreen" bind:this={leftHalf}><div /></div>
<div class="halfScreenright" bind:this={rightHalf}><div /></div>
<div
	on:mousedown={() => $focused = id}
	on:keydown
	class="{minimized && "minimized"} window {$focused !== id ? 'notFocused' : ''}"
	style="z-index: {$focused === id ? '8' : '6'};"
	bind:this={resizeWindow}
>
	{#if $focused === id}
		<ResizePointer id="top" bind:makeBig={topHalfDown} on:resize={({detail}) => resize(detail, "top")} on:down={changeTopHalfDown} />
		<ResizePointer id="bottom" makeBig={bottomHalfDown} on:resize={({detail}) => resize(detail, "bottom")} on:down={changeBottomHalfDown} />
		<ResizePointer id="left" makeBig={leftHalfDown} on:resize={({detail}) => resize(detail, "left")} on:down={changeLeftHalfDown} />
		<ResizePointer id="right" makeBig={rightHalfDown} on:resize={({detail}) => resize(detail, "right")} on:down={changeRightHalfDown} />
	{/if}
	<slot {resizeWindow} {leftHalf} {rightHalf} />
</div>

<style>
	.window {
		position: fixed;
		width: 680px;
		height: 800px;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		background-color: rgba(43, 43, 43, 0.534);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
		top: 50px;
		left: 90px;
		border-radius: 5px;
		display: grid;
		grid-template-rows: 28px auto;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
		min-width: 470px;
		min-height: 300px;
	}

	.window.minimized {
		display: none;
	}

	.window.notFocused {
		background-color: rgb(26, 26, 26);
	}

	.window::-webkit-scrollbar {
		width: 0;
		height: 0;
		cursor: default !important;
	}

	.halfScreen {
		position: fixed;
		left: 0;
		top: 0;
		width: 0;
		height: calc(100vh - 48px);
		padding: 10px;
		transition: width 0.15s linear;
	}

	.halfScreenright {
		position: fixed;
		right: 0;
		top: 0;
		width: 0;
		height: calc(100vh - 48px);
		padding: 10px;
		transition: width 0.15s linear;
	}

	.halfScreen div,
	.halfScreenright div {
		border-radius: 5px;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		background-color: rgba(131, 131, 131, 0.781);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
	}
</style>
