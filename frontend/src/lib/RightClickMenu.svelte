<div>
  <button>Example</button>
</div>

<style>
  div {
    position: fixed;
    top: 100px;
    left: 50%;
    width: 200px;
    height: 350px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(51, 51, 51, 0.705);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 3px;
  }
  button {
    width: 100%;
    height: 30px;
    background: none;
    border: none;
    border-radius: 5px;
    font-family: var(--main-font);
    color: var(--file-icon-color);
    cursor: pointer;
    transition: background-color 0.25s linear;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.096);
  }
</style>
