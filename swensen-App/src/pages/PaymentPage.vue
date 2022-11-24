<template>
  <NavComponent @showCart="showCart = true"/>
<h1 class="text-center">Payment page</h1>
  <div class="flex flex-center column" v-if="paymentOK" >
    <h3 > Your order will be processed as soon as possible !</h3>
    <q-btn color="primary" @click="this.$router.push('/')"> Go back to home </q-btn>
  </div>

  <q-form
    v-else
    @submit.prevent=""
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

    <q-input
      class="crypto"
      filled
      type="number"
      v-model="crypto"
      label="Crypto"
      lazy-rules
      :rules="[
          val => validateCrypto(val) || 'Please type a real cryptogram'
        ]"
    />

    <div class="flex justify-around q-mt-lg">
      <q-btn class="button" label="Submit" type="submit" color="primary" :disable="!validateForm()" @click="validCart()"/>
    </div>
  </q-form>
  <q-dialog v-model="showCart" full-width>
    <CartComponent/>
  </q-dialog>
</template>

<script>

import {useGlobalStateStore} from "stores/globalState";
import NavComponent from "components/NavComponent";
import CartComponent from "components/CartComponent";

export default {
  name: "PaymentPage",
  components: {NavComponent, CartComponent },
  data(){
    return {
      store : useGlobalStateStore(),
      cardNumber:0,
      months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      years: ['2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036'],
      month:'',
      year:'',
      crypto:0,
      paymentOK: false,
      showCart: false
    }
  },
  methods:{
    validateCard(val){
      return val && val.length === 16
    },
    validateMonthAndYear(){
      return this.month != 0 && this.year != 0
    },
    validateCrypto(val){
      return val && val.length === 3
    },
    validateForm(){
      return this.validateCard(this.cardNumber) && this.validateMonthAndYear() && this.validateCrypto(this.crypto)
    },
    validCart() {
      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth()+1;
      const yyyy = today.getFullYear();
      if(dd<10)
      {
        dd=`0${dd}`;
      }

      if(mm<10)
      {
        mm=`0${mm}`;
      }
      today = `${yyyy}-${mm}-${dd}`;

      const id = this.store.loggedUser.id

      const data = {
        customerId: this.store.loggedUser.id,
        status: "pending",
        date: today
      }

      this.$api.post('/order/add', data)
        .then(res => {
          if (res.status == 200) {
            this.$api.delete('cart/customerCart/' + this.store.loggedUser.id)
              .then(res => {
                if(res.status = 200){
                  this.paymentOK = true
                }
              })
          }
        })
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

.crypto {
  margin: 10px auto;
  width: 50%;
}
</style>
