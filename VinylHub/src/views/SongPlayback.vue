<template>
  <div id="song-playback">
    <div class="container">
      <div class="main">
        <div class="header">
          <h2>{{ $route.params.songName }}</h2>
        </div>
        <div class="song-img"></div>
        <div class="song-detail">
          <h2>{{ $route.params.artist }}</h2>
          <h3>Details about the song</h3>
        </div>
        <div class="audio-container">
          <audio controls>
            <source src="" type="audio/mpeg" />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>
        <div class="next-up">
          <p>Next Up: <span>Bring to no Sake</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "song-playback",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Meow+Script&display=swap");

.my-view * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
  background: rgba(133, 141, 143, 0.8);
}
.main {
  width: 500px;
  max-width: 100%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 20px;
  background-image: linear-gradient(
    to left top,
    rgba(106, 229, 194, 0.8),
    rgba(0, 0, 255, 0.4)
  );
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
}

.header {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-align: center;
  font-size: 2rem;
  margin-top: 5px;
  margin-bottom: 20px;
}

.song-img {
  display: block;
  width: 200px;
  max-width: 100%;
  background: bisque;
  position: relative;

  margin: auto;
  margin-bottom: 30px;
  border-radius: 50px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);

  background-image: url("../assets/imatge.jpg");
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.song-img::after {
  content: "";
  display: block;
  padding-top: 100%;
}

.song-img::before {
  content: "";
  display: block;
  position: absolute;

  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}

.song-detail {
  text-align: center;
  margin: 30px;
}
.song-detail h2 {
  font-weight: 800;
  font-size: 20px;
}

.song-detail h3 {
  font-style: italic;
  font-weight: 300;
  font-size: 15px;
}

.audio-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.next-up {
  text-align: center;
  margin-top: 20px;
}

.next-up p {
  color: white;
}

.next-up span {
  font-style: italic;
}
</style>
