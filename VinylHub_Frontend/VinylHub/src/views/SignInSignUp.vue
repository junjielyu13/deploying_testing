<template>
    <div class="signInUpSuccess" v-if="signUpSuccess">
        <h4><strong>
            SIGN UP SUCCESS!
        </strong></h4>
    </div>
    <div class="signInUpSuccess" v-if="signInSuccess">
        <h4><strong>
            SIGN IN SUCCESS!
        </strong></h4>
    </div>
    <div class="signInUpSuccess" v-if="sendConfirmEmailSuccess">
        <h4><strong>
            EMAIL SEND SUCCESS!
        </strong></h4>
    </div>
    <div class="shell" :class="{ 'resizeShell': utilsStore.isCollapsed }">
        <div class="top">
            <span class="off" :style="{opacity: offOpacity}">SIGN IN</span>
            <div class="button" @click="toggleSwitch">
                <div class="ball" :style="{ left: ballLeft }"></div>
            </div>
            <span class="on" :style="{ opacity: onOpacity }">SIGN UP</span>
        </div>
        <div class="bottom" :style="{transform: bottomTransform}">
            <div class="signIn" @keyup.enter="signInAction()">
                <h1 style="margin:  10px;">Sign in</h1>
                <div class="inputDiv">
                    <label  for="loginEmail"><strong>Email:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.logincheckApplyColor && errorsStore.errorMsgLogin, 
                    'inputCorrect': userStatusStore.logincheckApplyColor && !errorsStore.errorMsgLogin}"
                    type="text" id="loginEmail" name="loginEmail" placeholder="Email" v-model="userStatusStore.loginEmail">
                </div>
                <div class="inputDiv">
                    <label  for="loginPassword"><strong>Password:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.logincheckApplyColor && errorsStore.errorMsgLogin, 
                    'inputCorrect': userStatusStore.logincheckApplyColor && !errorsStore.errorMsgLogin}"
                    :type="loginPasswordType" id="loginPassword" name="loginPassword" placeholder="Password" v-model="userStatusStore.loginPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" class="seePasswordIcon" @click="toggleLoginPasswordVisibility()" v-if="!showPassword"/>
                    <font-awesome-icon :icon="['fas', 'eye-slash']"  class="seePasswordIcon" @click="toggleLoginPasswordVisibility()" v-else/>
                </div>
                <div style="margin: 10px 0 0 0;">
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgLogin">{{ errorsStore.errorMsgLogin }}</p>
                </div>
                <div>
                    Forgot password? <router-link class="forgot-password" to="/forgot-password">Click here</router-link>
                </div>
                <button @click="signInAction()">GO</button>
            </div>
            <div class="signUp" @keyup.enter="signUpAction()">
                <h1 style="margin:  10px;">Sign up</h1>
                <div class="inputDiv">
                    <label  for="email"><strong>Email:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.checkApplyColor && errorsStore.errorMsgSignUpEmail, 
                    'inputCorrect': userStatusStore.checkApplyColor && !errorsStore.errorMsgSignUpEmail}"
                     type="text"  id="email" name="email" placeholder="Email" v-model="userStatusStore.signUpEmail">
                     <p class="errorMsgStyle" v-if="errorsStore.errorMsgSignUpEmail">Email {{ errorsStore.errorMsgSignUpEmail }}</p>
                </div>
                <div class="inputDiv">
                    <label  for="password"><strong>Password:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.checkApplyColor && errorsStore.errorMsgSignUpPassword, 
                    'inputCorrect': userStatusStore.checkApplyColor && !errorsStore.errorMsgSignUpPassword}"
                    :type="passwordType" id="password" name="password" placeholder="Password" v-model="userStatusStore.signUpPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" class="seePasswordIcon" @click="togglePasswordVisibility()" v-if="!showPassword"/>
                <font-awesome-icon :icon="['fas', 'eye-slash']"  class="seePasswordIcon" @click="togglePasswordVisibility()" v-else/>
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgSignUpPassword">Password {{ errorsStore.errorMsgSignUpPassword }}</p>
                </div>
                <div class="inputDiv">
                    <label  for="confirmPassword"><strong>Confirm your password:</strong></label><br>
                    <input :class="{ 'inputError': userStatusStore.checkApplyColor && errorsStore.errorMsgSignUpConfirmPassword, 
                    'inputCorrect': userStatusStore.checkApplyColor && !errorsStore.errorMsgSignUpConfirmPassword}"
                    :type="confirmPasswordType" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" v-model="userStatusStore.signUpConfirmPassword">
                    <font-awesome-icon :icon="['fas', 'eye']" class="seePasswordIcon" @click="toggleConfirmPasswordVisibility()" v-if="!showPassword"/>
                <font-awesome-icon :icon="['fas', 'eye-slash']" class="seePasswordIcon" @click="toggleConfirmPasswordVisibility()" v-else/>
                    <p class="errorMsgStyle" v-if="errorsStore.errorMsgSignUpConfirmPassword">Confirm password {{ errorsStore.errorMsgSignUpConfirmPassword }}</p>
                </div>
                <div class="resendEmailText" @click="resendConfirmEmailAction()" title="fill the email before send the confirmation mail">
                   Resend Confirmation Email
                </div>
                <button style="margin: 0 0 30px 0;" @click="signUpAction()">GO</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUtilsStore } from '@/stores/utils.js';
import { useUserStatusStore } from '@/stores/userStatus.js';
import { useErrorsStore } from "@/stores/errors.js";
import { useUserDadesStore } from '@/stores/userDades.js';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
const router = useRouter();
const userDadesStore = useUserDadesStore();
const errorsStore = useErrorsStore();
const utilsStore =  useUtilsStore();
const userStatusStore = useUserStatusStore();
const index = ref(0);
const ballLeft = ref('0%');
const onOpacity = ref(0.5);
const offOpacity = ref(1);
const bottomTransform = ref('rotateY(0)');
const signUpSuccess = ref(false);
const signInSuccess = ref(false);
const sendConfirmEmailSuccess = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordType = ref('password');
const confirmPasswordType = ref('password');
const showLoginPassword = ref(false);
const loginPasswordType = ref('password');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
  passwordType.value = showPassword.value ? 'text' : 'password';
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
  confirmPasswordType.value = showConfirmPassword.value ? 'text' : 'password';
};

const toggleLoginPasswordVisibility = () => {
    showLoginPassword.value = !showLoginPassword.value;
    loginPasswordType.value = showLoginPassword.value ? 'text' : 'password';
};

const toggleSwitch = () => {
  index.value = 1 - index.value; // Toggle between 0 and 1

  if (index.value === 1) {
    ballLeft.value = '61%';
    onOpacity.value = 1;
    offOpacity.value = 0.5;
    bottomTransform.value = 'rotateY(180deg)';
  } else {
    ballLeft.value = '0%';
    onOpacity.value = 0.5;
    offOpacity.value = 1;
    bottomTransform.value = 'rotateY(0)';
  }
};

async function signUpAction(){
    const response = await userStatusStore.signUp();
    if(response){
        if(response.status === 'success'){
            userStatusStore.cleanSignOutInput();
            userStatusStore.checkApplyColor = false;
            toggleSwitch();
            userStatusStore.loginEmail = response.data['email'];
            signUpSuccess.value = true;
            setTimeout(() => {
                signUpSuccess.value = false;
            }, 1500);
        }
    }

}

async function signInAction(){
    const response = await userStatusStore.signIn();
    if(response){
        const responseUserInfo = await userDadesStore.getUserProfileInformations();
        signInSuccess.value = true;
        if(responseUserInfo && responseUserInfo.status == 200){
            userDadesStore.setUserProfileInformations(responseUserInfo);
            setTimeout(() => {
                router.push('/home');
                userStatusStore.cleanSignInInput();
                userStatusStore.isLogged = true;
            }, 2000);
        }
    }else{
        signInSuccess.value = false;
    }

}
async function resendConfirmEmailAction(){
    const response = await userStatusStore.resendConfirmationEmail();
    if(response){
        sendConfirmEmailSuccess.value = true;
        toggleSwitch();
        setTimeout(() => {
            sendConfirmEmailSuccess.value = false;
        }, 1500);
    }else{
        alert("Error on sending Email");
        signUpSuccess.value = false;
    }

}

onBeforeRouteLeave((to, from, next) => {
  userStatusStore.checkApplyColor = false;
  userStatusStore.logincheckApplyColor = false;
  next();
});


</script>

<style scoped>
.shell{
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

.resizeShell{
    left: 10vw;
    transition: left 0.5s;
}


.top{
    width: 30vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
}

.off, .on{
    color: #fff;
    transform: .5s;
    font: 300 28px '';
}

.on{
    opacity: .5;
}
.button{
    width: 60px;
    height: 25px;
    background-color: rgb(255, 235, 167);
    border-radius: 20px;
    position: relative;
    cursor: pointer;
}
.button:hover{
    box-shadow: 0 0 10px rgb(255,235,167);
}

.ball{
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: rgb(46,45,56);
    border-radius: 50px;
    transition: .5s;
    box-shadow: 0 0 10px #000;
    left: 0;
    transform: translate(-1px);
}
.bottom{
    width: 100%;
    height: 70vh;
    transform-style: preserve-3d;
    position: relative;
    transition: .7s;
    border-radius: 10px;
    background-image: linear-gradient(147deg, #4d4855 0%, #000000 90%);
}
.bottom>div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.bottom>div h1{
    color: #fff;
}

input{
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


.bottom>div button{
    width: 80px;
    height: 30px;
    color: #333;
    font-size: 15px;
    background-color: rgb(255,235,167);
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
}

.bottom>div button:hover{
    box-shadow: 0 0 10px rgb(255,235,167);
}

.signIn{
    transform: translateZ(70px);
}

.signUp{
    position: absolute;
    top: 0;
    transform: translateZ(-70px) rotateY(180deg);
}

label{
    width: 300px;
    height: 30px;
    padding: 0 5px;
}
.inputError{
    border-color: #de4437;
    background-image: url('../css/bootstrap-icons-1.11.1/exclamation-circle.svg');
}

.inputError:focus{
    outline: 1px solid #de4437;
}

.inputCorrect{
    border-color: #37c625;
    background-image: url('../css/bootstrap-icons-1.11.1/check-lg.svg');
}

.inputCorrect:focus{
    outline: 1px solid #37c625;
}

.signInUpSuccess{
    position: absolute;
    opacity: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
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
  50%{
    top: 5%;
    opacity: 1;
    color: #06d47b;
  }
  100%{
    opacity: 1;
    top: 5%;
    color: #06d47b;
  }
}

@keyframes smoke {
  0%{
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

.errorMsgStyle{
    color: red;
    margin-bottom: -10px;
    font-size: 12px;
    padding: 0 5px;
}
.seePasswordIcon{
    height: 15px;
    width: 15px;
    cursor: pointer;
    margin: 0 15px 2px 15px;
}

.inputDiv{
    width: 350px; 
    margin-left: 50px;
}

.forgot-password{
    color: white;
}

.forgot-password:hover{
    background-color: transparent;
    color: #06d47b;
    text-decoration: underline;
}

.resendEmailText{
    font-size: 10px; 
    margin: 30px 0 0 0;
    cursor: pointer;
}

.resendEmailText:hover{
    background-color: transparent;
    color: #06d47b;
    text-decoration: underline;
}
</style>