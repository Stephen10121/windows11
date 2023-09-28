<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { hitbox } from "../functions/store";

    export let id: "right" | "left" | "bottom" | "top";
    export let makeBig: boolean;
    
    const dispatch = createEventDispatcher();
</script>


<div
    class="resize-pointer {makeBig ? 'big' : ''}{$hitbox ? " hitbox" : ""}"
    {id}
    on:mousedown|preventDefault={() => dispatch("down", true)}
    on:mouseup|preventDefault={() => dispatch("down", false)}
    on:mousemove={(e) => dispatch("resize", e)}
/>

<style>
    
	.resize-pointer {
		width: 10px;
		height: 100%;
		position: absolute;
		top: 50%;
		bottom: 50%;
		margin-top: auto;
		margin-bottom: auto;
		transition-property: transform;
		transition-duration: 0.25s;
	}

	#top {
		top: -10px;
		cursor: n-resize;
		z-index: 200;
        width: 100%;
		height: 10px;
        bottom: auto;
	}

    #top.hitbox {
        background: #559bf752;
    }

	#top.big {
		width: 200vw;
		height: 200vh;
		top: -100vh;
		left: -100vw;
	}

	#bottom {
		z-index: 200;
        width: 100%;
		height: 10px;
        bottom: auto;
		top: 100%;
		cursor: s-resize;
	}

    #bottom.hitbox {
        background: #ae55f752;
    }

	#bottom.big {
		width: 200vw;
		height: 200vh;
		top: -50%;
		left: -100vw;
	}

	#left {
		left: -10px;
		cursor: w-resize;
	}

    #left.hitbox {
        background: #f7555552;
    }

	#left.big {
		width: 200vw;
		height: 200vh;
		top: -50%;
		left: -100vw;
	}

	#right {
		right: -10px;
		cursor: e-resize;
	}

    #right.hitbox {
        background: #ecf75552;
    }

	#right.big {
		width: 200vw;
		height: 200vh;
		top: -50%;
		right: -100vw;
	}
</style>