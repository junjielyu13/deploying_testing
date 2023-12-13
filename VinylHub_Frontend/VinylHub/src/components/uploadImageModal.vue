<template>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-dark">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Image</h1>
      </div>
      <div class="modal-body">
        <input type="file" @change="handleFileChange" ref="fileInput"><br>
        <div class="previewImgBox d-flex justify-content-center align-items-center flex-column">
            <label style="font-size: 20px;" for="preview" v-if="previewImg"><strong>Preview:</strong></label> <br>
            <label style="font-size: 20px;" for="preview" v-if="!previewImg"><strong>Current:</strong></label> <br>
        <img class="previewImg" :src="previewImg" alt="Selected Image" v-if="previewImg">
        <img class="previewImg" :src="userDadesStore.userImage" alt="Selected Image" v-else-if="userDadesStore.userImage">
        <img class="previewImg" src="../css/bootstrap-icons-1.11.1/person-fill.svg" alt="Selected Image" v-else>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveImage()" :disabled="!file">Save Image</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { useUserDadesStore } from "@/stores/userDades.js"
import { ref } from 'vue';
const userDadesStore = useUserDadesStore();
const previewImg = ref("");
const fileInput = ref(null);
const file = ref(null);
const clearFileInput = () => {
  fileInput.value.value = '';
};

const handleFileChange = (event) => {
  file.value = event.target.files[0];

  if (file.value) {
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImg.value = e.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file.value);
  }
};

function close(){
    previewImg.value = "";
    clearFileInput();
}

function saveImage(){
    if(file.value !== null){
      userDadesStore.saveModalUserImage(previewImg.value);
      previewImg.value = "";
      clearFileInput();
    }

}
</script>

<style scoped>
.modal-content{
    height: 90vh;
}

.modal-dialog {
    max-width: 50vw; 
}

.previewImg{
    width: 15vw;
    height: auto;
}
</style>