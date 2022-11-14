<template>
  <header>
    <h3>Swensen's-Ordering-System</h3>
    <nav>
      <ul>
        <li><a @click="this.$router.push('/signin')" >Sign in </a></li>
        <li><a @click="this.$router.push('/signup')">Sign up</a></li>
        <q-icon color="black" name="shopping_cart" size="50px" @click="$emit('showCart')"/>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      expanded: false,
      IceCreamInCart: ["super strawberry", "Vanilla whey isolate", "peanuts butter"]
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

li {
  list-style: none;
  background-color: #82E57A;
  border-radius: 20px;
  padding: 8px 25px;
}

a {
  font-size: 1.5em;
  text-decoration: none;
  color:black;
}

</style>
