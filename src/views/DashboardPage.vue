<template>
  <div class="dashboard">
    
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <!-- Display dynamic role in the navbar-brand -->
        <a class="navbar-brand">{{ capitalizeFirstLetter(role) }} Dashboard</a>
        <button type="logout" class="logout-button" @click="logout">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <i class="fa-solid fa-bars navbar-icon"></i>
        </button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">{{ capitalizeFirstLetter(role) }} Panel</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
      
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard">Welcome Page</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/addmanager">Add Manager</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/showmanager">Remove Manager</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/studentrequest">Student Requests</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/showstudent">Student List</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/studentquiz">Student Quizzes</router-link></li>

              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/myquiz">View Quizzes</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/attemptedquiz">Attempted Quizzes</router-link></li>
              <li class="nav-item dropdown"><router-link class="dropdown-item" to="/dashboard/quizresult">Quiz Result</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const role = ref('');

// Function to get user data from localStorage
const getUserRole = () => {
  // Fetch 'userInfo' from localStorage, which holds the user's role and details
  const storedUser = localStorage.getItem('userInfo');
  
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    role.value = parsedUser.role; // Extract and assign the role
  } else {
    console.error('No user data found in localStorage');
    // Redirect to login if no user data is found
    router.push('/login');
  }
};

// Logout function
const logout = () => {
  // Clear all stored user data
  localStorage.clear();
  // Redirect to login page
  router.push('/login');
};

// Capitalize the first letter of the role
const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Fetch the user role when the component is mounted
onMounted(() => {
  getUserRole();
});
</script>

<style>
  .dashboard {
    height: 100%;
    width: 100%;
    /* padding-bottom: 32px; */
    padding-bottom: 55px;
  }
  .logout-button {
    color: #000428;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #000428;
    margin-right: 10px;
  }
  .logout-button:hover {
    color: white;
    background-color: #000428;
  }
  .navbar-brand {
    margin-left: 40px;
  }
  .navbar-toggler {
    height: 30px;
    width: 30px;
    position: absolute;
    margin-left: 10px;
    border: 2px solid #000428;
  }
  .navbar-icon {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    left: 20%;
    bottom: 12%;
    color: #000428;
  }
  .nav-item {
    margin-top: 15px;
    border-bottom: 1px solid #000428;
    text-align: center;
    transition: transform 0.1s linear;
  }
  .nav-item:hover {
    transform: translateY(-3px);
  }
  .offcanvas-header {
    background-color: rgba(180, 180, 180, 0.2);
    height: 55px;
  }
  .navbar-brand {
    font-weight: bold;
    padding-left: 20px;
  }
</style>
