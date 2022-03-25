import { createStore } from 'vuex'
import axios from "axios"

const store = createStore({
    state: {
        books: [],
        isWishlistVisible: false,
        targetComponent: "booksComponent",
        existsInWishlist: false,
        wishlist: {
            items: [],
        },
    },
    getters: {
        books: (state) => state.books,
        isWishlistVisible: (state) => state.isWishlistVisible,
        targetComponent: (state) => state.targetComponent,
        existsInWishlist: (state) => state.existsInWishlist,
        wishlist: (state) => state.wishlist,

    },
    actions: {
        async fetchBooks({ commit }) {
            try {
                const data = await axios.get('http://localhost:5000/books')
                commit('set_books', data.data)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
    mutations: {
        set_books(state, books) {
            state.books = books
        },
        set_isWishlistVisible(state, isVisible) {
            state.isWishlistVisible = isVisible
        },
        set_existsInWishlist(state, exists) {
            state.existsInWishlist = exists
        },
        set_targetComponent(state, target) {
            state.targetComponent = target
        },
        addToWishlist(state, book) {
            state.wishlist.items.push({
                book: book,
            });
        },
        deleteFromWishlist(state, item) {
            state.wishlist.items.splice(
                state.wishlist.items.findIndex(
                    (Iitem) => Iitem.book.ISBN == item.book.ISBN
                ),
                1
            );
        },
        emptyWishlist(state) {
            state.wishlist.items = [];
        },
    }
})

export default store
