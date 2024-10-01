<template>
  <div class="content">
    <!-- Display user's role and name in the dashboard welcome message -->
    <div v-if="userData" class="d32">
      Welcome to {{ capitalizeFirstLetter(userData.role) }} Dashboard
    </div>
  </div>
  <p class="instruction">Click the icon at top left corner to access the sidebar to view the facilities</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define reactive variables
const userData = ref(null);

// Fetch the user info from localStorage
const fetchUserInfoFromLocalStorage = () => {
  const storedUser = localStorage.getItem('userInfo');
  
  if (storedUser) {
    userData.value = JSON.parse(storedUser);  // Parse userInfo from localStorage
  } else {
    console.error('No user info found in local storage');
  }
};

// Helper function to capitalize the first letter of a word
const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Fetch the user info once the component is mounted
onMounted(() => {
  fetchUserInfoFromLocalStorage();
});
</script>

<style>
.content {
  height: 90vh;
  font-size: 50px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000428, #004e92);
}
.d32 {
  color: white;
}
.instruction {
  align-self: center;
  font-size: 16px;
  color: white;
  text-align: center;
  /* margin-top: 20px; */
}
</style>
