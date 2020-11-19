<template>
<div>
  <div class="product">
    <div class="product-header">
      <h1>
        All Products
      </h1>
      <p>A 360° look at Lumin</p>
    </div>
    <div class="product-items">
      <div class="product-item" v-for="product in products" :key="product.id">
          <div class="product-item__body">
            <a class="product-item__tag">
              <img class="product-item__tag-image" :alt="product.title" :src="product.image_url">
              <h2 class="product-item__tag-text">{{product.title}}</h2>
            </a>
          </div>
          <div class="product-item__price">
            <p class="product-item__price-para">From:</p><p class="chakra-text css-mgwhu5">{{product.price}}</p>
          </div>
          <button type="button" class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
    </div>
    <cart-modal :cartItem="cartItem" @decrement-quantity="decrementQty" @increment-quantity="incrementQty"/>
  </div>
</template>

<script>
import gql from "graphql-tag";
import CartModal from './CartModal';

export default {
  name: "Products",
  components: {
    CartModal
  },

  data() {
    return {
      cartOfLife: {},
      currency: 'USD',
      products: [],
      cartItem: {
        items: [],
        totalPrice: 0,
        totalQuantity: 0
      }
    }
  },

  apollo: {
    products: {
      // GraphQL Query
      query: gql`query productList ($currency: Currency) {
        products {
          id,
          title,
          image_url,
          price(currency: $currency)
        }
      }`,
      // Reactive variables
      variables () {
        return {
          currency: this.currency,
        }
      }
    }
  },

  methods: {
    addToCart(item) {
      const itemInCart = this.cartItem.items.find(cart => cart.id === item.id)
      if(itemInCart) {
        this.cartItem.items.forEach(cart => {
          cart.quantity += item.quantity;
          cart.price = cart.quantity * cart.price
       })
      }
       else {
          item.quantity = 1;
          this.cartItem.items.push({
            id: item.id,
            title: item.title,
            image_url: item.image_url,
            quantity: item.quantity,
            price: item.price
          })
        }

      this.cartTotal(this.cartItem)
      this.openCart();
    },

    cartTotal(cartItems) {
       let add = 0;
        for (const obj in cartItems.items) {
        add += cartItems.items[obj].price
      }
      cartItems.totalPrice = add;
    },

    decrementQty (value) {
      for (const item of this.cartItem.items) {
        if (value === item.id) {
          const qtyPrice = item.price / item.quantity
          if (item.quantity >= 1) {
            item.quantity -= 1
            item.price = item.price - qtyPrice
            this.cartItem.totalPrice -= qtyPrice
          }
          if (item.quantity === 0) {
            this.cartItem.items = this.cartItem.items.filter(cart => cart.id !== value)
          }
        }
    }
  },

  incrementQty (value) {
    for (const item of this.cartItem.items) {
      console.log(value, item)
      // if (itemId === id) {
      //   const cartItem = this.items[id]
      //   const qtyPrice = cartItem.price / cartItem.quantity
      //   if (cartItem.quantity <= 4) {
      //     cartItem.quantity += 1
      //     cartItem.price = cartItem.price + qtyPrice
      //     this.totalQty += 1
      //     this.totalPrice += qtyPrice
      //   }
      // }
    }
  },

    openCart() {
      const modalContent = document.querySelector('.cart-content');
      const modalOverlay = document.querySelector('.overlay');
      modalContent.classList.add('open');
      modalOverlay.classList.add('open');
    }    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product-items {
  background: #e2e6e3;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(50%, 1fr) );

  @media(min-width: 768px) {
    grid-template-columns: repeat( auto-fit, minmax(30%, 1fr) );
    gap: 1%;
  }
}

.product-item {
  flex-direction: column;
  padding: 3rem 2rem;
  display: flex;
  text-align: center;
  align-items: center;
  background: rgb(226, 230, 227);

  &__body {
    flex: 1 1 0%;
    position: relative;
  }

  &__price {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 1.0rem;
      line-height: 1.5;
    }
  }

  &__tag{
    flex-direction: column;
    justify-content: flex-start;
    display: flex;
    height: 100%;

    h2 {
      font-size: 1rem;
      line-height: 1.5;
    }

    &-image {
      object-fit: contain;
      max-width: 100%;
      max-height: 10vw;
      flex: 1 1 0%;
    }
  }
}
</style>