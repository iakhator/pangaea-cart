<template>
  <div class="cart-modal" ref="cart-modal">
    <div class="overlay"></div>
    <div class="cart-body right-cart">
      <div class="cart-content">
        <div class="cart-top">
          <div
            @click="closeCartModal"
            style="border-radius: 50%; border: 1px solid rgb(198, 204, 199); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 492.004 492.004"
              style="height: 15px; width: 10px; fill: rgb(43, 46, 43);"
            >
              <path
                d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="currency-select-row">
          <select
            class="currency-select"
            v-model="selectCurrency"
            @change="onChange"
          >
            <option v-for="(curr, idx) in currency" :key="idx" :value="curr">{{
              curr
            }}</option>
          </select>
        </div>
        <template v-if="cartLength">
          <div class="cart-item" v-for="item in cartItem.items" :key="item.id">
            <div class="product-description">
              <span
                class="remove-product"
                style="cursor: pointer;"
                @click="removeItem(item.id)"
                >x</span
              >
              <div class="cart-product">
                <h6>{{ item.title }}</h6>
                <div class="product-image">
                  <img :src="item.image_url" :alt="item.title" />
                </div>
              </div>
              <div class="quantity">
                <div class="quantity-selector">
                  <span
                    class="counter-action decrement"
                    @click="decrementQuantity(item.id)"
                    >-</span
                  >
                  <span class="counter-number counter"
                    >{{ item.quantity }}
                  </span>
                  <span
                    class="counter-action increment"
                    @click="incrementQuantity(item.id)"
                    >+</span
                  >
                </div>
                <div class="price">
                  {{ defaultCurrency }} {{ item.price.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p style="margin-top: 20px; text-align: center; font-size: 120%;">
            There are no items in your cart.
          </p>
        </template>
      </div>
      <div class="cart-footer2" v-if="cartLength">
        <div class="cart-subtotal">
          <span>Subtotal</span>
          <div class="subtotal-price">
            {{ defaultCurrency }} {{ cartItem.totalPrice.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENCY_QUERY } from "../constants/graphql";

export default {
  props: {
    cartItem: {
      type: Object,
      required: true
    },
    defaultCurrency: {
      type: String
    }
  },

  data() {
    return {
      selectCurrency: "USD",
      currency: []
    };
  },

  apollo: {
    currency: {
      // GraphQL Query
      query: CURRENCY_QUERY
    }
  },

  computed: {
    cartLength() {
      return this.cartItem.items.length;
    }
  },

  methods: {
    closeCartModal() {
      const modalContent = document.querySelector(".cart-body");
      const modalOverlay = document.querySelector(".overlay");
      modalOverlay.classList.remove("open");
      modalContent.classList.remove("open");
    },

    incrementQuantity(id) {
      this.$emit("increment-quantity", id);
    },

    decrementQuantity(id) {
      this.$emit("decrement-quantity", id);
    },

    removeItem(id) {
      this.$emit("remove-item", id);
    },

    onChange() {
      this.$emit("select-currency", this.selectCurrency);
    }
  }
};
</script>

<style lang="scss">
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #6e7b70;
  pointer-events: none;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  &.open {
    opacity: 0.5;
  }
}

.currency-select-row {
  margin-right: 20px;
  margin-top: 10px;
  display: flex;
  margin-bottom: 20px;
}

.currency-select {
  max-width: 80px;
  padding: 8px 13px 5px 10px;
  background-position: 100% 60%;
}

.cart-body {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 35%;
  background: #e2e6e3;
  z-index: 1;
}

.cart-content {
  padding: 20px;
}

.cart-item {
  display: flex;
  flex-wrap: wrap;
  min-height: inherit;
  max-height: inherit;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
  background: #fff;

  .product-description {
    color: #1e2d2b;
    width: 100%;
    line-height: 18px;
    font-size: 10px;
    padding: 15px 13px 13px 21px;
    letter-spacing: 0.02px;

    h6 {
      color: #1e2d2b;
      margin-bottom: 0;
      font-size: 13px;
      letter-spacing: 0.03px;
      padding: 0;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }

    .quantity {
      font-size: 100%;
      margin-top: 10px;
    }

    .remove-product {
      float: right;
      padding-right: 5px;
      position: absolute;
      right: 27px;
      margin-top: -10px;
      margin-right: -20px;
      font-size: 20px;
      opacity: 0.7;
      cursor: pointer;
      color: #000;
    }
  }

  .product-image {
    background-color: #fdfdfd;
    display: -webkit-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1e2d2b;
    width: 33.3%;
    padding-right: 15px;

    img {
      overflow: hidden;
      height: 80px;
      width: auto;
      -o-object-fit: contain;
      object-fit: contain;
    }
  }
}
.cart-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cart-item .product-description .quantity,
.cart-item .product-description .quantity-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item .product-description .quantity-selector {
  border: 0.5px solid #bcbcbc;
  padding: 7px;
  width: 76px;
}

.cart-item .product-description .quantity .price {
  float: right;
  padding: 0 10px;
  width: inherit;
  font-size: 13px;
  letter-spacing: 0.03px;
}

.cart-item .product-description .quantity .counter-action {
  cursor: pointer;
  color: #000;
  font-size: 15px;
}

.cart-item .product-description .quantity .counter {
  padding: 0 10px;
  font-size: 13px;
}

.right-cart.open {
  transform: translateX(0);
  opacity: 1;
}

.right-cart {
  position: fixed;
  top: 0;
  background-color: #f2f2ef;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: auto;
  z-index: 1500;
  transition: opacity 0.4s ease-in-out 0.1s,
    -webkit-transform 0.4s cubic-bezier(0.28, 0.47, 0.29, 0.86);
  transition: transform 0.4s cubic-bezier(0.28, 0.47, 0.29, 0.86),
    opacity 0.4s ease-in-out 0.1s;
  transition: transform 0.4s cubic-bezier(0.28, 0.47, 0.29, 0.86),
    opacity 0.4s ease-in-out 0.1s,
    -webkit-transform 0.4s cubic-bezier(0.28, 0.47, 0.29, 0.86);
  opacity: 0;
  left: auto;
  right: 0;
  transform: translateX(100%);
}

.cart-footer2 {
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: 0 20px 20px;

  .cart-subtotal {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 15px;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border: 0 solid #6e7b70;
    border-top: none;
  }
}
</style>
