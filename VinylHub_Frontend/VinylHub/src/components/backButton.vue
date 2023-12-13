<template>
    <button class="btn go-back-button" @click="goBack">
        <font-awesome-icon :icon="['fas', 'fa-circle-chevron-left']" style="color: #d6d6d6;" class="icon-gray-arrow-white"/>
    </button>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faMusic, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  
  library.add(faMusic, faList, faArrowLeft);
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {};
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  .go-back-button {
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
    }

    .icon-gray-arrow-white {
    font-size: 32px;
    }
  </style>
  