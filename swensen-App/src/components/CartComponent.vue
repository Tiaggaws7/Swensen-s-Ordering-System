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
        <td> {{menu.details.name}} </td>
        <td> {{menu.details.flavour}} </td>
        <td> <div v-for="topping in menu.details.toppings" :key="topping" > {{ topping }} </div></td>
        <td> {{ menu.totalPrice }} $ </td>
        <td>
          <q-btn square color="red" icon="delete" @click="deleteWithID(menu.id)" />
        </td>
      </tr>
    </table>
    <p class="text-center text-h5 "><strong>Total</strong></p>
    <p class="text-center text-h5">{{this.total}} $</p>
    <q-btn class="glossy full-width"  color="deep-orange" label="Checkout" @click="verifyLogin()"/>
  </div>
</q-card>
</template>

<script>

import {useGlobalStateStore} from "stores/globalState";

export default {
  name: "CartPage",
  async mounted() {
    await this.getCart()
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
    getCart() {
      this.$api.get("/cart/all")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            res.data.map(cart => {
              cart.details = JSON.parse(cart.details)
              console.log(cart.details)
            })
            this.cart = res.data
            if (Object.keys(this.store.loggedUser).length === 0) {
              const cart = res.data.filter(element => {
                return element.customerId === 1
              })
              this.cart = cart
            }
            else {
              const cart = res.data.filter(element => {
                return element.customerId === this.store.loggedUser.id
              })
              this.cart = cart
            }
          }
        })
        .catch((err) => {
          console.log("getCart() error: " + err);
        })
    },
    deleteWithID(id){
      this.$api.delete("/cart/" + id)
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.getCart()
          }
        })
        .catch((err) => {
          console.log("deleteWithID() error: " + err);
        })
    },
    updateTotal(){
      this.total = 0
      this.cart.map(element => {
        let sum = element.totalPrice
        this.total = this.total + sum
      })
    },
    verifyLogin(){
      if (Object.keys(this.store.loggedUser).length === 0 ){
        this.$router.push('/checkout')
      }
      else {
        this.$router.push('/payment')
      }
    }
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
