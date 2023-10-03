<script lang="ts">
    import { windows, focused, type WindowBox } from '../../functions/store';
    import { scale } from 'svelte/transition';
    export let icon: string;
    export let id: string;

    function changeMinimized() {
		windows.update((oldWindows) => {
			let newWindows: WindowBox[] = [];
			for (let i=0;i<oldWindows.length;i++) {
				if (oldWindows[i].id===id) {
                    let minimize = oldWindows[i].minimized ? false: $focused===id ? !oldWindows[i].minimized : oldWindows[i].minimized;
					newWindows.push({...oldWindows[i], minimized: minimize });
                    if (!minimize) {
                        focused.set(id);
                    }
				} else {
					newWindows.push(oldWindows[i]);
				}
			}
			return newWindows;
		});
	}

    function iconClicked() {
		changeMinimized();
	}
</script>

<button on:click={iconClicked} id="mainMenuOpener" class="{$focused===id && "focused"}" transition:scale={{duration: 150}}>
    <img src={icon} alt="Home Page" id="mainMenuOpener">
    <div class="bar {$focused===id && "focused"}" />
</button>

<style>
    button {
        --icon-gap: 5px;
        height: 40px;
        width: 40px;
        background: none;
        border: none;
        padding: 8px;
        border-radius: 3px;
        position: relative;
        transition: background 0.25s linear, padding 0.06s linear;
    }

    button.focused {
        background-color: rgba(255, 255, 255, 0.055);
    }

    button:active {
        padding: 10px;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.055);
    }

    img {
        width: 100%;
        height: 100%;
    }

    .bar {
        position: absolute;
        width: 8px;
        height: 3px;
        border-radius: 2px;
        background-color: rgb(143, 143, 143);
        bottom: 1px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.25s linear, color 0.25s linear;
    }

    .bar.focused {
        width: 12px;
        background-color: #4CC2FF;
    }
</style>