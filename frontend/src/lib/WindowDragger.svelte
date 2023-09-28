<script lang="ts">
    import { hitbox } from "../functions/store";

    export let box: HTMLElement;
    export let oldx: number;
    export let oldy: number;
    export let mouseDown: boolean;
    export let resizeWindow: HTMLElement;
    export let rightHalf: HTMLElement;
    export let leftHalf: HTMLElement;
</script>
<div
    class="cover"
    style={$hitbox ? "background-color: #ff000059;" : ""}
    bind:this={box}
    on:mousedown={(event) => {
        //@ts-ignore
        oldx = event.layerX;
        //@ts-ignore
        oldy = event.layerY;
        mouseDown = true;
    }}
    on:mouseup={(e) => {
        mouseDown = false;
            box.style.top = "0";
            box.style.height = "100%";
            box.style.left = "0";
            box.style.width = "100%";
        if (e.pageX + 10 >= document.body.offsetWidth) {
            resizeWindow.style.width = "50vw";
            resizeWindow.style.height = "calc(100vh - 48px)";
            resizeWindow.style.top = "0px";
            resizeWindow.style.left = "50%";
            rightHalf.style.width = "0";
        } else if (e.pageX === 0) {
            resizeWindow.style.width = "50vw";
            resizeWindow.style.height = "calc(100vh - 48px)";
            resizeWindow.style.top = "0px";
            resizeWindow.style.left = "0";
            leftHalf.style.width = "0";
        }
    }}
    on:mousemove
/>

<style>
    .cover {
		background: none;
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>