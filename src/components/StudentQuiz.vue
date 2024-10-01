<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-5 quiz-creation">
        <h3>Create The Quiz</h3>
        <!-- Quiz Name Input -->
        <div class="form-group mb-3">
          <!-- <label for="quizName">Quiz Name</label> -->
          <input type="text" class="form-control" id="quizName" v-model="quizName" placeholder="Enter Quiz Name">
        </div>
        <!-- Render Questions -->
        <div v-for="(question, index) in quiz.questions" :key="index" class="mb-4">
          <h5>Question {{ index + 1 }}</h5>
          <div class="form-group question-input">
            <input type="text" class="form-control" v-model="question.text" placeholder="Enter your question">
          </div>
          <div class="form-group question-option1">
            <input type="text" class="form-control" v-model="question.optionA" placeholder="Option A">
          </div>
          <div class="form-group question-option2">
            <input type="text" class="form-control" v-model="question.optionB" placeholder="Option B">
          </div>
          <div class="form-group question-option3">
            <input type="text" class="form-control" v-model="question.optionC" placeholder="Option C">
          </div>
          <div class="form-group question-option4">
            <input type="text" class="form-control" v-model="question.optionD" placeholder="Option D">
          </div>
          <div class="form-group correctAnswer">
            <label for="correctAnswer">Correct Option</label>
            <select class="form-control" v-model="question.correctOption">
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>
        </div>
        <div class="buttons">
          <button class="btn btn-success" @click="addQuestion">+ Add Question</button>
          <button class="btn btn-danger mt-3" @click="createQuiz">Create Quiz</button>
        </div>
      </div>

      <div class="col-md-6 quiz-list">
        <h3>Available Quizzes for Students</h3>
        <ul class="list-group">
          <li v-for="(quiz, index) in quizzes" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ quiz.name || 'Unnamed Quiz' }}
            <div>
              <button class="btn btn-info btn-sm" @click="viewQuiz(quiz)">View</button>
              <button class="btn btn-warning btn-sm" @click="editQuiz(quiz)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteQuiz(quiz.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modal for Viewing Quiz -->
      <div v-if="showModal" class="modal fade show" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">View Quiz</h5>
              <button type="button" class="close" @click="closeModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>{{ currentQuiz.name }}</h4>
              <div v-for="(question, index) in currentQuiz.questions" :key="index">
                <p><strong>Q{{ index + 1 }}: {{ question.text }}</strong></p>
                <ul>
                  <li>A: {{ question.optionA }}</li>
                  <li>B: {{ question.optionB }}</li>
                  <li>C: {{ question.optionC }}</li>
                  <li>D: {{ question.optionD }}</li>
                </ul>
                <p>Correct Answer: {{ question.correctOption }}</p>
                <hr>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      quizName: '',
      quiz: {
        name: '',
        questions: [
          { text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }
        ]
      },
      currentQuiz: {}, 
      showModal: false  
    };
  },
  computed: {
    ...mapState({
      quizzes: state => state.quizzes.quizzes
    })
  },
  methods: {
    ...mapActions(['fetchQuizzes', 'addQuiz', 'deleteQuiz', 'updateQuiz']),
    addQuestion() {
      this.quiz.questions.push({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' });
    },
    createQuiz() {
      const newQuiz = {
        id: Date.now(),
        name: this.quizName,
        questions: this.quiz.questions
      };
      this.addQuiz(newQuiz)
        .then(() => {
          this.fetchQuizzes(); 
          this.resetForm(); 
        });
    },
    viewQuiz(quiz) {  
      this.currentQuiz = quiz; 
      this.showModal = true; 
    },
    closeModal() {
      this.showModal = false; 
      this.currentQuiz = {};
    },
    resetForm() {
      this.quizName = '';
      this.quiz.questions = [
        { text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }
      ];
    }
  },
  mounted() {
    this.fetchQuizzes();
  }
};
</script>

<style scoped>
.content{
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  max-width: 1200px;
}
.quiz-creation{
  background-color: white;
  padding: 20px 30px;
  border-radius: 20px;
}
.row{
  padding-top: 30px;
  column-gap: 50px;
}
.mb-4 h5{
  margin-top: -8px;
  text-align: center;
}
.question-option1{
  margin: 10px 20px 2px 20px;
}
.question-option2, .question-option3, .question-option4{
  margin: 0 20px 2px 20px;
}
.question-option4{
  margin-bottom: 2px;
}
.correctAnswer{
  margin: 0px 80px -15px 80px;
}
.quiz-creation h3, .quiz-list h3{
  font-weight: bolder;
  text-align: center;
}
.quiz-list h3{
  color: white;
}
.buttons{
  /* background-color: aqua; */
  margin-top: -20px;
  margin-bottom: -15px;
  /* display: inline-block; */
  text-align:end;
}
.btn-success, .btn-danger {
  font-size: 12px;
  font-weight: bold;
}
.btn-success{
  padding: 2px 5px;
  margin-right: 20px;
}
.btn-danger {
  padding: 2px 10px;
  position: relative;
  bottom: 8px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 1050;
}
.modal-body ul {
  list-style-type: none;
  padding-left: 0;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
}

</style>