<template>
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

    <div>
      <q-btn label="Login" color="primary" @click="verifyCouple(this.email, this.password)"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-form>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "SigninPage",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
    }
  },
  methods: {
    verifyCouple(email, password) {
      if (email == "admin@gmail.com") {
        if ( password == "123456") {
          this.$router.push('/dashboard')
        } else {
          Notify.create({
            type: 'negative',
            message: `Wrong password admin`,
          })
        }
      } else if ( email == "123@gmail.com" ) {
        if (password == "123456") {
          this.$router.push('/')
        } else {
          Notify.create({
            type: 'negative',
            message: `Wrong password User`,
          })
        }
      } else  {
        Notify.create({
          type: 'negative',
          message: `Wrong email / password !`,
        })
      }
    },
    onReset() {
      this.email = ""
      this.password = ""
      this.isPwd = true
    }
  }
}
</script>

<style scoped>

.qform {
  width: 30%;
  margin: 0 auto;
}

</style>
