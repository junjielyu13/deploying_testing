<template>
  <div class="bg-dark manipulation-container">
    <div class="d-flex align-items-center justify-content-between">
      <div class="friendListTitle">
        <h5>Friend List</h5>
      </div>
      <div class="d-flex align-items-center icons-section">
        <div @mouseenter="showIcons = true" @mouseleave="showIcons = false">
          <div style="margin-right: 10px;" v-if="!showIcons">
            <font-awesome-icon :icon="['fas', 'bars']"/>
          </div>

          <div v-else class="tools-icons d-flex align-items-center justify-content-between">
            <div class="tools-icon" data-bs-toggle="modal" data-bs-target="#friendsRequest">
              <font-awesome-icon :icon="['fas', 'user-plus']" title="Friend requests" :style="{'color': friendsDadesStore.friendsPending.length > 0 ? '#06d47b' : ''}"/>
            </div>
            <friendRequestModal></friendRequestModal>
            <div class="tools-icon" @click="utilsStore.toggleFriendListOrder()" v-if="utilsStore.friendListOrder === 1">
              <font-awesome-icon :icon="['fas', 'arrow-up-short-wide']" title="Sort ascending" />
            </div>
            <div class="tools-icon" @click="utilsStore.toggleFriendListOrder()"  v-else>
              <font-awesome-icon :icon="['fas', 'arrow-down-wide-short']" title="Sort descending"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import {useUtilsStore} from '@/stores/utils.js';
import friendRequestModal from '@/components/friendRequestModal.vue';
import { useFriendsDadesStore } from '@/stores/friendsDades.js';
const showIcons = ref(false);
const utilsStore = useUtilsStore();
const friendsDadesStore = useFriendsDadesStore();

</script>
  
<style scoped>
.manipulation-container {
  border-radius: 0 0 0 10px;
  width: 100%;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
}

.friendListTitle {
  padding-left: 10px;
}

.tools-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
  transition: opacity 0.3s;
  cursor: pointer;
}

.tools-icons:not(:hover) {
  opacity: 0;
}
</style>