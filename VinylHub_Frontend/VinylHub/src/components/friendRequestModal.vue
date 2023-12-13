<template>
    <!-- Modal -->
    <div class="modal fade modalContainer" id="friendsRequest" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 custom-centered" id="staticBackdropLabel">Friend Requests</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="noFriendRequest d-flex justify-content-center" v-if="friendsDadesStore.friendsPending.length == 0">
                        <h4>NO FRIEND REQUEST!</h4>
                    </div>
                    <div class="friendRequestList" v-else>
                        <ul>
                            <li v-for="request in friendsDadesStore.friendsPending" :key="request.id">
                                <span v-if="request.name !== null">{{ request.username }}</span>
                                <span v-else>{{ request.email }}</span>
                                <span>
                                    <font-awesome-icon :icon="['fas', 'check']"
                                    class="acceptIcon" @click="acceptRequest(request.id)"/>
                                    <font-awesome-icon :icon="['fas', 'xmark']"
                                    class="denyIcon" @click="denyRequest(request.id)"/>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button style="width: 100px;" type="button" class="btn btn-outline-info custom-centered"
                        data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFriendsDadesStore } from '@/stores/friendsDades.js';
const friendsDadesStore = useFriendsDadesStore();
import { onMounted } from "vue";
async function acceptRequest(id){
    await friendsDadesStore.acceptFriendRequest(id);
    await friendsDadesStore.fetchFriends("pending");
    await friendsDadesStore.fetchFriends("confirmed");
}

async function denyRequest(id){
    await friendsDadesStore.denyFriendRequest(id);
    friendsDadesStore.fetchFriends("pending").then().catch(error => {
        console.error(error);
    });
    await friendsDadesStore.fetchFriends("confirmed");
}

onMounted(() => {
    const type = "pending";
    friendsDadesStore.fetchFriends(type).then().catch(error => {
      console.error(error);
    });
});

</script>

<style scoped>
.custom-centered {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 100%;
}

.friendRequestList ul{
    list-style-type: none;
    padding: 0;
}

.friendRequestList ul li{
    height: 50px;
    margin: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.acceptIcon{
    height: 20px;
    width: 20px;
    color: #37c625;
    margin: 0 10px;
    cursor: pointer;
}

.denyIcon{
    height: 20px;
    width: 20px;
    color: #de4437;
    cursor: pointer;
    margin: 0 10px;
}

.acceptIcon:hover{
    box-shadow: 0 0 10px #37c625;
    border: 1px solid #37c625;
}


.denyIcon:hover{
    box-shadow: 0 0 10px #de4437;
    border: 1px solid #de4437;
}

.modal-body::-webkit-scrollbar {
  width: 10px;
}
.modal-body:hover::-webkit-scrollbar-thumb {
  background-color: #666;
}

.modal-body:hover::-webkit-scrollbar-track {
  background-color: #333;
}
</style>