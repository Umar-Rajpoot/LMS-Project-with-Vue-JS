<template>

  <div class="container">
    <div class="row">
      <!-- Form Section -->
      <h2 class="page-title">Manager / Supervisor Roles</h2>
      <div class="col-lg-5">
        <div class="form-div">
          <h3 class="form-title">Form</h3>
          
          <div class="mb-3 main-div">
            <label for="name" class="form-label-inline">FULL NAME</label>
            <input v-model="newUser.name" type="text" id="name" class="form-control-inline" placeholder="Full Name" required />
          </div>

          <div class="mb-3 main-div">
            <label for="email" class="form-label-inline">EMAIL</label>
            <input v-model="newUser.email" type="email" id="email" class="form-control-inline" placeholder="i.e. abc@gmail.com" required />
          </div>

          <!-- Role Select Dropdown -->
          <div class="mb-3 main-div">
            <label for="role" class="form-label-inline">ROLE</label>
            <select v-model="newUser.role" id="role" class="form-control-inline" required>
              <option value="" disabled>Select option</option>
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          <button @click="submitForm" class="btn btn-primary submit-btn">Submit</button>
        </div>
      </div>

      <!-- User List Section -->
      <div class="col-lg-7">
        <div class="user-list">
          <div class="table-container">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <select v-model="user.role" @change="updateUserRole(user)" class="role-changing">
                      <option value="manager">Manager</option>
                      <option value="supervisor">Supervisor</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newUser = ref({
  name: '',
  email: '',
  role: '',
});

// Load users when the component is mounted
onMounted(() => {
  store.dispatch('fetchUsers');
});

// Filtered users from the store
const filteredUsers = computed(() => store.getters.filteredUsers);

// Function to submit the form
const submitForm = async () => {
  try {
    if (newUser.value.name && newUser.value.email && newUser.value.role) {
      await store.dispatch('addUser', newUser.value);
      newUser.value = { name: '', email: '', role: '' }; // Reset the form
    } else {
      alert('Please fill in all fields');
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Function to update user role
const updateUserRole = async (user) => {
  await store.dispatch('updateUserRole', user);
  alert('Role have been updated.')
};
</script>

<style scoped>
.content{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .row{
    padding-top: 70px;
  }
.form-div {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.role-changing{
  width: 100px;
  height: 35px;
  font-size: 10px;
  font-weight: bold;
}

.page-title, .form-title {
  font-weight: 650;
}
.page-title {
  color: white;
  margin-bottom: 20px;
  text-align: center;
}
.form-title {
  color: #000428;
  margin-top: -20px;
}

.main-div {
  margin-bottom: 20px;
  text-align: left;
}

.form-label-inline {
  font-weight: 600;
  font-size: 13px;
  color: #000428;
  margin-bottom: 5px;
  display: block;
}

.form-control-inline, select {
  height: 40px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.submit-btn {
  color: white;
  background: linear-gradient(to right, #000428, #004e92);
  padding: 9px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}


.user-list {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* height: 100%; */
  font-size: 12px;
}

.table thead th {
  position: sticky; /* Keep the header fixed */
  top: 0;
  background-color: white; /* Set background to match table */
  z-index: 2; /* Ensure header stays above the body */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
}

.table tbody {
  display: block; /* This ensures the tbody scrolls */
  max-height: 300px; /* Same height as the container for proper scroll effect */
  overflow-y: auto; /* Enables scrolling */
}

.table tbody tr {
  display: table;
  table-layout: fixed; 
}

.table thead, .table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}



</style>
<!-- <style scoped>

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.inner-div {
  background:white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.form-title {
  font-size: 28px;
  font-weight: 650;
  color: #000428;
  margin-bottom: 30px;
}
.main-div {
  margin-bottom: 20px;
  text-align: left;
}
.form-label-inline {
  font-size: 16px;
  color: #000428;
  margin-bottom: 5px;
  display: block;
}
.form-control-inline, select {
  height: 40px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.submit-btn {
  color: white;
  background: linear-gradient(to right, #000428, #004e92 );
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}
</style> -->
