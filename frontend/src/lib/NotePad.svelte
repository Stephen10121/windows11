<script lang="ts">
    import { windows, type WindowBox } from "../functions/store";
	import Window from "./Window.svelte";

	export let id = "notepad";
	export let icon = "notepad.png";
	export let name = "aboutMe.txt - Notepad";
	export let text = "About Me";
	export let minimized: boolean;
	export let fullScreen: boolean;
	let newText = text;

	let textarea: HTMLTextAreaElement;

	function save() {
		windows.update((previous) => {
			let previousWindows = previous;
			let newWindows: WindowBox[] = [];
			for (let i=0;i<previousWindows.length;i++) {
				if (previousWindows[i].id===id) {
					newWindows.push({
						...previousWindows[i],
						appType: "notepad",
						textData: newText
					});
				} else {
					newWindows.push(previousWindows[i]);
				}
			}
			return newWindows;
		});
	}

	function checkForSave(e: KeyboardEvent) {
		if (e.key === "s" && e.ctrlKey) {
			e.preventDefault();
			save();
		}
	}
</script>

<Window {fullScreen} {minimized} {id} {name} {icon} needsToSave={newText !== text} on:keydown={checkForSave}>
	<div class="notepad">
		<div class="extra">
			<div class="fev">
				<button>File</button>
				<button>Edit</button>
				<button>View</button>
			</div>
			<button class="settings"><img src="cog.png" alt="Settings" /></button>
		</div>
		<textarea
			name="notepadInfo"
			bind:this={textarea}
			bind:value={newText}
		/>
		<div class="info">
			<p class="lncol">Letters <span>{newText.length}</span></p>
			<div class="meta">
				<div class="size"><p>100%</p></div>
				<div class="wformat"><p>Windows (CRLF)</p></div>
				<div class="format"><p>UTF-8</p></div>
			</div>
		</div>
	</div>
</Window>

<style>
	.notepad {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 43px auto 30px;
	}
	.extra {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2px 7px 0px 2px;
	}

	.fev {
		display: flex;
		gap: 10px;
		padding: 2px;
	}

	.fev button {
		border: none;
		background: none;
		padding: 8px;
		color: white;
		border-radius: 5px;
	}

	.fev button:hover {
		background-color: rgba(71, 71, 71, 0.356);
	}

	.settings {
		height: 30px;
		border: none;
		background: none;
		padding: 5px;
		color: white;
		border-radius: 5px;
	}

	.settings:hover {
		background-color: rgba(71, 71, 71, 0.356);
	}

	.settings img {
		height: 100%;
		filter: invert(1);
	}

	.notepad textarea {
		width: 100%;
		height: 100%;
		background-color: #272727;
		padding: 15px;
		resize: none;
		outline: none;
		border: none;
		color: rgb(255, 255, 255);
		font-family: var(--main-font);
	}

	.info {
		background-color: #1b1b1b;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
	}

	.lncol {
		font-size: 1.15rem;
		color: rgb(192, 192, 192);
	}

	.meta {
		display: flex;
		gap: 50px;
		padding-right: 60px;
	}
	.meta div {
		border-left: 1px solid rgb(70, 70, 70);
		padding: 0 10px;
	}

	.meta div p {
		font-size: 1.15rem;
		color: rgb(192, 192, 192);
	}
</style>
