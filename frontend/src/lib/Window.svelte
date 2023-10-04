<script lang="ts">
	import ResizedWindow from "./ResizedWindow.svelte";
	import WindowDragger from "./WindowDragger.svelte";
    import { windows, type WindowBox, focused, changeFullscreen } from "../functions/store";
	import { minimizeWindow } from "../functions/store";
	import { fade } from 'svelte/transition';

	export let name: string;
	export let icon: string;
	export let id: string;
	export let needsToSave = false;
	export let minimized = false;
	export let fullScreen = false;

	let mouseDown = false;
	let oldx: number;
	let oldy: number;
	let box: HTMLElement;

	function close() {
		let newFocus = "";
		windows.update((oldWindows) => {
			let newWindows: WindowBox[] = [];
			for (let i=0;i<oldWindows.length;i++) {
				if (oldWindows[i].id !== id) {
					newWindows.push(oldWindows[i]);
					if (!oldWindows[i].minimized) {
						newFocus = oldWindows[i].id
					}
				}
			}
			return newWindows;
		});
		focused.set(newFocus);
	}

	function moveMouse(e: MouseEvent, window2: HTMLElement, rightHalf: HTMLElement, leftHalf: HTMLElement) {
		box.style.top = "-500px";
		box.style.left = "-500px";
		box.style.width = "calc(100% + 1000px)";
		box.style.height = "calc(100% + 1000px)";
		window2.style.left = `${e.pageX - oldx}px`;
		window2.style.top = `${e.pageY - oldy}px`;

		rightHalf.style.width = e.pageX + 10 >= document.body.offsetWidth ? "50vw" : "0";
		leftHalf.style.width = e.pageX === 0 ? "50vw" : "0";
	}
</script>

<ResizedWindow {fullScreen} {minimized} {id} let:leftHalf let:rightHalf let:resizeWindow on:keydown>
	<div class="header">
		<div class="iconName">
			<div class="imgCover"><img src={icon} alt="Icon" /></div>
			<p>{name}</p>
			{#if needsToSave}
				<div transition:fade={{duration:150}} class="needsToSave" />
			{/if}
			<WindowDragger
				bind:oldx={oldx}
				bind:oldy={oldy}
				bind:mouseDown={mouseDown}
				bind:box={box}
				{resizeWindow}
				{leftHalf}
				{rightHalf}
				on:mousemove={(e) => {
					if (mouseDown) moveMouse(e, resizeWindow, rightHalf, leftHalf);
				}}
			/>
		</div>
		<div class="closebuttons">
		<button class="minimize" on:click={() => minimizeWindow(id)}><div class="dash" /></button>
		<button class="resize" on:click={() => changeFullscreen(id)}>
			{#if fullScreen}
				<div in:fade={{duration:250}} class="minimize-box" />
			{:else}
				<div in:fade={{duration:250}} class="box"></div>
			{/if}
		</button>
		<button class="close" on:click={close}><img src="x.svg" alt="Close" /></button>
		</div>
	</div>
	<div class="rest">
		<slot />
	</div>
</ResizedWindow>

<style>
	.header {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: auto 135px;
	}

	.rest {
		width: 100%;
		height: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		overflow: hidden;
	}

	.iconName {
		display: flex;
		align-items: center;
		justify-content: start;
		padding-left: 15px;
		position: relative;
	}

	.imgCover {
		height: 16px;
	}

	.imgCover img {
		height: 100%;
	}

	.iconName p {
		margin-left: 15px;
		font-size: 1.2rem;
		color: #ffffff;
		font-weight: 100;
		word-spacing: 3px;
		letter-spacing: 1px;
	}

	.needsToSave {
		margin-left: 5px;
		width: 6px;
		height: 6px;
		background-color: #ffffff;
		border-radius: 100vw;
	}

	.resize,
	.minimize {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.resize:hover,
	.minimize:hover {
		background-color: rgba(71, 71, 71, 0.356);
	}

	.minimize .dash {
		width: 11px;
		height: 1px;
		background-color: white;
	}

	.resize .box {
		width: 10px;
		height: 10px;
		border: 1px solid white;
		border-radius: 2px;
	}

	.resize .minimize-box {
		width: 10px;
		height: 10px;
		/* border: 1px solid #ffffff; */
		border-top: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
		border-radius: 2px;
		position: relative;
		margin-bottom: 2px;
	}

	.minimize-box::after {
		content: "";
		position: absolute;
		width: 9px;
		height: 9px;
		border: 1px solid #ffffff;
		border-radius: 2px;
		left: -2px;
		top: 2px;
	}

	.closebuttons {
		display: grid;
		grid-template-columns: 45px 45px 45px;
		height: 28px;
		border-top-right-radius: 5px;
		overflow: hidden;
	}

	.closebuttons button {
		border: none;
		background: none;
		width: 100%;
		height: 28px;
	}

	.close {
		padding: 2px 10px;
	}

	.close:hover {
		background-color: rgb(206, 14, 14);
	}

	.close img {
		width: 100%;
		filter: invert(1);
	}
</style>
