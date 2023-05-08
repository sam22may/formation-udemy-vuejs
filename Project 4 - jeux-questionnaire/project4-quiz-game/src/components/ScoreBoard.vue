<template>
	<div>
		<h2>Points</h2>
		<div class="scoreboard">
			<div class="text green">Score</div>
			<div class="score green">
				<div>{{ score }}</div>
			</div>
			<div class="divider"></div>
			<div class="score red">
				<div>{{ fail }}</div>
			</div>
			<div class="text red">Fail</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScoreBoard',
	props: ['score', 'fail']
}
</script>
<style lang="scss">
h2 {
	margin-left: 16px;
	margin-bottom: 4px;
}
.text {
	padding: 5px;
}

.red {
	color: red;
	border-color: red;
}

.green {
	color: rgb(0, 185, 0);
	border-color: rgb(0, 185, 0);
}

.scoreboard {
	display: flex;
	width: max-content;
	text-align: left;
	//justify-content: center;
	margin: 0 auto;
	//width: 300px;
}
.divider {
	margin: 0 40px;
	height: 40px;
	width: 1px;
	background-color: black;
}

.score {
	font-weight: bold;
	div {
		border: 1px solid;
		padding: 5px 10px;
	}
	&:first-child {
		margin-right: 5px;
	}
}
</style>
