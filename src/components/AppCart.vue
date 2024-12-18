<script>
import { store } from '@/stores/store'
import BookItem from './BookItem.vue';
import { mapActions, mapState } from 'pinia';
export default {
    components: {
        BookItem,
    },
    computed: {
        ...mapState(store, ['cart'])
    },
    methods: {
        ...mapActions(store, ['addMessage', 'delFromCart', 'getNumberProductsOnCart', 'delAllCart', 'getTotalPriceOnCart', 'loadCartFromLocalStorage']),
        delFromCarro(book) {
            this.delFromCart(book)
            this.addMessage('Se ha eliminado el libro ' + book.id + ' del carrito correctamente')
        }
    },

    mounted() {
        this.loadCartFromLocalStorage();
    }

}
</script>

<template>
    <div><br>
        <button class="buy">
            <span class="material-icons">credit_card</span>
        </button>
        <button class="buy">
            <span class="material-icons" @click="this.delAllCart()">delete_forever</span>
        </button>
    </div>
    <div id="list" class="list">
        <book-item v-for="book in cart" :book="book">
            <slot>
                <div>
                    <button class="delete" @click="delFromCarro(book)">
                        <span class="material-icons">remove_shopping_cart</span>
                    </button>
                </div>
            </slot>
        </book-item>
    </div>
    <div>
        <h2>Total de productos: {{ this.getNumberProductsOnCart() }}</h2>
        <h2>Precio total: {{ this.getTotalPriceOnCart() }}€</h2>
    </div>
</template>