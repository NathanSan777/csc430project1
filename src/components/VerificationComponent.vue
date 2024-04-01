<template>
    <div class="container">
      <div class="form-group">
        <h6>Please enter the code we sent you.</h6>
        <br>
        <label for="phoneNumber">Code:</label>
        <input type="number" id="codeNumber" v-model="codeNumber" class="form-control" placeholder="Enter code" style="width: fit-content; margin: auto">
      </div>
      <br>
      <button @click="submitCode" class="btn btn-primary">Submit</button>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        codeNumber: '',
      };
    },
    methods: {
        submitCode(){
            alert("Error: incorrect code. Please try again.");
            this.codeNumber = '';
        }
    }
  };
  </script>

<style scoped>
.container{
  border: black;
  border-radius: 10px;
}

</style>