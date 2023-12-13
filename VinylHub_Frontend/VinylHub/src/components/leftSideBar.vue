<script setup>
    import navbar from '@/components/navbarComponent.vue';
    import playBackControls from '@/components/playBackControls.vue';

</script>

<template>
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Contenido del sidebar -->
        <navbar></navbar>
        <playBackControls></playBackControls>
      </div>
  

</template>
  
<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 20vw;
    background-color: #121212;
  }


</style>
  
  
  