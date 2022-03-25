<template>
  <div class="row" v-if="isWishlistVisible">
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
        @click="checkout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
