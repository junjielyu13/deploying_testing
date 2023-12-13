import { defineStore } from "pinia";
import axios from "axios";
export const useUserDadesStore = defineStore("userDades", {
  // State ==> equivalent a variables
  state: () => ({
    username: "",
    email: "",
    gender: "",
    sharePlaylists: [],
    userImage: "",
    tempUserImage: "",
    tempIsChangeAvatar: false,
    friendUsername: "",
    friendUserImage: "",
    friendEmail: "",
    friendGender: "",
    friendSharePlaylists: [],
  }),
  getters: {},
  // actions ==> equivalent a funcions
  actions: {
    saveModalUserImage(img) {
      this.tempUserImage = img;
      this.tempIsChangeAvatar = true;
    },
    async saveNewUserInformation(username, email, gender) {
      const url = "/auth";
      const url2 = "/auth/avatar";
      const data = {
        username: username,
        email: email,
        name: gender,
      };
      const data2 = {
        avatar: this.tempUserImage,
      };
      try {
        const response = await axios.put(url, data);
        let response2 = null;
        if (this.tempIsChangeAvatar) {
          response2 = await axios.put(url2, data2);
        }
        this.cleanTempVariables();
        return [response, response2];
      } catch (error) {
        console.error(error);
      }
    },
    async getAvatarImage() {
      const url = "/auth/avatar";
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    cleanUserInformation() {
      this.username = "";
      this.email = "";
      this.gender = "";
      this.tempUserImage = "";
      this.userImage = "";
      this.sharePlaylists = [];
    },
    cleanTempVariables() {
      this.tempIsChangeAvatar = false;
    },
    async getUserProfileInformations() {
      const url = "/me/my_profile";
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async setUserProfileInformations(responseUserInfo) {
      if (responseUserInfo.data["username"] === null) {
        const min = 10000;
        const max = 99999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.username = "User " + randomNumber + " (default)";
        await this.saveNewUserInformation(this.username,responseUserInfo.data["email"],responseUserInfo.data["name"]);
      } else {
        this.username = responseUserInfo.data["username"];
      }
      this.email = responseUserInfo.data["email"];
      this.gender = responseUserInfo.data["name"];
      if (!this.gender) {
        this.gender = "Unknown";
      }
      const response2 = await this.getAvatarImage();
      if (response2) {
        this.userImage = response2.data.url;
      }
    },
    async getOtherUserProfileInformation(id) {
      const url = `/users/${id}/profile`;
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async setOtherUserProfileInformations(responseUserInfo) {
      if (responseUserInfo.data["username"] === null) {
        this.friendUsername = "";
      } else {
        this.friendUsername = responseUserInfo.data["username"];
      }
      this.friendEmail = responseUserInfo.data["email"];
      this.friendGender = responseUserInfo.data["name"];
      if (!this.friendGender) {
        this.friendGender = "Unknown";
      }
      if(responseUserInfo.data["avatar"] !== null){
        this.friendUserImage = responseUserInfo.data["avatar"];
      }
    },
    async getOtherUserSharedPlaylists(id) {
      const url = `/users/${id}/playlists/`;
      try {
        const response = await axios.get(url);
        this.friendSharePlaylists = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getSharedPlaylists(){
      const url = "/me/my_playlists";
      try {
        const response = await axios.get(url);

        if(response && response.status === 200){
          this.sharePlaylists = response.data.filter(item => item.visibility === "shared");
        }
      } catch (error) {
        console.error(error);
      }
    },
    cleanFriendInformations(){
        this.friendUsername = "";
        this.friendEmail = "";
        this.friendGender = "";
        this.friendUserImage = "";
        this.friendSharePlaylists = [];
    },
  },
});
