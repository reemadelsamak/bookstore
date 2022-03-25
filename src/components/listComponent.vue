<template>
  <div class="col-md-3 d-flex flex-column flex-shrink-0 bg-white">
    <h5
      class="d-flex flex-shrink-0 p-3 link-dark text-decoration-none border-bottom text-center align-self-center"
    >
      Books list
    </h5>
    <ul class="list-group list-group-flush border-bottom scrollarea">
      <li
        class="list-group-item list-group-item-action py-3 lh-tight"
        v-for="book in books"
        :key="book.ISBN"
        :title="book.author"
      >
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">Title: {{ book.title }}</strong>
          <small class="text-muted">{{
            formatCurrency(book.price.value)
          }}</small>
        </div>
        <div class="col-10 mb-1 small">Category : {{ book.category }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.$store.dispatch("fetchBooks");
  },
  methods: {
    formatCurrency(value) {
      return Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 1,
      }).format(value);
    },
  },
  computed: {
    ...mapGetters(["books"]),
  },
};
</script>
