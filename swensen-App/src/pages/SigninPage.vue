<template>
  <NavComponent @showCart="showCart = true"/>
  <h1 class="text-center"> Login</h1>
  <q-form
    @reset="onReset"
    class="q-gutter-md qform "
    ref="checkout form"
  >
    <q-input
      filled
      v-model="email"
      label="Email"
      />

    <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <p>{{ errorMessage }}</p>

    <div>
      <q-btn label="Login" color="primary" @click="verifyCouple(this.email, this.password)"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
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
  name: "SigninPage",
  components: {NavComponent, CartComponent},
  data() {
    return {
      store : useGlobalStateStore(),
      email: "",
      password: "",
      isPwd: true,
      errorMessage: "",
      showCart: false
    }
  },
  methods: {
    verifyCouple(email, password) {
      if (email == "admin@gmail.com") {
        if ( password == "123456") {
          this.$router.push('/dashboard')
        } else {
          this.errorMessage = "Wrong password admin"
        }
      } else  {
        const data = {
          mail: this.email,
          password: this.password
        }
        this.$api.post("/customer/login", data)
          .then(res => {
            if (res.status == 200){
              this.errorMessage = ""
              this.store.loggedUser = res.data
              this.$router.push('/')
            }
          })
          .catch((err) => {
            this.errorMessage = "Wrong Mail / Password"
          })
      }
    },
    onReset() {
      this.email = ""
      this.password = ""
      this.isPwd = true
      this.errorMessage = ""
    }
  }
}
</script>

<style scoped>

.qform {
  width: 30%;
  margin: 0 auto;
}

p {
  color: red;
  font-weight: bold ;
}

</style>
