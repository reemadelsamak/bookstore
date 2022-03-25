<template>
  <div id="wrapper">
    <main>
      <!-- Sidebar -->
      <listComponent />
      <!-- Dynamic Part -->
      <div class="col-md-9">
        <keep-alive>
          <component :is="targetComponent" />
        </keep-alive>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import listComponent from "./listComponent.vue";
import booksComponent from "./booksComponent.vue";
import wishlistComponent from "./wishlistComponent.vue";
export default {
  data: () => ({}),
  methods: {},
  created() {
    this.$store.dispatch("fetchBooks");
  },
  components: {
    listComponent,
    booksComponent,
    wishlistComponent,
  },
  computed: {
    ...mapGetters(["books"]),
    ...mapGetters(["targetComponent"]),
  },
};
</script>
