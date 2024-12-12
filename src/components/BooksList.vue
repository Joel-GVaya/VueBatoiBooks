<script>
import { store } from '@/stores/store';
import BookItem from '@/components/BookItem.vue';

export default {
    name: 'BookList',
    components: {
        BookItem,
    },
    computed: {
        books() {
            return store.state.books;
        }
    },
    async mounted() {
        await store.fetchBooks();
    },

    methods: {
        addCart(book) {
            store.addToCart(book)
        },
        async removeDBBook(id) {
            if (confirm('Desea eliminar el libro con id: ' + id)) {
                await store.removeDBBook(id);
                store.fetchBooks();
            }

        },

        async editBook(book) {
            this.$router.push({ name: 'edit', params: { id: book.id } });
        }
    }
}

</script>


<template>
    <div id="list" class="list">
        <book-item v-for="book in books" :key="book.id" :book="book">
            <slot>
                <div>
                    <button class="carrito" @click="addCart(book)">
                        <span class="material-icons">add_shopping_cart</span>
                    </button>
                    <button class="editar" @click="editBook(book)">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="delete" @click="removeDBBook(book.id)">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </slot>
        </book-item>
    </div>
</template>
