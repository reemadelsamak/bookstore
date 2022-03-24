<template>
  <div id="wrapper">
    <!-- Modal -->
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Purchase</h5>
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
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="confirmCheckout"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <nav
      class="
        d-flex
        bg-dark
        text-light
        justify-content-between
        align-items-baseline
        py-2
        px-4
      "
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
          @click="wishlistBtn"
          v-text="isWishlistVisible ? 'Books' : 'My Wishlist'"
        ></button>
      </div>
    </nav>

    <main>
      <!-- Sidebar -->
      <div class="col-md-3 d-flex flex-column flex-shrink-0 bg-white">
        <h5
          class="
            d-flex
            flex-shrink-0
            p-3
            link-dark
            text-decoration-none
            border-bottom
            text-center
            align-self-center
          "
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
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">{{ book.title }}</strong>
              <small class="text-muted">{{
                formatCurrency(book.price.value)
              }}</small>
            </div>
            <div class="col-10 mb-1 small">Category : {{ book.category }}</div>
          </li>
        </ul>
      </div>

      <!-- Books -->
      <div class="col-md-9">
        <div
          class="row mt-4 d-flex justify-content-center"
          v-if="!isWishlistVisible"
        >
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
                <span class="text-secondary">Category: </span
                >{{ book.category }}
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
                <span class="text-secondary fw-normal">Pages:</span
                >{{ book.pages }}
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

        <!-- Wishlist -->
        <div class="row" v-if="isWishlistVisible">
          <h2
            v-if="wishlist.items.length == 0"
            class="col-md-12 text-center mt-4"
          >
            Your Wishlist is Empty, Add Some Books
          </h2>
          <div v-else class="d-flex flex-column align-items-center">
            <table
              class="
                table table-striped table-bordered table-responsive-md
                text-center
                w-75
                mt-4
                mx-auto
              "
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
                    <button
                      class="btn btn-danger"
                      @click="deleteFromWishlist(item)"
                    >
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
              @click="checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <!-- End of Wishlist -->
    </main>
  </div>
</template>

<script>
import books from "../books";
export default {
  data: () => ({
    books: books,
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
      return Intl.NumberFormat("ar-SA", {
        style: "currency",
        currency: "SAR",
        minimumFractionDigits: 1,
      }).format(value);
    },
  },
};
</script>














