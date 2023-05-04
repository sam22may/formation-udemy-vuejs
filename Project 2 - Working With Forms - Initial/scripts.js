members = [
	{
		fname: 'John',
		lname: 'Lennon',
		instrument: 'Acoustic Guitar'
	},
	{
		fname: 'George',
		lname: 'Harrison',
		instrument: 'Electric Guitar'
	}
]

const handlingForms = {
	data() {
		return {
			members: window.members,
			newMember: {}
		}
	},
	methods: {
		addMember() {
			if (
				this.newMember.fname == undefined ||
				this.newMember.lname == undefined ||
				this.newMember.instrument == undefined
			) {
				alert('Please fill out all fields')
				return
			}
			this.members.push(this.newMember)
			this.newMember = {}
		}
	}
}

Vue.createApp(handlingForms).mount('#app')
