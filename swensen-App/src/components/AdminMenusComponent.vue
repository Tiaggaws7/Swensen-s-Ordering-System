<template>
  <div class="q-pa-md" style="max-width: 350px" v-if="store.menus.length > 0">
    <q-list bordered separator v-for="menu in this.store.menus" :key="menu.id">
      <q-item clickable v-ripple>
        <q-item-section>
          ID : {{ menu.id }} | Name : {{ menu.name }} | Category :
          {{ menu.category.name }} | Flavour : {{ menu.flavour[0].name }} |
          Toppings : {{ menu.toppings[0].name }} | Image :
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
                menu.category.name,
                menu.flavour[0].name,
                menu.toppings[0].name,
                menu.image.name
              )
            "
          />
          <q-icon
            :name="menu.hidden ? 'visibility_on' : 'visibility_off'"
            color="red"
            @click.stop="store.toggleMenuHidden(menu.id)"
          />
          <q-icon
            name="delete"
            color="red"
            @click.stop="store.deleteMenu(menu.id)"
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
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="categorie in store.categories"
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
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="flavour in store.flavours"
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
        v-model="newMenuTopping"
        label="topping of the menu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="topping in store.toppings"
        :key="topping.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ topping.id }} | Name : {{ topping.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="
                sendToNewMenuTopping(topping.id, topping.name, topping.price)
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
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
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="category in store.categories"
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
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="flavour in store.flavours"
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
        v-model="menuTopping"
        label="topping of the menu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-list
        bordered
        separator
        v-for="topping in store.toppings"
        :key="topping.id"
      >
        <q-item clickable v-ripple>
          <q-item-section>
            ID : {{ topping.id }} | Name : {{ topping.name }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon
              name="+"
              color="red"
              @click.stop="
                sendToMenuTopping(topping.id, topping.name, topping.price)
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
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
      store: useGlobalStateStore(),
      menuName: "",
      menuImage: "",
      menuCategory: "",
      menuFlavour: "",
      menuTopping: "",
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
  methods: {
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
    showUpdateForm(id,name,categories,flavours,toppings,image) {

      this.showForm = true;
      this.menuID = id;
      this.newMenuName = name;
      this.newMenuImage = image;

      this.newMenuCategory = categories;
      this.newMenuFlavours = flavours;
      this.newMenuToppings = toppings;
      this.selectedNewCategory = categories
      this.selectedNewFlavour = flavours
      this.selectedNewTopping = toppings
      console.log(newMenuCategory)
    },
    onSubmitUpdate() {
      this.store.updateMenu(
        this.menuID,
        this.newMenuName,
        this.newMenuImage.name,
        this.selectedNewCategory,
        this.selectedNewFlavour,
        this.selectedNewTopping
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
      this.showForm = false;
    },
    sendToMenuCategory(id, name) {
      this.menuCategory = name;
      this.selectedCategory = { name: name, id: id };
      console.log(this.menuCategory);
      console.log(this.selectedCategory)
    },
    sendToMenuFlavour(id, name, price, image) {
      this.menuFlavour = name;
      this.selectedFlavour = { id: id, name: name, image: image, price: price };
    },
    sendToMenuTopping(id, name, price) {
      this.menuTopping = name;
      this.selectedTopping = { id: id, name: name, price: price };
    },
    sendToNewMenuCategory(id, name) {
      this.newMenuCategory = name;
      this.selectedNewCategory = { name: name, id: id };
      console.log(this.newMenuCategory);
    },
    sendToNewMenuFlavour(id, name, price, image) {
      this.newMenuFlavour = name;
      this.selectedNewFlavour = { id: id, name: name, image: image, price: price };
    },
    sendToNewMenuTopping(id, name, price) {
      this.newMenuTopping = name;
      this.selectedNewTopping = { id: id, name: name, price: price };
    },
    uploadFile() {},
  },
};
</script>

<style scoped></style>
