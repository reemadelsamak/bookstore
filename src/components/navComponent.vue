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
        <!-- {{ wishlist.items.length }}
        {{ wishlist.items.length == 1 ? "item" : "items" }} , Total Price={{
          formatCurrency(getTotalPrice())
        }} -->
      </p>
      <!-- <button
        class="btn btn-primary mx-3"
        @click="wishlistBtn"
        v-text="isWishlistVisible ? 'Books' : 'My Wishlist'"
      ></button> -->
    </div>
  </nav>
</template>
