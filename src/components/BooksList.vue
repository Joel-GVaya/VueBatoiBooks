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
    }

};
</script>


<template>
    <div id="list" class="list">
        <div>
            <book-item v-for="book in books" :key="book.id ":book="book"></book-item>
        </div>
    </div>
</template>
