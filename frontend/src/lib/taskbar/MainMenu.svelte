<script lang="ts">
    import { fly } from 'svelte/transition'; 
    import ProfileButton from './ProfileButton.svelte';
</script>

<div id="mainMenu" transition:fly={{ y: 800 }} class="window">
    <div class="apps">

    </div>
    <div class="profile">
        <ProfileButton />
        <ProfileButton />
    </div>
</div>

<style>
	.window {
        z-index: 200;
		position: fixed;
		width: 600px;
		height: 700px;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
		bottom: 58px;
		left: 50%;
        transform: translateX(-50%);
		border-radius: 5px;
		display: grid;
		grid-template-rows: auto 60px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
		min-width: 470px;
		min-height: 300px;
	}

    .apps {
        background-color: rgba(43, 43, 43, 0.534);
    }

    .profile {
        background-color: rgba(27, 32, 46, 0.705);
        padding: 10px 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

	.window::-webkit-scrollbar {
		width: 0;
		height: 0;
		cursor: default !important;
	}
</style>
