import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state: {
		products: [],
		productsInBag: []
	},
	mutations: {
		loadProducts(state, products) {
			if (localStorage.getItem('productsInBag')) {
				state.productsInBag = JSON.parse(localStorage.getItem('productsInBag'))
			}
			const newProducts = products.map((product) => {
				if (state.productsInBag.length) {
					state.productsInBag.map((productInBag) => {
						if (productInBag.id === product.id) {
							product.quantity = productInBag.quantity
							product.inBag = true
						}
					})
				} else {
					product.quantity = 0
					product.inBag = false
				}
				return product
			})
			state.products = newProducts
		},
		addToBag(state, product) {
			state.productsInBag.push(product)
			localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
		},
		removeFromBag(state, product) {
			const updatedProductsInBag = state.productsInBag.filter((p) => p.id !== product.id)
			state.productsInBag = updatedProductsInBag
			localStorage.setItem('productsInBag', JSON.stringify(updatedProductsInBag))
		},
		updateProduct(state, product) {
			const index = state.products.findIndex((p) => p.id === product.id)
			state.products[index] = product
			localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
		}
	},
	actions: {
		loadProducts({ commit }) {
			axios.get('https://fakestoreapi.com/products').then((response) => {
				commit('loadProducts', response.data)
			})
		},
		addToBag({ commit }, product) {
			commit('addToBag', product)
		},
		removeFromBag({ commit }, product) {
			if (confirm('Are you sure you want to remove this item from your bag?')) {
				commit('removeFromBag', product)
			}
		},
		updateProduct({ commit }, product) {
			commit('updateProduct', product)
		}
	},
	modules: {}
})
