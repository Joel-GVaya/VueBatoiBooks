<script>
import { store } from '@/stores/store';
import BookItem from '@/components/BookItem.vue';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'BookList',
    components: {
        BookItem,
    },
    computed: {
        ...mapState(store, ['books'])
    },
    async mounted() {
        await this.fetchBooks();
        await this.fetchModules();
    },

    methods: {
        ...mapActions(store, ['fetchBooks', 'addToCart', 'removeDBBook', 'fetchModules', 'loadCartFromLocalStorage']),

        async eliminarDBBook(id) {
            if (confirm('Desea eliminar el libro con id: ' + id)) {
                await this.removeDBBook(id);
                this.fetchBooks();
            }

        },

        async editBook(book) {
            this.$router.push({ name: 'edit', params: { id: book.id } });
        },
    }
}

</script>


<template>
    <div id="list" class="list">
        <book-item v-for="book in books" :key="book.id" :book="book">
            <slot>
                <div>
                    <button class="carrito" @click="addToCart(book)">
                        <span class="material-icons">add_shopping_cart</span>
                    </button>
                    <button class="editar" @click="editBook(book)">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="delete" @click="eliminarDBBook(book.id)">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </slot>
        </book-item>
    </div>
</template>
