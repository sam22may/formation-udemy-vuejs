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
			//console.log('this.newToDo', !!!this.newToDo)
			console.log('this.newToDo.toDo', this.newToDo.toDo)
			if (!!!this.newToDo || !!!this.newToDo.toDo) return
			console.log('ucu')
			this.toDoList.push(this.newToDo)
			this.newToDo = {}
		},
		clearToDo() {
			this.toDoList = []
		},
		save() {
			localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
		},
		load() {
			this.toDoList = JSON.parse(localStorage.getItem('toDoList'))
		},
		sameList() {
			if (this.toDoList.length === 0) return true

			const savedList = JSON.parse(localStorage.getItem('toDoList'))

			return compareComplexObjArrays(this.toDoList, savedList)
		}
	}
}

Vue.createApp(handlingForms).mount('#app')
