<template>
  <div class="row mt-4 d-flex justify-content-center">
    <div
      v-for="book in books"
      :key="book.ISBN"
      class="card p-2 m-2"
      style="width: 20rem"
    >
      <img
        :src="book.image"
        :title="book.title"
        class="card-img-top"
        style="height: 25rem"
      />
      <h4 class="card-header text-center">{{ book.title }}</h4>
      <div class="d-flex justify-content-between">
        <p class="mt-2 d-flex">
          <span class="text-secondary">Category: </span>{{ book.category }}
        </p>
        <p class="mt-2 d-flex">
          <span class="text-secondary">Author: </span>{{ book.author }}
        </p>
      </div>
      <p class="mt-2 d-flex">
        <span class="text-secondary">ISBN: </span>{{ book.ISBN }}
      </p>

      <div class="d-flex justify-content-between">
        <p
          class="mt-2 d-flex justify-content-center fw-bold"
          :class="[
            book.pages < 50 ? 'less' : '',
            book.pages >= 50 ? 'more' : '',
          ]"
        >
          <span class="text-secondary fw-normal">Pages:</span>{{ book.pages }}
        </p>
        <p class="mt-2 d-flex fw-bold">
          <span class="text-secondary fw-normal">Price: </span
          >{{ formatCurrency(book.price.value) }}
        </p>
      </div>
      <button
        id="checkout"
        class="btn btn-primary"
        :disabled="checkExists(book)"
        @click="addToWishlist(book)"
      >
        Add to wishlist
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({}),
  methods: {
    checkExists(book) {
      return this.wishlist.items.some((Iitem) => Iitem.book.ISBN === book.ISBN);
    },
    ...mapMutations(["addToWishlist"]),
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
  components: {},
  computed: {
    ...mapGetters(["books"]),
    ...mapGetters(["wishlist"]),
  },
};
</script>
