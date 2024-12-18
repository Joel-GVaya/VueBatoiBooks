<script>
import { store } from '@/stores/store';
import { mapState, mapActions } from 'pinia';
export default {
    computed: {
        ...mapState(store, ['messages'])
    },
    methods: {
        ...mapActions(store, ['delMessage'])
    },


}
</script>

<template>
    <div class="mensajes" v-for="(message, index) in messages">
        <a>{{ message }}</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            @click="delMessage(index)">x</button>
    </div>
</template>