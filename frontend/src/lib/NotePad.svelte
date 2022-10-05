<div class="notepad">
  <div class="header">
    <div class="iconName">
      <div class="imgCover"><img src="notepad.png" alt="Notepad" /></div>
      <p>aboutMe.txt - Notepad</p>
    </div>
    <div class="closebuttons">
      <button class="minimize"><div class="dash" /></button>
      <button class="resize"><div class="box" /></button>
      <button class="close"><img src="x.svg" alt="Close" /></button>
    </div>
  </div>
  <div class="extra">
    <div class="fev">
      <button>File</button>
      <button>Edit</button>
      <button>View</button>
    </div>
    <button class="settings"><img src="cog.png" alt="Settings" /></button>
  </div>
  <textarea name="notepadInfo" id="notepadInfo">About Me</textarea>
  <div class="info">info</div>
</div>

<style>
  .notepad {
    position: fixed;
    z-index: 6;
    width: 680px;
    height: 800px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: rgba(43, 43, 43, 0.534);
    filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    top: 50px;
    left: 50px;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 28px 43px auto 30px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
    overflow: hidden;
  }

  .header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iconName {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding-left: 15px;
  }

  .imgCover {
    height: 16px;
  }

  .imgCover img {
    height: 100%;
  }

  .iconName p {
    font-size: 1.15rem;
    color: white;
    font-weight: 100;
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

  .closebuttons {
    display: grid;
    grid-template-columns: 45px 45px 45px;
    height: 28px;
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
    resize: none;
    outline: none;
    padding: 15px;
    background-color: #272727;
    border: none;
    color: rgb(255, 255, 255);
    font-family: var(--main-font);
  }

  .info {
    background-color: #1b1b1b;
  }
</style>
