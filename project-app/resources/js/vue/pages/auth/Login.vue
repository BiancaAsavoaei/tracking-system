<template>
   <v-container fluid class="fill-height">
     <v-row align="center" justify="center">
       <v-col cols="12" sm="8" md="4">
         <v-card>
           <v-card-title class="justify-center">
             <v-img :src="logo" class="mx-auto"></v-img>
           </v-card-title>
           <v-card>
            <v-tabs v-model="tab" align-tabs="center" color="#2f6d95">
               <v-tab value="login">LOGIN</v-tab>
               <v-tab value="register">REGISTER</v-tab>
            </v-tabs>
           </v-card>
           <v-card-text>
               <v-tabs-window v-model="tab">
                  <v-tabs-window-item value="login">
                        <h3 class="text-center">Sign in with:</h3>
                     <v-row justify="center">
                        <a :href="googleUrl" class="icon-link" target="_blank"><v-img :src="googleIcon"  width="40" height="40"/></a>
                        <a :href="githubUrl" class="icon-link" target="_blank"><v-img :src="githubIcon" width="40" height="40"/></a>
                     </v-row>
                     <h4 class="text-center mt-4">or:</h4>
                     <v-form>
                        <v-text-field
                        prepend-inner-icon="mdi-mdiAccount"
                        v-model="user.email"
                        name="login"
                        placeholder="Email"
                        type="text"
                        ></v-text-field>
                        <v-text-field
                        prepend-inner-icon="mdi-mdiLock"
                        v-model="user.password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        ></v-text-field>
                     </v-form>
         
                     <v-card-actions class="justify-center">
                        <v-btn v-on:click="handleLogin">Sign in</v-btn>
                     </v-card-actions>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="register">
                     <h3 class="text-center">Sign up with:</h3>
                     <v-spacer/>
                     <v-row justify="center">
                        <a :href="googleUrl" class="icon-link" target="_blank"><v-img :src="googleIcon" width="40" height="40"/></a>
                        <a :href="githubUrl" class="icon-link" target="_blank"><v-img :src="githubIcon" width="40" height="40"/></a>
                     </v-row>
                     <h4 class="text-center mt-4">or:</h4>
                     <v-form>
                        <v-text-field
                              prepend-inner-icon="mdi-mdiAccount"
                              v-model="user.email"
                              name="login"
                              placeholder="Email"
                              type="text"
                              ></v-text-field>
                        <v-text-field
                              prepend-inner-icon="mdi-mdiLock"
                              v-model="user.password"
                              name="password"
                              placeholder="Password"
                              type="password"
                              ></v-text-field>
                        <v-text-field
                              prepend-inner-icon="mdi-mdiLock"
                              v-model="user.repeatpassword"
                              name="repeat-password"
                              placeholder="Repead Password"
                              type="password"
                              ></v-text-field>
                        <v-card-actions class="justify-center">
                           <v-btn v-on:click="handleRegister">Sign up </v-btn>
                        </v-card-actions>      
                     </v-form>
                  </v-tabs-window-item>
               </v-tabs-window>
            </v-card-text>   
         </v-card>
       </v-col>
     </v-row>
   </v-container>
 </template>

<script>
import googleIcon from "../../../../assets/google.png";
import githubIcon from "../../../../assets/github.png";
import logo from "../../../../assets/logo-teamtracker.png";
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';

export default {
   name: 'Login',
   data() {
      return {
         errorLogin: false,
         user: {},
         googleIcon,
         githubIcon,
         logo,
         tab: 'login',
         requestErrors: null,
         githubUrl: null,
         googleUrl: null
      }
   },
   mounted() {
      this.githubUrl = 'auth/github/redirect'
      this.googleUrl = 'auth/google/redirect'
   },
   methods: {
     async handleLogin() {
         console.log("login: ")
         console.log(this.user)
         try{

            const loginResponse = await this.$axios.post(this.$apiUrl + 'login', this.user)
            if (loginResponse.data && loginResponse.data.type === 'success') {

               localStorage.setItem('sessionExpire',Date.now()+minutesToMilliseconds(parseInt(sessionExpire) || 720 ))
               localStorage.setItem('logged',true)
               console.log("SUCCESS LOGIN")
            }

            if (loginResponse.data && loginResponse.data.type === 'error') {
            }

         }catch(error){
            this.requestErrors = 'There was an error. Please try again later.';
            console.error(error)
         }
     },
     async handleRegister(){
         console.log("register: ")
         console.log(this.user)
         try{

            const registerResponse = await this.$axios.post(this.$apiUrl + 'register', this.user)
            if (registerResponse.data && registerResponse.data.type === 'success') {

               localStorage.setItem('sessionExpire',Date.now()+minutesToMilliseconds(parseInt(sessionExpire) || 720 ))
               localStorage.setItem('logged',true)
               console.log("SUCCESS REGISER")
            }

            if (loginResponse.data && loginResponse.data.type === 'error') {
            }

            }catch(error){
               this.requestErrors = 'There was an error. Please try again later.';
               console.error(error)
            }
      }
   }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.mx-auto {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.mt-4 {
  margin-top: 16px;
}
.icon-link {
  margin: 2vh; 
}
</style>