import { defineStore } from "pinia";
import axios from "axios";
import { useMusicControlsStore } from "@/stores/musicControls.js";
import { useUtilsStore } from "@/stores/utils.js";
export const useMusicDadesStore = defineStore("musicDades", {
  // State ==> equivalent a variables
  state: () => ({
    recommendedSongs: [],
    recommendedPlaylists: [],
    playlistsByGenre: [],
    songsByGenre: [],
    newAlbums: [],
    newSongs: [],
    myPlaylists: [],
    myLikedSongsPlaylist: [],
    popularArtists: [],
    hotSongs: [],
    hotPlaylists: [],
    songsMatching: [],
    songsMatchingArtist: [],
    playlistsMatching: [],
    usersMatching: [],
    artists: [],
    genres: [],
    followedPlaylists: [],
    currentGenre: null,
    currentSong: null,
    currentPlayList: null,
    currentSpecificPlayList: null,
    currentSpecificPlayListSongIndex: -1,
    currentPlayListIdForPlaysNumber: -1,
  }),
  getters: {},
  // actions ==> equivalent a funcions
  actions: {
    async fetchDiscoverSongs() {
      try {
        const response = await axios.get("/discover/recommended_songs");
        this.recommendedSongs = response.data.slice(0, 8); //Limitem les recommended songs a només 8 elements
      } catch (error) {
        console.error("Error when getting discover songs", error);
      }
    },
    async fetchNewSongs() {
      try {
        const response = await axios.get("/discover/new_songs");
        this.newSongs = response.data.slice(0, 15); //Limitem les recommended songs a només 8 elements
      } catch (error) {
        console.error("Error when getting new songs", error);
      }
    },
    async fetchGenres() {
      try {
        const response = await axios.get("/genres");

        // Extract only id and name from the response data
        const genresData = response.data.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));

        this.genres = genresData;
      } catch (error) {
        console.error("Error when getting genres", error);
      }
    },
    async fetchPlaylistsByGenre(idGenre) {
      try {
        const response = await axios.get(`/genres/${idGenre}/playlists`);
        this.playlistsByGenre = response.data.slice(0, 12);
      } catch (error) {
        console.error("Error when getting playlists by genres", error);
      }
    },

    async fetchSongsByGenre(idGenre) {
      try {
        const response = await axios.get(`/genres/${idGenre}/songs`);
        this.songsByGenre = response.data.slice(0, 12);
      } catch (error) {
        console.error("Error when getting songs by genres", error);
      }
    },

    async fetchMyPlaylists() {
      try {
        const response = await axios.get("/me/my_playlists");
        this.myPlaylists = response.data;
      } catch (error) {
        console.error("Error when getting my playlists", error);
      }
    },

    //Adds a playlist to MyPlaylists
    async postMyPlaylist(pl_name, pl_description) {
      try {
        const response = await axios.post("/me/my_playlists", {
          name: pl_name,
          description: pl_description,
        });
        this.myPlaylists = response.data;
      } catch (error) {
        console.error("Error when saving a new playlist", error);
      }
    },

    //Delates a playlist from MyPlaylists
    async deleteMyPlaylist(rem_playlist) {
      try {
        const response = await axios.delete("/me/my_playlists", {
          data: {
            playlist_id: rem_playlist.id,
          },
        });
        this.myPlaylists = response.data;
      } catch (error) {
        console.error("Error when deleting a playlist", error);
      }
    },

    //Add a song to a playlist of MyPlaylists
    async postSongMyPlaylist(songId, playlistId) {
      try {
        await axios.post(`/me/my_playlists/${playlistId}/songs`, {
          song_id: songId,
        });
      } catch (error) {
        console.error("Error when adding a song to a playlist", error);
      }
    },

    //change a song of MyPlaylists visibility
    async changeSongVisibilityMyPlaylist(playlist, state) {
      try {
        await axios.put(`/me/my_playlists/${playlist.id}`, {
          name: playlist.name,
          description: playlist.description,
          visibility: state,
        });
      } catch (error) {
        console.error(
          "Error when change visibility a song on MyPlaylists",
          error
        );
      }
    },

    //Delete a song from a playlist of MyPlaylists
    async deleteSongMyPlaylist(songId, playlistId) {
      try {
        await axios.delete(`/me/my_playlists/${playlistId}/songs`, {
          data: {
            song_id: songId,
          },
        });
      } catch (error) {
        console.error("Error when deleting a song from a playlist", error);
      }
    },

    async fetchMyLikedSongsPlaylist() {
      try {
        const response = await axios.get("/me/my_liked_songs");
        this.myLikedSongsPlaylist = response.data;
      } catch (error) {
        console.error("Error when getting my liked songs playlist", error);
      }
    },

    async addLikedSong(song) {
      try {
        await axios.post("/me/my_liked_songs", {
          song_id: song.id,
        });
      } catch (error) {
        console.error("Error when adding the song in liked songs list", error);
      }
    },

    async deleteLikedSong(song) {
      try {
        await axios.delete("/me/my_liked_songs", {
          data: {
            song_id: song.id,
          },
        });
      } catch (error) {
        console.error(
          "Error when deleting the song in liked songs list",
          error
        );
      }
    },

    // Realiza una solicitud HTTP para obtener playlists recomendadas
    async fetchDiscoverPlaylists() {
      try {
        const response = await axios.get("/discover/recommended_playlists");
        this.recommendedPlaylists = response.data.slice(0, 8);
      } catch (error) {
        console.error("Error when getting discover playlists", error);
      }
    },

    async fetchPopularArtists() {
      try {
        const response = await axios.get("/discover/hot_artists");
        this.popularArtists = response.data.slice(0, 15);
      } catch (error) {
        console.error("Error when getting popular artists", error);
      }
    },

    async fetchHotSongs() {
      try {
        const response = await axios.get("/discover/hot_songs");
        this.hotSongs = response.data.slice(0, 15);
      } catch (error) {
        console.error("Error when getting hot songs", error);
      }
    },

    async fetchHotPlaylists() {
      try {
        const response = await axios.get("/discover/hot_playlists");
        this.hotPlaylists = response.data.slice(0, 8);
      } catch (error) {
        console.error("Error when getting hot playlists", error);
      }
    },
    async fetchSearchResults(searchQuery) {
      try {
        const response = await axios.get(`/search?query=${searchQuery}`);
        this.songsMatching = response.data.songs_by_title.slice(0, 6);
        this.songsMatchingArtist = response.data.songs_by_artist_name.slice(
          0,
          6
        );
        this.playlistsMatching = response.data.playlists_by_name.slice(0, 6);
        this.usersMatching = response.data.users_by_username_or_email.slice(
          0,
          6
        );
      } catch (error) {
        console.error("Error when getting search results", error);
      }
    },
    async requestFriendship(friendId) {
      try {
        await axios.post("/me/my_friends", {
          friend_id: friendId,
        });
      } catch (error) {
        console.error("Error when requesting a friendship", error);
      }
    },
    async fetchArtists() {
      try {
        const response = await axios.get("/artists");
        this.artists = response.data;
      } catch (error) {
        console.error("Error when getting artists", error);
      }
    },
    async postFollowedPlaylist(playlistId) {
      try {
        await axios.post("/me/followed_playlists", {
          playlist_id: playlistId,
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
        console.error("Error:", error.config);
      }
    },

    async fetchFollowedPlaylists() {
      try {
        const response = await axios.get("/me/followed_playlists");
        this.followedPlaylists = response.data;
      } catch (error) {
        console.error("Error when getting followed playlists", error);
      }
    },

    async deleteFollowedPlaylist(playlistId) {
      try {
        await axios.delete("/me/followed_playlists", {
          data: {
            playlist_id: playlistId,
          },
        });
      } catch (error) {
        console.error("Error when deleting a followed playlist", error);
      }
    },

    async getPlaylistById(id) {
      try {
        const response = await axios.get("/playlists/" + id);
        this.currentSpecificPlayList = response.data;
      } catch (error) {
        console.error("Error when getting playlist" + id, error);
      }
    },
    noCurrentSong() {
      return this.currentSong === null;
    },
    async getCurrentSong(song, clickedSong = false) {
      if (
        this.currentSong === null ||
        (this.currentSong !== null && this.currentSong.id !== song.id)
      ) {
        try {
          const response = await axios.get("/songs/" + song.id);
          this.currentSong = response.data;
        } catch (error) {
          console.error("Error when getting playlist" + song.id, error);
        }
        const musicControlsStore = useMusicControlsStore();
        musicControlsStore.isPlayingSong = true;
        musicControlsStore.audioElement.load();
        musicControlsStore.audioElement.play();
        this.addSongPlaysNumber(song);
      }
      if (clickedSong) {
        this.resetCurrentPlaylists();
      }
    },
    async addSongPlaysNumber(song) {
      await axios
        .post("songs/" + song.id + "/increase_plays_counter")
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });
    },
    async addPlayListPlaysNumber(playlist) {
      await axios
        .post("playlists/" + playlist.id + "/increase_plays_counter")
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });
    },
    getCurrentPlaylist(playlist) {
      this.currentPlayList = playlist;
    },
    getArtistName(artistId) {
      const artist = this.artists.find((a) => a.id === artistId);
      return artist ? artist.artist_name : "Artista Desconocido"; // Si no se encuentra el artista, muestra un mensaje por defecto
    },
    resetCurrentPlaylists() {
      const utilsStore = useUtilsStore();
      this.currentPlayList = null;
      this.currentSpecificPlayList = null;
      this.currentSpecificPlayListSongIndex = -1;
      this.currentPlayListIdForPlaysNumber = -1;
      utilsStore.songSelectedId = this.currentSong.id;
    },
    getNextSongName() {
      if (
        this.currentSpecificPlayListSongIndex <
        this.currentSpecificPlayList.songs.length - 1
      ) {
        return this.currentSpecificPlayList.songs[
          this.currentSpecificPlayListSongIndex + 1
        ].title;
      } else {
        return this.currentSpecificPlayList.songs[0].title;
      }
    },

    setCurrentGenre(genre) {
      this.currentGenre = genre;
    },
    resetCurrentSong() {
      this.currentSong = null;
    },
  },
});
