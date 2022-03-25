<template>
  <confirmPurchaceModal />
  <div class="row mt-4 d-flex justify-content-center">
    <h2 v-if="wishlist.items.length == 0" class="col-md-12 text-center mt-4">
      Your Wishlist is Empty, Add Some Books
    </h2>
    <div v-else class="d-flex flex-column align-items-center">
      <table
        class="table table-striped table-bordered table-responsive-md text-center w-75 mt-4 mx-auto"
      >
        <thead>
          <th>Book Title</th>
          <th>Book Author</th>
          <th>Actions</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr v-for="item in wishlist.items" :key="item.book.ISBN">
            <td>{{ item.book.title }}</td>
            <td>{{ item.book.author }}</td>
            <td>
              <button class="btn btn-danger" @click="deleteFromWishlist(item)">
                Remove
              </button>
            </td>
            <td>{{ formatCurrency(item.book.price.value) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td class="text-right">
              Total Price = <b>{{ formatCurrency(getTotalPrice()) }}</b>
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        id="checkout"
        class="btn btn-success"
        style="width: fit-content"
        data-bs-toggle="modal"
        data-bs-target=".modal"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import confirmPurchaceModal from "./confirmPurchaceModal.vue";
export default {
  data: () => ({}),
  methods: {
    ...mapMutations(["deleteFromWishlist"]),
    ...mapMutations(["checkout"]),
    ...mapMutations(["confirmCheckout"]),
    ...mapMutations(["closeModal"]),

    formatCurrency(value) {
      return Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 1,
      }).format(value);
    },
    getTotalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.wishlist.items.length; i++) {
        totalPrice += this.wishlist.items[i].book.price.value;
      }
      return totalPrice;
    },
  },
  created() {
    this.$store.dispatch("fetchBooks");
  },
  components: { confirmPurchaceModal },
  computed: {
    ...mapGetters(["books"]),
    ...mapGetters(["wishlist"]),
  },
};
</script>
