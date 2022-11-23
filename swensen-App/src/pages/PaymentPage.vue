<template>
  <NavComponent @showCart="showCart = true"/>
<h1 class="text-center">Payment page</h1>
  <div class="flex flex-center column" v-if="paymentOK" >
    <h3 > Your command will arrive soon !</h3>
    <q-btn color="primary" @click="this.$router.push('/')"> Go back to home </q-btn>
  </div>

  <q-form
    v-else
    @submit="onSubmit"
    @reset="onReset"
    class="qform"
  >
    <q-input
      filled
      type="number"
      v-model="cardNumber"
      label="Card number"
      lazy-rules
      :rules="[
          val => validateCard(val) || 'Please type a real card number'
        ]"
    />

    <div class="monthAndYear">
      <q-select class="select" v-model="month" :options="months" label="Month" />
      <q-select class="select" v-model="year" :options="years" label="Year" />
    </div>

    <div class="flex justify-around q-mt-lg">
      <q-btn class="button" label="Submit" type="submit" color="primary" :disable="!validateForm()" @click="validCart()"/>
    </div>
  </q-form>
</template>

<script>

import {useGlobalStateStore} from "stores/globalState";
import NavComponent from "components/NavComponent";


export default {
  name: "PaymentPage",
  components: {NavComponent,},
  data(){
    return {
      store : useGlobalStateStore(),
      cardNumber:0,
      months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      years: ['2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036'],
      month:0,
      year:0,
      paymentOK: false
    }
  },
  methods:{
    validateCard(val){
      return val && val.length === 16
    },
    validateMonthAndYear(){
      return this.month != 0 && this.year != 0
    },
    validateForm(){
      return this.validateCard(this.cardNumber) && this.validateMonthAndYear()
    },
    validCart() {
      this.store.order.push(this.store.cart)
      this.paymentOK = true
      this.store.pendingTransaction++;
      this.store.cart = []
    }
  }
}
</script>

<style scoped>

.qform {
  width:30%;
  margin:0 auto;
}

.monthAndYear{
  display: flex;
  justify-content: space-around;
}

.select {
  width:30%;
}

.button {
  width:60%;
  border-radius: 20px;
}
</style>
