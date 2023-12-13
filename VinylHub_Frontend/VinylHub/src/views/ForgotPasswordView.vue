<template>
    <div class="sendResetPasswordEmailSuccess" v-if="sendResetPasswordEmailSuccess">
        <h4><strong>
                EMAIL SENDED SUCCESS!
            </strong></h4>
    </div>
    <div class="shell" :class="{ 'resizeShell': utilsStore.isCollapsed }">
        <div class="bottom">
            <div class="forgotPassword">
                <h1 style="margin:  0 0 10px 0;">Forgot Password</h1>
                <div class="inputDiv">
                    <label for="email"><strong>Email:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.forgotPasswordCheckApplyColor && errorsStore.errorMsgForgotPassword, 
                    'inputCorrect': userStatusStore.forgotPasswordCheckApplyColor && !errorsStore.errorMsgForgotPassword}"
                    type="text" id="email" name="email" placeholder="Email" v-model="forgotPasswordEmail">
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgForgotPassword">{{ errorsStore.errorMsgForgotPassword }}</p>
                </div>

                <div class="bottom-buttons">
                    <router-link class="back" to="/home"><font-awesome-icon :icon="['fas', 'arrow-left']" /> Back</router-link>
                        
                    <div>
                        <button @click="sendResetEmailAction">Send</button>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUtilsStore } from '@/stores/utils.js';
import { useUserStatusStore } from '@/stores/userStatus.js';
import { useErrorsStore } from "@/stores/errors.js";
import { onBeforeRouteLeave } from 'vue-router';
const errorsStore = useErrorsStore();
const userStatusStore = useUserStatusStore();
const utilsStore = useUtilsStore();
const sendResetPasswordEmailSuccess = ref(false);
const forgotPasswordEmail = ref('');

async function sendResetEmailAction() {
	const response = await userStatusStore.sendResetPasswordEmail(forgotPasswordEmail.value);
    if(response){
        sendResetPasswordEmailSuccess.value = true;
        setTimeout(() => {
            sendResetPasswordEmailSuccess.value = false;
        }, 1500);
    }else{
        sendResetPasswordEmailSuccess.value = false;
    }
}


onBeforeRouteLeave((to, from, next) => {
    userStatusStore.forgotPasswordCheckApplyColor = false;
    next();
});
</script>

<style scoped>
.shell {
    width: 37vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    align-items: center;
    perspective: 1000px;
    transition: left 0.5s;
    left: 0;
}

.forgotPassword {
    position: relative;
}

.bottom-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    text-align: center;
}

.back {
    color: white;

}

.back:hover {
    background-color: transparent;
    color: #06d47b;
    text-decoration: underline;
}

.resizeShell {
    left: 10vw;
    transition: left 0.5s;
}

.bottom {
    width: 100%;
    height: 70vh;
    transform-style: preserve-3d;
    position: relative;
    transition: .7s;
    border-radius: 10px;
    background-image: linear-gradient(147deg, #4d4855 0%, #000000 90%);
}

.bottom>div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.bottom>div h1 {
    color: #fff;
}

input {
    width: 300px;
    height: 30px;
    padding: 0 10px;
    color: #fff;
    font-size: 16px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid #8c8c8c;
    transition: border-color 0.2s ease-in-out;
    background-repeat: no-repeat;
    background-position: right 2% center;
    background-size: 15px 15px;
}


.bottom>div button {
    width: 80px;
    height: 30px;
    color: #333;
    font-size: 15px;
    background-color: rgb(255, 235, 167);
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;


}

.bottom>div button:hover {
    box-shadow: 0 0 10px rgb(255, 235, 167);
}

label {
    width: 300px;
    height: 30px;
    padding: 0 5px;
}

.inputError {
    border-color: #de4437;
    background-image: url('../css/bootstrap-icons-1.11.1/exclamation-circle.svg');
}

.inputError:focus {
    outline: 1px solid #de4437;
}

.inputCorrect {
    border-color: #37c625;
    background-image: url('../css/bootstrap-icons-1.11.1/check-lg.svg');
}

.inputCorrect:focus {
    outline: 1px solid #37c625;
}

.sendResetPasswordEmailSuccess {
    position: absolute;
    opacity: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    animation: drop 1s ease-in, smoke 1.5s ease-in 1s;
    z-index: 1000;
}

@keyframes drop {
    0% {
        opacity: 0;
        top: 0;
        color: white;
    }

    50% {
        top: 5%;
        opacity: 1;
        color: #06d47b;
    }

    100% {
        opacity: 1;
        top: 5%;
        color: #06d47b;
    }
}

@keyframes smoke {
    0% {
        opacity: 1;
        color: #06d47b;
        top: 5%;
        filter: blur(5px);
        transform: translateX(0) translateY(0) rotate(0deg) scale(1);

    }

    100% {
        opacity: 0;
        top: 3%;
        filter: blur(100px);
        transform: translateX(200px) translateY(-200px) rotate(60deg) scale(4);
    }
}

.errorMsgStyle {
    color: red;
    margin-bottom: -10px;
    font-size: 12px;
    padding: 0 5px;
}

.seePasswordIcon {
    height: 15px;
    width: 15px;
    cursor: pointer;
    margin: 0 15px 2px 15px;
}

.inputDiv {
    width: 350px;
    margin-left: 50px;
}

</style>