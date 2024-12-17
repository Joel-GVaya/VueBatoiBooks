<script>
import { store } from '@/stores/store'
import BookItem from './BookItem.vue';
import { useMessagesStore } from '@/stores/store';
import { mapActions } from 'pinia';
export default {
        components: {
        BookItem,
    },
    computed: {
        cart() {
            return store.state.cart;
        }
    },
    methods: {
        ...mapActions(useMessagesStore, ['addMessage']),
        delFromCart(book){
            store.delFromCart(book)
            this.addMessage('Se ha eliminado el libro ' + book.id + ' del carrito correctamente')
        }
    }
    
}
</script>

<template>
        <div id="list" class="list">
            <book-item v-for="book in cart" :book="book">
                <slot>
                    <div>
                <button class="delete" @click="delFromCart(book)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
                </slot>
            </book-item>
    </div>
</template>