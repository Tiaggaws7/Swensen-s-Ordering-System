<template>
  <header>
    <h3 @click="this.$router.push('/')">Swensen's-Ordering-System</h3>
    <nav>
      <ul>
        <li>
          <div v-if="Object.keys(store.loggedUser).length === 0">
            <a class="signin-signup" @click="this.$router.push({ path: '/signin'})" >Sign in </a>
            <a class="signin-signup" @click="this.$router.push('/signup')">Sign up</a>
          </div>
          <div v-else class="flex">
            <a class="q-mr-lg text-h4">Welcome <strong>{{store.loggedUser.name}} </strong></a>
            <a class="logout" @click="logout()">Log out</a>
          </div>
        </li>
        <q-icon color="black" name="shopping_cart" size="50px" @click="$emit('showCart')"/>
      </ul>
    </nav>
  </header>
</template>

<script>

import {useGlobalStateStore} from "stores/globalState";

export default {
  name: "NavComponent",
  data() {
    return {
      store : useGlobalStateStore(),
      expanded: false,
      IceCreamInCart: ["super strawberry", "Vanilla whey isolate", "peanuts butter"]
    }
  },
  methods: {
    logout() {
      this.store.loggedUser = {}
    }
  }
}
</script>

<style scoped>

h3 {
  padding-left: 2%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F2F2;
}

nav {
  width:30%;
}

ul {
  display: flex;
  justify-content: space-around;
}

a {
  font-size: 1.5em;
  text-decoration: none;
  color:black;
}

li {
  list-style-type: none;
}
.logout {
  background-color: lightskyblue;
  padding: 10px;
  border-radius: 50%;
}

.signin-signup {
  background-color: lightskyblue;
  padding: 10px;
  border-radius: 50%;
  margin: 0 10px;
}
</style>
