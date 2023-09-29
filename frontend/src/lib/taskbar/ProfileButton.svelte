<script lang="ts">
    import profilePic from "../../assets/profilePic.png";
</script>

<button title="Stephen Gruzin">
    <div class="imgRounder">
        <img src={profilePic} alt="Profile" />
    </div>
    <p>Stephen Gruzin</p>
</button>

<style>
    button {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        background: none;
        padding: 4px 10px;
        border-radius: 3px;
        border: none;
        transition: background 0.25s linear;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.055);
    }

    button P {
        color: rgb(255, 255, 255);
		font-family: var(--main-font);
        margin-bottom: 2px;
        font-weight: 400;
        font-size: 1.15rem;
        letter-spacing: 0.1ch;
    }

    .imgRounder {
        height: 100%;
        border-radius: 100%;
        overflow: hidden;
    }

    button img {
        height: 100%;
    }
</style>