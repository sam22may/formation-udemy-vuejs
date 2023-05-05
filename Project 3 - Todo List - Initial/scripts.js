toDoList = []

function compareComplexObjArrays(actualList, savedList) {
	const processList = (list) => {
		return list.map((item) => {
			return {
				done: item.done,
				toDo: item.toDo
			}
		})
	}
	const arr1 = processList(actualList)
	if (arr1.length !== savedList.length) {
		return false
	}
	for (let i = 0; i < arr1.length; i++) {
		for (let prop in arr1[i]) {
			if (arr1[i][prop] !== savedList[i][prop]) {
				return false
			}
		}
	}
	return true
}

const handlingForms = {
	data() {
		return {
			toDoList: toDoList,
			newToDo: {
				toDo: null,
				done: false
			}
		}
	},
	methods: {
		addToDo() {
			console.log(this.newToDo)
			if (!!!this.newToDo || !!!this.newToDo.toDo) return
			console.log('Asdf')
			this.toDoList.push(this.newToDo)
			console.log('after', this.toDoList)
			this.newToDo = {}
		},
		clearToDo() {
			this.toDoList = []
		},
		save() {
			console.log('save')
			if (this.sameList()) return
			localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
		},
		load() {
			console.log('load')
			this.toDoList = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : this.toDoList
		},
		sameList() {
			//if (this.toDoList.length === 0) return true

			const savedList = JSON.parse(localStorage.getItem('toDoList'))

			console.log('savedList', savedList)

			if (!!!savedList) return false

			return compareComplexObjArrays(this.toDoList, savedList)
		}
	},
	beforeCreate() {
		console.log('beforeCreate')
	},
	created() {
		console.log('created')
		this.load()
	},
	updated() {
		console.log('updated')
		//this.save()
	}
}

Vue.createApp(handlingForms).mount('#app')
