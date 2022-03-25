<template>
  <!-- Navbar -->
  <nav
    class="d-flex bg-dark text-light justify-content-between align-items-baseline py-2 px-4"
  >
    <a href="" style="color: yellow; text-decoration: none; font-weight: bold"
      >Books</a
    >
    <div class="d-flex align-items-baseline">
      <p>
        {{ wishlist.items.length }}
        {{ wishlist.items.length == 1 ? "item" : "items" }} , Total Price={{
          formatCurrency(getTotalPrice())
        }}
      </p>
      <button
        class="btn btn-primary mx-3"
        v-text="isWishlistVisible ? 'Books' : 'My Wishlist'"
        @click="wishlistBtn"
      ></button>
    </div>
  </nav>
</template>

<script>
// import store from "vuex";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({}),
  methods: {
    wishlistBtn() {
      this.isWishlistVisible
        ? this.set_targetComponent("booksComponent")
        : this.set_targetComponent("wishlistComponent");

      this.set_isWishlistVisible(!this.isWishlistVisible);
    },
    getTotalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.wishlist.items.length; i++) {
        totalPrice += this.wishlist.items[i].book.price.value;
      }
      return totalPrice;
    },
    formatCurrency(value) {
      return Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 1,
      }).format(value);
    },
    ...mapMutations(["set_isWishlistVisible"]),
    ...mapMutations(["set_targetComponent"]),
  },
  created() {
    this.$store.dispatch("fetchBooks");
  },
  components: {},
  computed: {
    ...mapGetters(["books"]),
    ...mapGetters(["isWishlistVisible"]),
    ...mapGetters(["targetComponent"]),
    ...mapGetters(["wishlist"]),
  },
};
</script>
