<template>
  <div id="wrapper">

    <navComponent />

    <main>
      <!-- Sidebar -->

      <listComponent />
      <div class="col-md-9">
        <booksComponent />
        <wishlistComponent />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navComponent from "./navComponent.vue";
import listComponent from "./listComponent.vue";
import booksComponent from "./booksComponent.vue";
import wishlistComponent from "./wishlistComponent.vue";
export default {
  data: () => ({
    isWishlistVisible: false,
    existsInWishlist: false,
    wishlist: {
      items: [],
    },
  }),
  methods: {
    wishlistBtn() {
      this.isWishlistVisible = !this.isWishlistVisible;
    },
    addToWishlist(book) {
      this.wishlist.items.push({
        book: book,
      });
    },
    checkExists(book) {
      return this.wishlist.items.some((Iitem) => Iitem.book.ISBN === book.ISBN);
    },
    getTotalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.wishlist.items.length; i++) {
        totalPrice += this.wishlist.items[i].book.price.value;
      }
      return totalPrice;
    },
    deleteFromWishlist(item) {
      this.wishlist.items.splice(
        this.wishlist.items.findIndex(
          (Iitem) => Iitem.book.ISBN == item.book.ISBN
        ),
        1
      );
    },
    checkout() {
      var myModal = new bootstrap.Modal(document.querySelector(".modal"), {});
      myModal.toggle();
    },
    confirmCheckout() {
      this.wishlist.items = [];
      document.querySelector(".modal-backdrop").remove();
    },
    closeModal() {
      document.querySelector(".modal-backdrop").remove();
    },
    formatCurrency(value) {
      return Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 1,
      }).format(value);
    },
  },
  created() {
    this.$store.dispatch("fetchBooks");
  },
  components: {
    navComponent,
    listComponent,
    booksComponent,
    wishlistComponent,
  },
  computed: {
    ...mapGetters(["books"]),
  },
};
</script>
