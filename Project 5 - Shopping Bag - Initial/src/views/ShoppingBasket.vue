<template>
	<div class="basket">
		<div class="items">
			<div class="item" v-for="(product, index) in productsInBag" :key="index">
				<button @click="removeFromBag(product)" class="remove">Remove item</button>
				<div class="photo">
					<img :src="product.image" alt="" />
				</div>
				<div class="description">{{ product.title }}</div>
				<div class="price">
					<div class="quantity-area">
						<button :disabled="product.quantity === 1" @click="($event) => updateQuantity(product, 'decrease')">
							-
						</button>
						<span class="quantity">{{ product.quantity }}</span>
						<button @click="($event) => updateQuantity(product, 'increase')">+</button>
						<span> x</span>
					</div>
					<div class="price-calc">
						<div class="amount">US$ {{ product.price.toFixed(2) }}</div>
						<div v-if="product.quantity > 1" class="amount">
							US$ {{ (product.price * product.quantity).toFixed(2) }}
						</div>
					</div>
				</div>
			</div>
			<h2 v-if="!productsInBag.length">Empty bag</h2>
			<div v-else class="grand-total">Grand Total: US$ {{ grandTotal() }}</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'ShoppingBasket',
	computed: mapState(['productsInBag']),

	methods: {
		updateQuantity(product, action) {
			if (action === 'decrease' && product.quantity > 1) {
				product.quantity--
				this.$store.dispatch('updateProduct', product)
			} else if (action === 'increase') {
				product.quantity++
				this.$store.dispatch('updateProduct', product)
			}
		},
		removeFromBag(product) {
			product.inBag = false
			product.quantity = 0
			this.$store.dispatch('removeFromBag', product)
		},
		grandTotal() {
			const total = this.productsInBag.reduce((total, product) => {
				return total + product.price * product.quantity
			}, 0)
			return total.toFixed(2)
		}
	}
}
</script>

<style lang="scss">
.basket {
	padding: 60px 0;
	.items {
		max-width: 800px;
		margin: auto;
		.item {
			display: flex;
			justify-content: space-between;
			padding: 40px 0;
			border-bottom: 1px solid lightgrey;
			position: relative;

			.remove {
				position: absolute;
				top: 8px;
				right: 0;
				font-size: 11px;
				text-decoration: underline;
				cursor: pointer;
			}

			.quantity-area {
				height: 14px;

				button {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
				}

				.quantity {
					margin: 0 4px;
				}
			}

			.photo {
				img {
					max-width: 80px;
				}
			}

			.description {
				padding-left: 30px;
				box-sizing: border-box;
				max-width: 50%;
			}

			.price {
				display: flex;
				.amount {
					font-size: 16px;
					margin-left: 8px;
					vertical-align: middle;
				}
			}
			.price-calc {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		.grand-total {
			font-size: 24px;
			font-weight: bold;
			text-align: right;
			margin-top: 8px;
		}
	}
}
</style>
