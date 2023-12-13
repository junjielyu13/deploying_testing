<template>
    <div class="resetPasswordSuccess" v-if="resetPasswordSuccess">
        <h4><strong>
                PASSWORD RESET SUCCESS!
            </strong></h4>
    </div>
    <div class="shell" :class="{ 'resizeShell': utilsStore.isCollapsed }">
        <div class="bottom">
            <div class="resetPassword">
                <h1 style="margin:  0 0 10px 0;">Reset Password</h1>
                <div class="inputDiv">
                    <label for="password"><strong>New password:</strong></label><br>
                    <input :class="{
                        'inputError': userStatusStore.resetPasswrordCheckApplyColor && errorsStore.errorMsgResetPassword,
                        'inputCorrect': userStatusStore.resetPasswrordCheckApplyColor && !errorsStore.errorMsgResetPassword
                    }"
                        :type="passwordType" id="password" name="password" placeholder="Password"
                        v-model="userStatusStore.resetPasswordText">
                    <font-awesome-icon :icon="['fas', 'eye']" class="seePasswordIcon" @click="togglePasswordVisibility()"
                        v-if="!showPassword" />
                    <font-awesome-icon :icon="['fas', 'eye-slash']" class="seePasswordIcon"
                        @click="togglePasswordVisibility()" v-else />
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgResetPassword">{{ errorsStore.errorMsgResetPassword }}</p>
                </div>
                <div class="inputDiv">
                    <label for="confirmPassword"><strong>Confirm your new password:</strong></label><br>
                    <input :class="{
                        'inputError': userStatusStore.resetPasswrordCheckApplyColor && errorsStore.errorMsgResetConfirmPassword,
                        'inputCorrect': userStatusStore.resetPasswrordCheckApplyColor && !errorsStore.errorMsgResetConfirmPassword
                    }"
                        :type="confirmPasswordType" id="confirmPassword" name="confirmPassword"
                        placeholder="Confirm password" v-model="userStatusStore.resetConfirmPasswordText">
                    <font-awesome-icon :icon="['fas', 'eye']" class="seePasswordIcon"
                        @click="toggleConfirmPasswordVisibility()" v-if="!showPassword" />
                    <font-awesome-icon :icon="['fas', 'eye-slash']" class="seePasswordIcon"
                        @click="toggleConfirmPasswordVisibility()" v-else />
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgResetConfirmPassword">{{
                        errorsStore.errorMsgResetConfirmPassword }}</p>
                </div>
                <p class="errorMsgStyle" v-if="errorsStore.errorMsgResetPasswordGeneral">{{
                        errorsStore.errorMsgResetPasswordGeneral }}</p>
                <div class="bottom-buttons">
                    <div>
                        <button @click="resetPasswordAction()">Update</button>
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
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import axios from 'axios';

const errorsStore = useErrorsStore();
const utilsStore = useUtilsStore();
const userStatusStore = useUserStatusStore();
const resetPasswordSuccess = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordType = ref('password');
const confirmPasswordType = ref('password');
const route = useRoute();
const router = useRouter();

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    passwordType.value = showPassword.value ? 'text' : 'password';
};

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
    confirmPasswordType.value = showConfirmPassword.value ? 'text' : 'password';
};


async function resetPasswordAction() {
	const response = await userStatusStore.resetPassword();
    if(response){
        resetPasswordSuccess.value = true;
        setTimeout(() => {
            userStatusStore.cleanResetPasswordInput();
            resetPasswordSuccess.value = false;
            userStatusStore.signOut(router);
        }, 1500);
    }else{
        resetPasswordSuccess.value = false;
    }
}

onBeforeRouteLeave((to, from, next) => {
    userStatusStore.resetPasswrordCheckApplyColor = false;
    next();
});

onBeforeMount(() => {
	// SetUp Auth Headers from route.query params!
	if (route.query['access-token']) {
		localStorage.setItem('axios-headers', JSON.stringify({
			'access-token': route.query['access-token'],
			'client':       route.query['client'],
			'expiry':       route.query['expiry'],
			'uid':          route.query['uid'],
		}));
		axios.defaults.headers.common['access-token'] = route.query['access-token'];
		axios.defaults.headers.common['client']       = route.query['client'];
		axios.defaults.headers.common['expiry']       = route.query['expiry'];
		axios.defaults.headers.common['uid']          = route.query['uid'];

		// Once that's done, remove those params
		router.replace({'query': null});
	}
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

.resetPassword {
    position: relative;
}

.bottom-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
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

.resetPasswordSuccess {
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
}</style>