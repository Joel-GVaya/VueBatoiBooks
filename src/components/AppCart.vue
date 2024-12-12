<script>
import { store } from '@/stores/store'
import BookItem from './BookItem.vue';
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
        delFromCart(book){
            store.delFromCart(book)
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