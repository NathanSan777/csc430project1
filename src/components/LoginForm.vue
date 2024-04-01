<template>
    <form @submit.prevent="testRegister" class="p-3 border rounded shadow-sm" style="height: fit-content; width:fit-content">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button @click="register()" type="submit" class="btn btn-primary" :disabled="!isDisabled">Login</button>
    </form>
</template>
  
<script>

import {useAuthStore} from '../stores/authStore'

export default {
data() {
    return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
        async register(){
            try {
                await useAuthStore().register(this.email, this.password);
            } catch(error){
                console.error("Logging in failed: ", error);

            }
        },
        //Testing purposes only. 
        testRegister(){
            console.log(this.email);
            console.log(this.password);
            useAuthStore().isLoggedIn = true;
        }

    },
    computed: {
        isDisabled(){
            return (this.email !== ''  && this.password !== ''); 
        }
    }
}
</script>

<style scoped>

</style>