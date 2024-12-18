<script>
import { store } from '@/stores/store';
import AddBook from './AddBook.vue';
import { mapActions } from 'pinia';

export default {
    props: ['book'],

    methods: {
        ...mapActions(store, ['addMessage', 'getModuleNameById', 'fetchModules']),
    }

    
}
</script>

<template>
        <div class="card">
            <h3>ID - {{ book.id }}</h3>
            <h4>Módulo - {{ this.getModuleNameById(book.moduleCode)  }}</h4>
            <h4>{{ book.publisher }}</h4>
            <p>{{ book.pages }} páginas</p>
            <p>Estado- {{ book.status }} </p>
            <p>{{ book.status === 'sold' ? `Vendido el ${book.solddate}` : 'En venta' }}</p>
            <p>{{ book.comments }}</p>
            <h4>{{ parseFloat(book.price).toFixed(2) }}€</h4>
            <slot></slot>

        </div>
</template>