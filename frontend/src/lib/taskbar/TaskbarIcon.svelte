<script lang="ts">
    import homeIcon from "../../assets/homeIcon.png";
</script>

<button on:click id="mainMenuOpener">
    <img src="window.png" alt="Home Page" id="mainMenuOpener">
</button>

<style>
    button {
        height: 40px;
        width: 40px;
        background: none;
        border: none;
        padding: 8px;
        border-radius: 3px;
        transition: background 0.25s linear, padding 0.06s linear;
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
</style>