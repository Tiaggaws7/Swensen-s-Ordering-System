<template>
  <NavComponent @showCart="showCart = true"/>
<h1 class="text-center"> Checkout</h1>
    <q-form
      @reset="onReset"
      class="q-gutter-md qform "
      ref="checkout form"
    >
      <q-input
        filled
        v-model="name"
        label="Name"
        lazy-rules
        :rules="[ val => validateName(val) || 'Please type something' ]"
      />
      <q-input
        filled
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[val => validateEmail(val) || 'Please type a real email']"
      />
      <q-input
        filled
        v-model="address"
        label="Address"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your address',
          val => validateAddress(val) || 'Your address is too long to be real'

        ]"
      />
      <q-input
        filled
        v-model="city"
        label="City"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your city',
          val => validateCity(val) || 'Your city is too long to be real'
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="zipcode"
        label="Zipcode"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your zipcode',
          val => validateZipCode(val) || 'Please type a real zipcode'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Continue to Payment" type="submit" color="primary" :disable="!verifyForm()" @click="this.$router.push('/payment')" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <q-dialog v-model="showCart" full-width>
      <CartComponent/>
    </q-dialog>
</template>

<script>
import NavComponent from "components/NavComponent";
import CartComponent from "components/CartComponent";

export default {
  name: "PaymentPage",
  components: {NavComponent, CartComponent},
  data() {
    return  {
      name : "",
      email : "",
      address : "",
      city : "",
      zipcode : "",
      accept: false,
      showCart: false
    }
  },
  methods: {
    validateEmail(email){
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    validateName(val){
      return val && val.length > 0 && val.length < 50
    },
    validateAddress(val){
      return val && val.length > 0 && val.length < 255
    },
    validateCity(val){
      return val && val.length > 0 && val.length < 75
    },
    validateZipCode(val){
      return val && val > 0 && val < 999999
    },
    verifyForm(){
      return this.validateName(this.name) &&
        this.validateEmail(this.email) &&
        this.validateAddress(this.address) &&
        this.validateCity(this.city) &&
        this.validateZipCode(this.zipcode) &&
        this.accept
    },
  onReset(){
      this.name = ""
      this.email = ""
      this.address = ""
      this.city = ""
      this.zipcode = ""
      this.accept = false
    }
  }
}
</script>

<style scoped>

.qform {
  width:30%;
  margin:0 auto;
}

</style>
