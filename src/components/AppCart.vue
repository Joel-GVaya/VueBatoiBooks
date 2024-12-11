<script>
import { store } from '@/stores/store'
export default {
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
        <div class="card" v-for="book in cart">
            <h3>{{ book.moduleCode }} ({{ book.id }})</h3>
            <h4>{{ book.publisher }}</h4>
            <p>{{ book.pages }} páginas</p>
            <p>Estado- {{ book.status }} </p>
            <p>{{ book.status === 'sold' ? `Vendido el ${book.solddate}` : 'En venta' }}</p>
            <p>{{ book.comments }}</p>
            <h4>{{ parseFloat(book.price).toFixed(2) }}€</h4>
            <button class="carrito" @click="delFromCart(book)">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
        </div>

</template>