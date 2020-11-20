<template>
  <div id="app">
    <Products/>
  </div>
</template>

<script>
import Products from "./components/Products.vue";

export default {
  name: "App",
  components: {
    Products
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img, video {
  height: auto;
}
*, button {
  padding: 0;
  margin: 0;
}

body {
  font-weight: 300;
  margin: 0;
  font-size: 13px;
  background-color: #e2e6e3;
}

.btn {
  display: flex;
    appearance: none;
    align-items: center;
    justify-content: center;
    transition: all 250ms ease 0s;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    border: 0px;
    line-height: 1.2;
    padding-top: 2px;
    font-weight: 600;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: 52px;
    background: rgb(75, 85, 72);
    color: rgb(252, 252, 249);
    width: 100%;
    max-width: 100%;
    cursor: pointer;

    @media(min-width: 768px) {
      max-width: 157px;
    }
}
</style>
