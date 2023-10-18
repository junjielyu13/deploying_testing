<template>
    <div class="bg-dark manipulation-container">
      <div class="d-flex align-items-center justify-content-between">
        <div class="friendListTitle">
          <h5>Friend List</h5>
        </div>
        <div class="d-flex align-items-center icons-section">
          <div @mouseenter="showIcons = true" @mouseleave="showIcons = false">
            <div style="margin-right: 10px;" v-if="!showIcons">
                <font-awesome-icon  :icon="['fas', 'bars']"/>
            </div>

            <div v-else class="tools-icons d-flex align-items-center justify-content-between">
              <div class="tools-icon">
                <font-awesome-icon :icon="['fas', 'user-plus']" />
              </div>
              <div class="tools-icon">
                <font-awesome-icon :icon="['fas', 'folder-plus']" />
              </div>
              <div class="tools-icon">
                <font-awesome-icon :icon="['fas', 'list']" />
              </div>
              <div class="tools-icon">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showIcons = ref(false);
  
  </script>
  
  <style scoped>
  .manipulation-container{
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