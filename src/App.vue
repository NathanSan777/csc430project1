<template>

  <template v-if="displayLogin">
    <h1>Bank of Something</h1>
    <br>
    <div class="form-layout">
      <LoginForm></LoginForm>
    </div>
  </template>

  <template v-else>
    <PhoneForm></PhoneForm>
  </template>

</template>

<script>
import { computed } from 'vue';
import LoginForm from './components/LoginForm.vue'
import PhoneForm from './components/PhoneForm.vue'
import { useAuthStore } from './stores/authStore'

export default {
  name: 'App',
  components: {
    LoginForm,
    PhoneForm,
  },
  setup(){
    const authStore = useAuthStore();
    const displayLogin = computed(() => !authStore.isLoggedIn);
    return { 
      authStore, 
      displayLogin,
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form-layout{
  margin:auto;
  display: flex;
  justify-content: center;
}
</style>
