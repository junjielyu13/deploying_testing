import { defineStore } from "pinia";
export const useErrorsStore = defineStore("errors", {
  // State ==> equivalent a variables
  state: () => ({
    errorMsgLogin: "",
    errorMsgSignUpEmail: "",
    errorMsgSignUpPassword: "",
    errorMsgSignUpConfirmPassword: "",
    errorMsgForgotPassword: "",
    errorMsgResetPassword: "",
    errorMsgResetConfirmPassword: "",
    errorMsgResetPasswordGeneral: "",
  }),
  getters: {},
  // actions ==> equivalent a funcions
  actions: {
    cleanSignUpErrors(){
        this.errorMsgSignUpEmail = "";
        this.errorMsgSignUpPassword = "";
        this.errorMsgSignUpConfirmPassword = "";
    },
    cleanSignInErrors(){
        this.errorMsgLogin = "";
    },
    cleanForgotPasswordErrors(){
      this.errorMsgForgotPassword = "";
    },
    cleanResetPasswordErrors(){
      this.errorMsgResetPassword = "";
      this.errorMsgResetConfirmPassword = "";
      this.errorMsgResetPasswordGeneral = "";
    }
  },
});
