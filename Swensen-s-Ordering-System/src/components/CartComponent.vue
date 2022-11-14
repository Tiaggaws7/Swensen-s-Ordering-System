<template>
  <q-card class="my-card">
  <div class="cart--body">
    <h2 class="cart--title"><strong>Your cart</strong></h2>
    <table class="cart--table">
      <tr>
        <th> MENU </th>
        <th> FLAVOUR </th>
        <th> TOPPING </th>
        <th> PRICE </th>
      </tr>
      <tr v-for="menu in cart" :key="menu.id" class="table-row">
        <td> {{menu.name}} </td>
        <td> {{menu.flavour.name}} </td>
        <td> <div v-for="topping in menu.toppings" :key="topping" > {{ topping }} </div></td>
        <td> {{ menu.price }} $ </td>
        <td>
          <q-btn square color="red" icon="delete" @click="deleteWithID(menu.id)" />
        </td>
      </tr>
    </table>
    <p class="text-center text-h5 "><strong>Total</strong></p>
    <p class="text-center text-h5">{{this.total}} $</p>
    <q-btn class="glossy full-width"  color="deep-orange" label="Checkout" @click="this.$router.push('/checkout')"/>
  </div>
</q-card>
</template>

<script>

import {useGlobalStateStore} from "stores/globalState";

export default {
  name: "CartPage",
  mounted() {
    this.cart = this.store.cart
    this.updateTotal()
  },
  data() {
    return {
      store: useGlobalStateStore(),
      cart: [],
      total: 0,
    }
  },
  methods:{
    deleteWithID(id){
      this.cart = this.cart.filter(element => {
        return element.id != id
      })
    },
    updateTotal(){
      this.total = 0
      this.cart.map(element => {
        let sum = element.price
        this.total = this.total + sum
      })
    },
  },
  watch: {
    cart() {
      this.updateTotal()
    }
  }
}
</script>

<style scoped>
.cart--title {
  text-align: center;
}

.cart--table {
  width: 80%;
  text-align: left;
  margin: 10% auto 3% auto;
  padding: 15px;
  border: 1px solid black;
}

.table-row {
  justify-content: center;
}

.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:150px;
}

td {
  border-top: 1px black solid;
  margin: 15px;
}

</style>
