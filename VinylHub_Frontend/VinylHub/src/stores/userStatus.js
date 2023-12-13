import { defineStore } from "pinia";
import axios from "axios";
import { useErrorsStore } from "@/stores/errors.js";
import { useUserDadesStore } from "@/stores/userDades.js";
import { useMusicControlsStore } from "@/stores/musicControls.js";
import { useMusicDadesStore } from "@/stores/musicDades.js";
export const useUserStatusStore = defineStore("userStatus", {
    // State ==> equivalent a variables
    state: () => ({
        isLogged: false,
        loginEmail: "1@example.com",
        loginPassword: "123456",
        signUpEmail: "1@example.com",
        signUpPassword: "123456",
        signUpConfirmPassword: "123456",
        resetPasswordText: "",
        resetConfirmPasswordText: "",
        checkApplyColor: false,
        logincheckApplyColor: false,
        forgotPasswordCheckApplyColor: false,
        resetPasswrordCheckApplyColor: false,
        headers: {
            'access-token': "",
            'client': "",
            'expiry': "",
            'uid': "",
            'token-type': "",
        }
    }),
    getters: {},
    // actions ==> equivalent a funcions
    actions: {
        cleanSignInInput() {
            this.loginEmail = "";
            this.loginPassword = "";
        },
        cleanSignOutInput() {
            this.signUpEmail = "";
            this.signUpPassword = "";
            this.signUpConfirmPassword = "";
        },
        cleanResetPasswordInput(){
            this.resetPasswordText = "";
            this.resetConfirmPasswordText = "";
        },
        GoTologinView(router) {
            router.push("/login-register");
        },
        async signOut(router) {
            const url = "/auth/sign_out";
            const userDadesStore = useUserDadesStore();
            const musicControlsStore = useMusicControlsStore();
            const musicDadesStore = useMusicDadesStore();
            try {
                const response = await axios.delete(url);
                this.isLogged = false;
                userDadesStore.cleanUserInformation();
                musicControlsStore.resetAllControlVariables();
                musicDadesStore.resetCurrentPlaylists();
                musicDadesStore.resetCurrentSong();
                localStorage.removeItem('axios-headers');
                router.replace("/home");
                return response;
            } catch (error) {
                console.error(error)
            }
        },
        async signUp() {
            const errorsStore = useErrorsStore();
            const url = "/auth";
            const data = {
                email: this.signUpEmail,
                password: this.signUpPassword,
                password_confirmation: this.signUpConfirmPassword,
            };
            try {
                const response = await axios.post(url, data);
                errorsStore.cleanSignUpErrors();
                return response.data;
            } catch (error) {
                if (error.response) {
                    errorsStore.cleanSignUpErrors();
                    if (error.response.data.errors["email"]) {
                        errorsStore.errorMsgSignUpEmail =
                            error.response.data.errors["email"][0];
                    }
                    if (error.response.data.errors["password"]) {
                        errorsStore.errorMsgSignUpPassword =
                            error.response.data.errors["password"][0];
                    }
                    if (error.response.data.errors["password_confirmation"]) {
                        errorsStore.errorMsgSignUpConfirmPassword =
                            error.response.data.errors["password_confirmation"][0];
                    }
                }
            } finally {
                this.checkApplyColor = true;
            }
        },

        async signIn() {
            const errorsStore = useErrorsStore();
            const url = "/auth/sign_in";
            const data = {
                email: this.loginEmail,
                password: this.loginPassword
            };
            try {
                const response = await axios.post(url, data);
                errorsStore.cleanSignInErrors();
                return response;
            } catch (error) {
                if (error.response) {
                    errorsStore.cleanSignInErrors();
                    if (error.response.data.errors) {
                        errorsStore.errorMsgLogin = error.response.data.errors[0];
                    }
                }
            } finally {
                this.logincheckApplyColor = true;
            }
        },
        async deleteAccount(){
            const url = "/auth";
            try {
                const response = await axios.delete(url);
                return response;
            } catch (error) {
                console.error(error)
            }
        },
        async resendConfirmationEmail(){
            const url = "/auth/confirmation";
            const data = {
                email: this.signUpEmail
            }
            try {
                const response = await axios.post(url,data);
                return response;
            } catch (error) {
                console.error(error)
            }
        },
		async sendResetPasswordEmail(resetPasswordEmail){
            const errorsStore = useErrorsStore();
			const url = "/auth/password";
            const data = {
                email: resetPasswordEmail,
				redirect_url: window.location.origin + '/reset-password'
            }
            try {
                const response = await axios.post(url, data);
                errorsStore.cleanForgotPasswordErrors();
                return response;
            } catch (error) {
                errorsStore.cleanForgotPasswordErrors();
                if(error.response.request.status === 404){
                    errorsStore.errorMsgForgotPassword = "Email Not Found";
                }else{
                    errorsStore.errorMsgForgotPassword = "Error on sending Email";
                }
            }
            finally{
                this.forgotPasswordCheckApplyColor = true;
            }
		},
		async resetPassword(){
            const errorsStore = useErrorsStore();
			const url = "/auth/password";
            const data = {
                password: this.resetPasswordText,
				password_confirmation: this.resetConfirmPasswordText,
            }
            try {
                const response = await axios.put(url, data);
                errorsStore.cleanResetPasswordErrors();
                return response;
            } catch (error) {
                errorsStore.cleanResetPasswordErrors();
                if(error.response.status === 401){
                    errorsStore.errorMsgResetPasswordGeneral = error.response.statusText
                }
                console.error(error)
            }
            finally{
                this.resetPasswrordCheckApplyColor = true;
            }
		}
    },
});
