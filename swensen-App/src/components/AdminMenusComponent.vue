<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator v-for="menu in menuList" :key="menu.id">
      <q-item clickable v-ripple>
        <q-item-section>
          ID : {{ menu.id }} | Name : {{ menu.name }} | Category :
          {{ menu.categoryId }} | Flavour : {{ menu.flavourId }} | Price : {{menu.price}}
          <img
            :src="require(`../assets/${menu.image}`)"
            width="220"
            height="200"
          />
        </q-item-section>

        <q-item-section avatar>
          <q-icon
            name="edit"
            color="red"
            @click.stop="
              showUpdateForm(
                menu.id,
                menu.name,
                menu.categoryId,
                menu.flavourId,
                menu.price,
                menu.image.name
              )
            "
          />
          <q-icon
            :name="menu.hidden = 0 ? 'visibility_on' : 'visibility_off'"
            color="red"
            @click.stop="toggleMenuHidden(menu.id,menu.flavourId,menu.categoryId,menu.name,menu.image,menu.hidden,menu.price)"
          />
          <q-icon
            name="visibility_off"
            color="green"
            @click.stop="toggleMenuVisible(menu.id,menu.flavourId,menu.categoryId,menu.name,menu.image,menu.hidden,menu.price)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="deleteWithID(menu.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div v-if="showForm">
    <h6>Update the menu here</h6>
    <q-form @submit="onSubmitUpdate" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        type="number"
        v-model="menuID"
        label="ID of the menu"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please  type the id',
        ]"
      />

      <q-input
        filled
        v-model="newMenuName"
        label="Name of the menu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-file
        standout
        v-model="newMenuImage"
        label="the image of the menu"
        max-file-size="1048576"
        accept=".jpg, .jpeg, .png"
        @rejected="onRejected"
        @update:model-value="uploadFile()"
      >
        <template #append>
          <q-icon name="attach file" />
        </template>
      </q-file>
      <q-input
        filled
        v-model="newMenuCategory"
        label="Category of the menu"
        
      />
      <q-list
        bordered
        separator
        v-for="categorie in categoryList"
        :key="categorie.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ categorie.id }} | Name : {{ categorie.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="sendToNewMenuCategory(categorie.id, categorie.name)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-input
        filled
        v-model="newMenuFlavour"
        label="Flavour of the menu"
        
      />
      <q-list
        bordered
        separator
        v-for="flavour in flavourList"
        :key="flavour.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ flavour.id }} | Name : {{ flavour.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="
                sendToNewMenuFlavour(
                  flavour.id,
                  flavour.name,
                  flavour.price,
                  flavour.image
                )
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-input
        filled
        type="number"
        v-model="newMenuPrice"
        label="Price of the menu"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || 'Please  type the price'
          ]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>

  <div>
    <h6>Add a new menu</h6>
    <q-form @submit="addMenu" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="menuName"
        label="Name of the menu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-file
        standout
        v-model="menuImage"
        label="the image of the menu"
        max-file-size="1048576"
        accept=".jpg, .jpeg, .png"
        @rejected="onRejected"
        @update:model-value="uploadFile()"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please fill the image',
        ]"
      >
        <template #append>
          <q-icon name="attach file" />
        </template>
      </q-file>
      <q-input
        filled
        v-model="menuCategory"
        label="Category of the menu"

      />
      <q-list
        bordered
        separator
        v-for="category in categoryList"
        :key="category.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ category.id }} | Name : {{ category.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="sendToMenuCategory(category.id, category.name)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-input
        filled
        v-model="menuFlavour"
        label="Flavour of the menu"

      />
      <q-list
        bordered
        separator
        v-for="flavour in flavourList"
        :key="flavour.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ flavour.id }} | Name : {{ flavour.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="
                sendToMenuFlavour(
                  flavour.id,
                  flavour.name,
                  flavour.price,
                  flavour.image
                )
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-input
        filled
        type="number"
        v-model="menuPrice"
        label="Price of the menu"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || 'Please  type the price'
          ]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useGlobalStateStore } from "stores/globalState";
export default {
  name: "AdminMenusComponent",
  data() {
    return {
      menuList: [],
      flavourList: [],
      categoryList: [],
      store: useGlobalStateStore(),
      menuName: "",
      menuImage: "",
      menuCategory: "",
      menuFlavour: "",
      menuPrice: "",
      newMenuName: "",
      newMenuImage: "",
      newMenuCategory: "",
      newMenuFlavour: "",
      newMenuTopping: "",
      menuID: "",
      showForm: false,
      selectedCategory: {},
      selectedFlavour: {},
      selectedTopping: {},
      selectedNewCategory: {},
      selectedNewFlavour: {},
      selectedNewTopping: {},
    };
  },
  mounted(){
          this.getAllMenu()
          this.getAllCategory()
          this.getAllFlavour()
        },
  methods: {
    addMenu () {
      const data = {
        flavourId: this.menuFlavour,
        categoryId: this.menuCategory,
        name: this.menuName,
        image: this.menuImage.name,
        hidden: "0",
        price: this.menuPrice
      }
      this.$api
        .post("/menu/add", data)
        .then((res) => {
          console.log(res)
          this.getAllMenu()
        })
        this.menuCategory = ""
        this.menuFlavour = ""
        this.menuImage = ""
        this.menuName = ""
        this.menuPrice = ""
      },
      deleteWithID(id){
        this.$api.delete("/menu/" + id)
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
            this.getAllMenu()
          }
        })
        .catch((err) => {
          console.log("deleteWithID() error: " + err);
        })
      },
      updateWithID(id){
        const data = {
          flavourId: this.newMenuFlavour,
          categoryId: this.newMenuCategory,
          name: this.newMenuName,
          image: this.newMenuImage.name,
          hidden: 0,
          price: this.newMenuPrice
        }
        this.$api.put("/menu/" + id, data)
          .then((res) => {
            if (res.status == 200){
              console.log(res.data)
              this.getAllMenu()
            }
          })
          .catch((err) => {
            console.log("updateWithID() error: " + err);
          })
      },
    getAllCategory() {
              this.$api.get("/category/all")
              .then((res) => {
                if (res.status == 200){
                  console.log(res.data)
                this.categoryList = res.data
                }
              })
              .catch((err) => {
                console.log("getCategory() error: " + err);
              })
            },
    getAllFlavour() {
        this.$api.get("/flavour/all")
        .then((res) => {
          if (res.status == 200){
            console.log(res.data)
          this.flavourList = res.data
          }
        })
        .catch((err) => {
          console.log("getFlavour() error: " + err);
        })
      },
    getAllMenu() {
      this.$api.get("/menu/all")
      .then((res) => {
        if (res.status == 200){
          console.log(res.data)
        this.menuList = res.data
        }
      })
      .catch((err) => {
        console.log("getMenu() error: " + err);
      })
    },
    onSubmit() {
      console.log(this.menuImage.name);
      console.log(this.selectedFlavour)
      console.log(this.selectedTopping)
      this.store.addMenu(
        this.menuName,
        this.menuImage.name,
        this.selectedCategory,
        this.selectedFlavour,
        this.selectedTopping
      );
      this.menuName = "";
      this.menuCategory = "";
      this.menuImage = "";
      this.menuFlavour = "";
      this.menuTopping = "";
      this.newMenuName = "";
      this.newMenuCategory = "";
      this.newMenuImage = "";
      this.newMenuFlavour = "";
      this.newMenuTopping = "";
      this.selectedCategory= {}
      this.selectedFlavour= {}
      this.selectedTopping= {}
      this.selectedNewCategory= {}
      this.selectedNewFlavour= {}
      this.selectedNewTopping= {}
    },
    onReset() {
      this.menuName = "";
      this.menuCategory = "";
      this.menuImage = "";
      this.menuFlavour = "";
      this.menuTopping = "";
      this.newMenuName = "";
      this.newMenuCategory = "";
      this.newMenuImage = "";
      this.newMenuFlavour = "";
      this.newMenuTopping = "";
      this.selectedCategory= {}
      this.selectedFlavour= {}
      this.selectedTopping= {}
      this.selectedNewCategory= {}
      this.selectedNewFlavour= {}
      this.selectedNewTopping= {}
      this.showForm = false;
    },
    showUpdateForm(id,name,categories,flavours,price,image) {

      this.showForm = true;
      this.menuID = id;
      this.newMenuName = name;
      this.newMenuImage = image;

      this.newMenuCategory = categories;
      this.newMenuFlavour = flavours;
      this.newMenuPrice = price;
      this.selectedNewCategory = categories
      this.selectedNewFlavour = flavours
      // this.selectedNewTopping = toppings
      // console.log(newMenuCategory)
    },
    onSubmitUpdate() {
      this.updateWithID(
        this.menuID
      );
      this.menuName = "";
      this.menuCategory = "";
      this.menuImage = "";
      this.menuFlavour = "";
      this.menuTopping = "";
      this.newMenuName = "";
      this.newMenuCategory = "";
      this.newMenuImage = "";
      this.newMenuFlavour = "";
      this.newMenuPrice = "";
      this.selectedCategory= {}
      this.selectedFlavour= {}
      this.selectedTopping= {}
      this.selectedNewCategory= {}
      this.selectedNewFlavour= {}
      this.selectedNewTopping= {}
      this.showForm = false;
    },
    sendToMenuCategory(id, name) {
      this.menuCategory = id;
      this.selectedCategory = { name: name, id: id };
      console.log(this.menuCategory);
      console.log(this.selectedCategory)
    },
    sendToMenuFlavour(id, name, price, image) {
      this.menuFlavour = id;
      this.selectedFlavour = { id: id, name: name, image: image, price: price };
    },
    sendToMenuTopping(id, name, price) {
      this.menuTopping = name;
      this.selectedTopping = { id: id, name: name, price: price };
    },
    sendToNewMenuCategory(id, name) {
      this.newMenuCategory = id;
      this.selectedNewCategory = { name: name, id: id };
      console.log(this.newMenuCategory);
    },
    sendToNewMenuFlavour(id, name, price, image) {
      this.newMenuFlavour = id;
      this.selectedNewFlavour = { id: id, name: name, image: image, price: price };
    },
    sendToNewMenuTopping(id, name, price) {
      this.newMenuTopping = name;
      this.selectedNewTopping = { id: id, name: name, price: price };
    },
    updateWithIDHidden(id,flavour,category,name,image,price){
        const data = {
          hidden: 1,
          flavourId: flavour,
          categoryId: category,
          name: name,
          image: image,
          price: price
        }
        this.$api.put("/menu/" + id, data)
          .then((res) => {
            if (res.status == 200){
              console.log(res.data)
              this.getAllMenu()
            }
          })
          .catch((err) => {
            console.log("updateWithID() error: " + err);
          })
      },
      updateWithIDVisible(id,flavour,category,name,image,price){
        const data = {
          hidden: 0,
          flavourId: flavour,
          categoryId: category,
          name: name,
          image: image,
          price: price
        }
        this.$api.put("/menu/" + id, data)
          .then((res) => {
            if (res.status == 200){
              console.log(res.data)
              this.getAllMenu()
            }
          })
          .catch((err) => {
            console.log("updateWithID() error: " + err);
          })
      },
      toggleMenuHidden(id,flavour,category,name,image,hidden,price){
        console.log(hidden)
        this.updateWithIDHidden(id,flavour,category,name,image,price)
      },
      toggleMenuVisible(id,flavour,category,name,image,hidden,price){
        console.log(hidden)
        this.updateWithIDVisible(id,flavour,category,name,image,price) 
      },
    uploadFile() {},
  },
};
</script>

<style scoped></style>
