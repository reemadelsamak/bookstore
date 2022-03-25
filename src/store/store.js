import { createStore } from 'vuex'
import axios from "axios"
const store = createStore({
    state: {
        books: [],
    },
    getters: {
        books: (state) => state.books,
        formatCurrency(value) {
            return Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
                minimumFractionDigits: 1,
            }).format(value);
        },
    },
    actions: {
        async fetchBooks({ commit }) {
            try {
                const data = await axios.get('http://localhost:5000/books')
                commit('SET_BOOKS', data.data)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

    },
    mutations: {
        SET_BOOKS(state, books) {
            state.books = books
        },
    }
})

export default store
