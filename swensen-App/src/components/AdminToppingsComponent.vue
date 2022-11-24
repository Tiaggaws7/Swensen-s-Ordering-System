<template>

  <div
    class="q-pa-md"
    style="max-width: 350px"
  >
    <q-list bordered separator v-for="topping in toppingList" :key="topping.id">
      <q-item clickable v-ripple >
        <q-item-section >
          ID : {{ topping.id }} | Name : {{ topping.name }} | Price : {{ topping.price }}
        </q-item-section
        >
        <q-item-section avatar>
          <q-icon
            name="edit"
            color="red"
            @click.stop="showUpdateForm(topping.id,topping.name,topping.price)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="deleteWithID(topping.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div v-if="showForm">
    <h6>Update the topping here</h6>
    <q-form
      @submit="onSubmitUpdate"
      @reset="onReset"
      class="q-gutter-md"
    >

      <q-input
        filled
        type="number"
        v-model="toppingID"
        label="ID of the topping"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please  type the id'
        ]"
      />

      <q-input
        filled
        v-model="newToppingName"
        label="Name of the topping"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="newToppingPrice"
        label="Price of the topping"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please  type the price'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>

  <div>
    <h6>Add a new topping</h6>
    <q-form
      @submit="addTopping"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="toppingName"
        label="Name of the topping"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="toppingPrice"
        label="Price of the topping"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please  type the price'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>


</template>

<script>
import {useGlobalStateStore} from "../stores/globalState";
export default {
  name: "AdminToppingsComponent",
  data(){
    return{
      toppingList: [],
      toppingName: "",
      toppingPrice: "",
      newToppingName: "",
      newToppingPrice: "",
      toppingID: "",
      showForm: false,
    }
  },
  mounted(){
          this.getAllTopping()
        },
  methods:{
    addTopping () {
      const data = {
        name: this.toppingName,
        price: this.toppingPrice
      }
      this.$api
        .post("/toppings/add", data)
        .then((res) => {
          console.log(res)
          this.getAllTopping()
        })
        this.toppingName = ""
        this.toppingPrice = ""
      },
      getAllTopping() {
        this.$api.get("/toppings/all")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
          this.toppingList = res.data
          }
        })
        .catch((err) => {
          console.log("getTopping() error: " + err);
        })
      },
      deleteWithID(id){
        this.$api.delete("/toppings/" + id)
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.getAllTopping()
          }
        })
        .catch((err) => {
          console.log("deleteWithID() error: " + err);
        })
      },
      updateWithID(id){
              const data = {
                name: this.newToppingName,
                price: this.newToppingPrice
              }
              this.$api.put("/toppings/" + id, data)
                .then((res) => {
                  if (res.status == 200){
                    console.log(res.data)
                    this.getAllTopping()
                  }
                })
                .catch((err) => {
                  console.log("updateWithID() error: " + err);
                })
            },
    onReset(){
      this.toppingName = ""
      this.toppingPrice = ""
      this.newToppingName = ""
      this.newToppingPrice = ""
      this.showForm = false
    },
    showUpdateForm(id,name,price){
      this.showForm = true
      this.toppingID = id
      this.newToppingName = name
      this.newToppingPrice = price
    },
    onSubmitUpdate(){
      this.updateWithID(this.toppingID)
      this.newToppingName = ""
      this.newToppingPrice = ""
      this.showForm = false
    }
  }
}
</script>

<style scoped>

</style>
