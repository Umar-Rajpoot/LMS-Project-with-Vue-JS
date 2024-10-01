<template>
  <div class="main-containr">
    <div class="container c1">
      <h2 class="text-center header">LOGIN</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">EMAIL</label>
          <input type="email" v-model="email" class="form-control" placeholder="i.e. test@gmail.com" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">PASSWORD</label>
          <input type="password" v-model="password" class="form-control" placeholder="*******" required />
        </div>
        <button type="submit" class="btn btn-primry w-100">Login</button>
      </form>
      <p class="mt-3 text-center">Don't have an account? <router-link to="/form">Register</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/api';

const email = ref('');
const password = ref('');
const router = useRouter();





const login = async () => {
  try {
    // Call the Laravel API with the email and password
    const response = await apiClient.post('/login', {
      email: email.value,
      password: password.value,
    });

    // Extract data from the API response
    const data = response.data.data;
    const role = data.role;
    const token = data.token;

    // Create an object to store in localStorage based on role
    const userInfo = {
      name: data.name,
      email: data.email,
      role: data.role,
      permissions: data.permissions,
      token: token,
      token_type: data.token_type,
    };

    localStorage.setItem('token', token);  // Storing token
    localStorage.setItem('userInfo', JSON.stringify(userInfo));  // Store user info

    // Redirect to the appropriate dashboard based on the role
    if (role === 'admin' || role === 'manager' || role === 'supervisor' || role === 'student') {
      router.push('/dashboard');  // Redirect to dashboard
    }

    alert('Login successful!');
  } catch (error) {
    // Handle errors (e.g., incorrect email/password, server issues)
    if (error.response) {
      alert(error.response.data.message || 'Invalid email or password');
    } else {
      alert('An error occurred. Please try again.');
    }
  }
};
</script>

<style scoped>
.main-containr {
  background: linear-gradient(to right, #000428, #004e92);
  height: 100vh;
  display: flex;
  align-items: center;
}

.c1 {
  background-color: white;
  max-width: 400px;
  border-radius: 20px;
  padding: 30px;
}

.header {
  font-weight: bolder;
  color: #030d59;
}

.form-label, .form-control::placeholder {
  font-size: 12px;
  font-weight: 500;
}

.form-control::placeholder{
  color: #bababa;
  font-style: italic;
}

.btn-primry {
  background: linear-gradient(to right, #000428, #004e92);
  color: white;
  font-weight: bold;
  border: none;
}

.btn-primry:hover, .btn-primry:active {
  color: white;
}
</style>
