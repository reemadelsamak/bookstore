<template>
  <navComponent />
  <bodyComponent />
</template>

<script>
import bodyComponent from "./components/bodyComponent.vue";
import navComponent from "./components/navComponent.vue";
export default {
  data: () => ({}),
  methods: {},
  components: {
    bodyComponent,
    navComponent,
  },
};
</script>
