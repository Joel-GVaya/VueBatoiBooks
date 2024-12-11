<script>
import { store } from '@/stores/store';

export default {
    props: ['book'],

    methods: {
        addCart(code){
            store.addToCart(code)
        },
        async removeDBBook(id){
            if(confirm('Desea eliminar el libro con id: ' + id)){
                await store.removeDBBook(id);
                store.fetchBooks();
            }
            
        }
    }
}
</script>

<template>
    <div>

        <div class="card">
            <h3>{{ book.moduleCode }} ({{ book.id }})</h3>
            <h4>{{ book.publisher }}</h4>
            <p>{{ book.pages }} páginas</p>
            <p>Estado- {{ book.status }} </p>
            <p>{{ book.status === 'sold' ? `Vendido el ${book.solddate}` : 'En venta' }}</p>
            <p>{{ book.comments }}</p>
            <h4>{{ parseFloat(book.price).toFixed(2) }}€</h4>
            <button class="carrito" @click="addCart(book.id)">
                <span class="material-icons">add_shopping_cart</span>
            </button>
            <button class="editar">
                <span class="material-icons">edit</span>
            </button>
            <button class="delete" @click="removeDBBook(book.id)">
                <span class="material-icons">delete</span>
            </button>
        </div>
    </div>
</template>