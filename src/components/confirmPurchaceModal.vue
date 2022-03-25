<template>
  <!-- Modal -->
  <div class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="text-center">Confirm Purchase</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to purchase all the books ?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="emptyWishlist"
            data-bs-dismiss="modal"
          >
            Confirm
          </button>
          <button class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["emptyWishlist"]),
  },
};
</script>
