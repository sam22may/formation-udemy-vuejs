<template>
	<div>
		<h2 v-if="!question">Loading...</h2>

		<form v-if="this.answers" onsubmit="event.preventDefault()">
			<ScoreBoard :score="correct_score" :fail="wrong_score" />
			<hr />
			<h1 v-html="question.question"></h1>

			<div v-for="(answer, index) in this.answers" :key="index">
				<input
					type="radio"
					name="options"
					:id="answer"
					:value="answer"
					v-model="chosen_answer"
					:disabled="answerSubmitted" />
				<label :for="answer" v-html="answer"></label>
				<br />
			</div>
			<br />
			<button type="submit" class="send" @click="($event) => submitAnswer()" :disabled="answerSubmitted">Send</button>

			<div v-if="answerSubmitted">
				<button @click="($event) => getNextQuestion()">Next Question</button>
				<h3 v-if="chosen_answer === correct_answer">&#x2713; Correct!</h3>
				<h3 v-else>&#10060; Wrong! " {{ correct_answer }} " was the correct answer.</h3>
			</div>
		</form>

		<div>
			<button class="btn-restart" @click="($event) => restartGame()">Restart game</button>
		</div>
	</div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'

export default {
	name: 'App',
	components: {
		ScoreBoard
	},

	data() {
		return {
			question: undefined,
			incorrect_answers: undefined,
			correct_answer: undefined,
			chosen_answer: undefined,
			answerSubmitted: false,
			correct_score: 0,
			wrong_score: 0
		}
	},

	computed: {
		answers() {
			if (!this.incorrect_answers) return
			if (!this.correct_answer) return
			let allAnswers = []
			allAnswers.push(this.correct_answer)
			this.incorrect_answers.map((answer) => {
				allAnswers.push(answer)
			})
			allAnswers.sort(() => Math.random() - 0.5)
			console.log('aa', allAnswers)
			return allAnswers
		}
	},

	methods: {
		submitAnswer() {
			if (!this.chosen_answer) {
				alert('Please choose an answer')
				return
			}
			this.answerSubmitted = true
			if (this.chosen_answer === this.correct_answer) {
				this.correct_score++
				localStorage.setItem('correct_score', this.correct_score)
			} else {
				this.wrong_score++
				localStorage.setItem('wrong_score', this.wrong_score)
			}
		},

		restartGame() {
			localStorage.setItem('correct_score', 0)
			localStorage.setItem('wrong_score', 0)
			window.location.reload()
		},

		getNextQuestion() {
			this.question = undefined
			this.incorrect_answers = undefined
			this.correct_answer = undefined

			this.axios.get('https://opentdb.com/api.php?amount=1&category=30').then((response) => {
				this.question = response.data.results[0]
				this.incorrect_answers = response.data.results[0].incorrect_answers
				this.correct_answer = response.data.results[0].correct_answer
				this.chosen_answer = undefined
				this.answerSubmitted = false
				console.log(response.data.results[0])
			})
		}
	},

	created() {
		this.axios.get('https://opentdb.com/api.php?amount=1&category=30').then((response) => {
			this.question = response.data.results[0]
			this.incorrect_answers = response.data.results[0].incorrect_answers
			this.correct_answer = response.data.results[0].correct_answer
			console.log(response.data.results[0])
		})

		this.correct_score = localStorage.getItem('correct_score') ? localStorage.getItem('correct_score') : 0
		this.wrong_score = localStorage.getItem('wrong_score') ? localStorage.getItem('wrong_score') : 0
	}
}

// https://opentdb.com/api.php?amount=1&category=30
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0 auto;
	margin-top: 60px;
	max-width: 960px;

	input[type='radio'] {
		margin: 12px 4px;
	}
	button.send {
		margin-top: 12px;
		height: 40px;
		min-width: 120px;
		padding: 0 16px;
		color: white;
		background-color: #0a75f0;
		border: none;
		cursor: pointer;
	}
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.btn-restart {
	margin-top: 12px;
	height: 40px;
	min-width: 120px;
	padding: 0 16px;
	color: white;
	background-color: #7a0707;
	border: none;
	cursor: pointer;
}
</style>
