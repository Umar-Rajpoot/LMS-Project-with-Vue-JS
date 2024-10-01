<template> 
  <div class="content">
    <h2 class="page-title">Student Requests</h2>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search by name..." class="search-input"/>
      <select v-model="selectedStatus" class="filter-dropdown">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <div class="student-list">
      <table class="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>View CV</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.status }}</td>
            <td>
              <button 
                v-if="student.status === 'pending'" 
                @click="updateStatus(student, 'accepted')" 
                class="accept-btn"
              >
                Accept
              </button>
              <button 
                v-if="student.status === 'pending'" 
                @click="updateStatus(student, 'rejected')" 
                class="reject-btn"
              >
                Reject
              </button>
            </td>
            <td>
              <button @click="viewCV(student.cv_path)" class="view-cv-btn">View CV</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
      selectedStatus: 'all',
      students: [],
    };
  },
  computed: {
    ...mapState(['users']),
    filteredStudents() {
      let filteredList = this.students;

      if (this.selectedStatus !== 'all') {
        filteredList = filteredList.filter(student => student.status === this.selectedStatus);
      }

      if (this.searchQuery) {
        filteredList = filteredList.filter(student =>
          student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filteredList;
    },
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/students`);
        this.students = response.data.data; // Assign fetched students data
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async updateStatus(student, newStatus) {
      try {
        const updatedStudent = { ...student, status: newStatus };
        await axios.put(`${process.env.VUE_APP_API_BASE_URL}/students/${student.id}`, updatedStudent);
        // Refresh the student list after updating status
        this.fetchStudents();
      } catch (error) {
        console.error('Error updating student status:', error);
      }
    },
    viewCV(cvPath) {
      const fullPath = `${process.env.VUE_APP_API_BASE_URL}/${cvPath}`;
      window.open(fullPath, '_blank');
    }
  },
  created() {
    this.fetchStudents(); // Fetch students from the backend on component creation
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  /* background-color: white; */
}
.page-title{
  /* padding: 10px 0px 10px 0px; */
  color: white;
  padding-bottom: 10px;
  /* margin-bottom: 50px; */
}

.search-bar {
  /* margin-top: 50px; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.search-input {
  padding: 10px;
  width: 70%;
  border-radius: 4px;
  font-size: 16px;
  height: 30px;
  border: 1px solid #ccc;
}
.filter-dropdown {
  /* padding: 10px; */
  width: 25%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px
}
.student-list{
  background-color: white;
  height: 300px;
  overflow-y: auto;
}
.student-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  font-size: 14px;
  /* height: 200px; */
}

.student-table th, 
.student-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.student-table td{
  font-weight: 500;
}
.accept-btn {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.reject-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.view-cv-btn {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>