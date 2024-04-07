<template>
    <div class="container">
      <h1>For your safety, we've sent you a code for 2-factor authentication</h1>
      <div class="form-group">
        <h6>Please enter your phone number. We'll send you a code via text.</h6>
        <br>
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" v-model="phoneNumber" class="form-control" placeholder="Enter phone number" style="width: fit-content; margin: auto">
      </div>
      <br>
      <button @click="submitPhoneNumber" class="btn btn-primary" :disabled="!isValidPhoneNumber">Submit</button>
    </div>
    <br>
    <br>
    <div v-if="displayVerification"> 
      <VerificationComponent></VerificationComponent>
    </div>
  </template>
  
<script>
import { useAuthStore } from '@/stores/authStore';
import  VerificationComponent from '../components/VerificationComponent.vue'

  export default {
    data() {
      return {
        phoneNumber: '',
        displayVerification: false
      };
    },
    components: {
      VerificationComponent
    },
    methods: {
      submitPhoneNumber() {
        if (this.isValidPhoneNumber) {
          console.log(this.phoneNumber);
          useAuthStore().phoneNumber = this.phoneNumber;
          useAuthStore().addPhoneNumberToFirestore(this.phoneNumber);
          this.displayVerification = true;
        } 
      } 
    },
    computed:{
      isValidPhoneNumber() {
        //Regex expression to match the format of a phone number
        return /^\d{10}$/.test(this.phoneNumber);
      },
    }
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  