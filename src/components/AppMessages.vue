<script>
import { store } from '@/stores/store';
export default{
    computed: {
        messages(){
            store.addMessage('Pagina')
            return store.state.messages;
        }
    },
    methods: {
        delMessage(index){
            store.delMessage(index)
        }
    }
}
</script>

<template>
    <div class="mensajes" v-for="(message, index) in messages">
        <a>{{ message }}</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="delMessage(index)">x</button>
    </div>
</template>