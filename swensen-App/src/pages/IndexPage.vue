<template>
  <q-page>
    <q-btn @click="addCategory">yop</q-btn>
    nombre de requette pending {{list3}}
    <q-list >
      <q-item clickable v-ripple >
        <q-item-section >
          {{list2}} 
        </q-item-section
        >
        <q-item-section avatar>
          <q-icon
            name="edit"
            color="red"
            @click.stop="updateWithID(l.id)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="deleteWithID(l.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <NavComponent @showCart="showCart = true"/>
    <ChooseMenuComponent @showCart="showCart = true"/>
    <q-dialog v-model="showCart" full-width>
      <CartComponent/>
    </q-dialog>

  </q-page>
</template>


<script>
import { defineComponent } from 'vue'
import ChooseIceCream from "components/ChooseIceCreamComponent";
import NavComponent from "components/NavComponent";
import CartComponent from "components/CartComponent";
import ChooseMenuComponent from "components/ChooseMenuComponent"
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',
  components: {NavComponent, CartComponent ,ChooseMenuComponent},
  data() {
    return {
      showCart : false,
      personalize : false,
      categoryName: "updated",
      list: [],
      list2: "",
      list3: "",
      id: "8"
    }
  },
  mounted(){
    this.getPending()
  },
  methods: {

    getAllCategory() {
      this.$api.get("/category/all")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.list = res.data
          }
        })
        .catch((err) => {
          console.log("getCategory() error: " + err);
        })
    },
    getPending() {
      this.$api.get("/order/all/pending/count")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.list2 = res.data
          }
        })
        .catch((err) => {
          console.log("getCategory() error: " + err);
        })
    },
    updateWithID(id){
      const data = {
                name: this.categoryName
              }
      this.$api.put("/category/" + id, data)
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)

            this.getAllCategory()
          }
        })
        .catch((err) => {
          console.log("updateWithID() error: " + err);
        })
    },
    deleteWithID(id){
      this.$api.delete("/category/" + id)
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.getAllCategory()
          }
        })
        .catch((err) => {
          console.log("deleteWithID() error: " + err);
        })
    },
    addCategory () {
              const data = {
                name: "je vais etre update"
              }
              this.$api
              .post("/category/add", data)
              .then((res) => {
              console.log(res)
              this.getAllCategory()
              })
              
            },
    toggleShowCart(){
      this.showCart = !this.showCart
    },
  },
})
</script>
