<script lang="ts">
    import profilePic from "../../assets/profilePic.png";
</script>

<button title="Stephen Gruzin">
    <div class="imgRounder">
        <img src={profilePic} alt="Profile" />
    </div>
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

    .imgRounder {
        height: 100%;
        border-radius: 100%;
        overflow: hidden;
    }

    button img {
        height: 100%;
    }
</style>