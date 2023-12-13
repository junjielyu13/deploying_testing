import { defineStore } from "pinia";
import { useUtilsStore } from "@/stores/utils.js";
import axios from "axios";
export const useFriendsDadesStore = defineStore("friendsDades", {
  // State ==> equivalent a variables
  state: () => ({
    friendsConfirmed: [],
    friendsPending: [],
    friendsWaiting: [],
  }),
  getters: {},
  // actions ==> equivalent a funcions
  actions: {
    applyFriendListOrder() {
      const utilsStore = useUtilsStore();
      //ascending order
      if (utilsStore.friendListOrder === 1) {
        this.friendsConfirmed.sort((a, b) => {
          const usernameA = a.username.toUpperCase();
          const usernameB = b.username.toUpperCase();
          if (usernameA < usernameB) {
            return -1;
          }
          if (usernameA > usernameB) {
            return 1;
          }
          return 0;
        });
      }
      // descending order
      else {
        this.friendsConfirmed.sort((a, b) => {
          const usernameA = a.username.toUpperCase();
          const usernameB = b.username.toUpperCase();
          if (usernameA > usernameB) {
            return -1;
          }
          if (usernameA < usernameB) {
            return 1;
          }
          return 0;
        });
      }
    },
    async fetchFriends(type) {
      const url = `/me/my_friends?status=${type}`;
      try {
        const response = await axios.get(url);
        if (type === "confirmed") {
          this.friendsConfirmed = response.data;
        } else if (type === "pending") {
          this.friendsPending = response.data;
        } else if (type === "waiting") {
          this.friendsWaiting = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async acceptFriendRequest(id) {
      const url = `/me/my_friends/${id}/confirm`;
      try {
        await axios.post(url);
      } catch (error) {
        console.error(error);
      }
    },
    async denyFriendRequest(id) {
      const url = `/me/my_friends/${id}/reject`;
      try {
        await axios.post(url);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFriend(id) {
      const url = `/me/my_friends/${id}`;
      try {
        const response = await axios.delete(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async addFriend(id) {
      const url = "/me/my_friends";
      const params = {
        friend_id: id,
      };
      try {
        const response = await axios.post(url, params);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    checkFriendExists(id){
      return this.friendsConfirmed.some(friend => friend.id == id);
    },
    checkIfIsVinylHubAccount(id){
      return id == 1;
    }
  },
});
