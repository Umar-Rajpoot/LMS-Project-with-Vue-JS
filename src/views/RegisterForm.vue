<template>
  <div class="main-container">
    <div class="container-fluid c2">
      <h2 class="text-center header">REGISTRATION</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3 main-div">
          <label for="firstName" class="form-label-inline fl2">FIRST NAME</label>
          <input type="text" v-model="firstName" class="form-control-inline fc2" placeholder="First Name" required />
        </div>
        <div class="mb-3 main-div">
          <label for="lastName" class="form-label-inline fl2">LAST NAME</label>
          <input type="text" v-model="lastName" class="form-control-inline fc2" placeholder="Last Name" required />
        </div>
        <div class="mb-3 main-div">
          <label for="email" class="form-label-inline fl2">EMAIL</label>
          <input type="email" v-model="email" class="form-control-inline fc2" placeholder="i.e. abc@gmail.com" required />
        </div>
        <div class="mb-3 main-div">
          <label for="password" class="form-label-inline fl2">PHONE NO.</label>
          <input type="text" v-model="password" class="form-control-inline fc2" placeholder="0312-3456789" required />
        </div>
        <div class="mb-3 main-div">
          <label for="cv" class="form-label fl2">CV (PDF Only)</label>
          <input type="file" id="cv" class="form-control fc2" @change="handleFileUpload" accept=".pdf" required />
        </div>
        
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
      <p class="mt-3 text-center">Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/api';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const cvFile = ref(null);

const router = useRouter();

// Handle file upload for the CV
const handleFileUpload = (event) => {
  cvFile.value = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();

  // Join firstName and lastName into a single 'name' field
  formData.append('name', `${firstName.value} ${lastName.value}`);
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('cv', cvFile.value); // Add CV file to the form data

  try {
    // Make an axios POST request to the provided API
    const response = await apiClient.post('/submissions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle successful response
    alert('Registration successful!');
    console.log(response.data);

    // Redirect to the login page after successful registration
    router.push('/login');
  } catch (error) {
    // Handle errors (e.g., validation errors, server issues)
    if (error.response) {
      alert(error.response.data.message || 'Registration failed');
    } else {
      alert('An error occurred. Please try again.');
    }
  }
};
</script>


<style scoped>
.main-container {
  background: linear-gradient(to right, #000428, #004e92);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c2 {
  background-color: white;
  max-width: 450px;
  border-radius: 20px;
  padding: 20px 30px;
}
.header {
  font-weight: bolder;
}
.main-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.form-label-inline, .fl2 {
  font-size: 13px;
  flex-shrink: 0;
  min-width: 100px;
  font-weight: 500;
}

.form-control-inline {
  flex-grow: 1;
  height: 35px;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  padding-left: 10px;
}
@media (max-width: 600px) {
  .mb-3 {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-label-inline, .fl2 {
    width: 100%;
    margin-bottom: 5px;
  }

  .form-control-inline {
    width: 100%;
  }
  .c2 {
    max-width: 400px;
  }
}

.form-control-inline::placeholder{
  color: #bababa;
  font-size: 12px;
  font-style: italic;
}
.form-control-inline:focus {
  outline: none;
  border: 1px solid #5996db;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
}
.btn-primary {
  background: linear-gradient(to right, #000428, #004e92);
  color: white;
  font-weight: bold;
  border: none;
}
.btn-primary:hover, .btn-primary:active {
  background-color: brown;
  color: white;
}
</style>
