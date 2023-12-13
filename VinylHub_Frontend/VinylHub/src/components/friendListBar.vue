<template>
    <div class="bg-dark separator">

    </div>
    <div class="friend-list bg-dark"
        :class="{ 'd-flex justify-content-center align-items-center': friendsDadesStore.friendsConfirmed.length === 0 }">
        <div class="empty-list" v-if="friendsDadesStore.friendsConfirmed.length === 0">
            <h4>Your friend list is empty.</h4>
            <h4>Begin adding friends to start sharing your favorite tunes!</h4>
        </div>
        <ul v-else>
            <li v-for="friend in friendsDadesStore.friendsConfirmed" :key="friend.id"
                @contextmenu.prevent="handleRightClick(friend, $event)">
                {{ friend.username }}
            </li>
        </ul>
        <div ref="contextMenu" id="context-menu" class="bg-dark">
            <div class="item" @click="showProfile()">
                <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                See friend profile
            </div>
            <div class="item" @click="deleteFriendAction(selectedFriend)">
                <font-awesome-icon :icon="['fas', 'trash-can']" class="icon" />
                Delete friend
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useFriendsDadesStore } from "@/stores/friendsDades.js";
import { ref, onMounted } from "vue";
const router = useRouter();
const selectedFriend = ref(null);
const friendsDadesStore = useFriendsDadesStore();
function showProfile() {
    router.push("/friend/" + selectedFriend.value.id);
}
const contextMenu = ref(null);

window.addEventListener("click", function () {
    if (contextMenu.value) {
        contextMenu.value.classList.remove("active");
    }
});
const handleRightClick = (friend, event) => {
    if (contextMenu.value) {
        const menuWidth = contextMenu.value.offsetWidth;
        const menuHeight = contextMenu.value.offsetHeight;

        const clickX = event.clientX;
        const clickY = event.clientY;

        const screenRight = window.innerWidth;
        const screenBottom = window.innerHeight;

        let topPosition = event.offsetY;
        let leftPosition = event.offsetX;
        // Verificar si el menú desbordaría hacia la derecha
        if (clickX + menuWidth > screenRight) {
            contextMenu.value.style.right = 0 + 'px';
        } else {
            contextMenu.value.style.left = leftPosition + 'px';
        }

        // Verificar si el menú desbordaría hacia abajo
        if (clickY + menuHeight > screenBottom) {
            contextMenu.value.style.bottom = 0 + 'px';
        } else {
            contextMenu.value.style.top = topPosition + 'px';
        }
        contextMenu.value.classList.add('active');
        selectedFriend.value = friend;
    }
};

async function deleteFriendAction(selectedFriend) {
    if (selectedFriend.value !== null) {


        const response = await friendsDadesStore.deleteFriend(selectedFriend.id);
        if (response && response.status === 200) {
            const type = "confirmed";
            friendsDadesStore.fetchFriends(type).then().catch(error => {
                console.error(error);
            });
            friendsDadesStore.applyFriendListOrder();
        }

    }
}

onMounted(() => {
    const type = "confirmed";
    friendsDadesStore.fetchFriends(type).then().catch(error => {
        console.error(error);
    });
    friendsDadesStore.applyFriendListOrder();

});



</script>

<style scoped>
.separator {
    height: 10vh;
    border-radius: 10px 0 0 0;
}

.friend-list {
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    border-radius: 0 0 0 10px;
}

ul {
    list-style: none;
    padding-inline-start: 0;
}

ul li {
    height: 50px;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 10px;
    padding-left: 20px;
    line-height: 50px;
}

ul li img {
    padding-right: 10px;
}

li:hover {
    background-color: rgb(86, 87, 87);
}

.friend-list::-webkit-scrollbar {
    width: 15px;
}

.friend-list:hover::-webkit-scrollbar-thumb {
    background-color: #666;
}

.friend-list:hover::-webkit-scrollbar-track {
    background-color: #333;
}

.empty-list {
    padding: 40px;
    text-align: center;
}


#context-menu {
    position: absolute;
    z-index: 10000;
    width: 150px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    transform: scale(0);
    transform-origin: top left;
}

#context-menu.active {
    transform: scale(1);
    transition: transform 200ms ease-in-out;
}

#context-menu .item {
    padding: 8px 5px;
    font-size: 15px;
    cursor: pointer;
}

#context-menu .item:hover {
    background-color: #555;
}

#context-menu .item .icon {
    display: inline-block;
    margin-right: 5px;
}
</style>