<script>
import { store } from '@/stores/store'
export default {
    computed: {
        cart() {
            return store.state.cart;
        }
    }
}
</script>

<template>
<div>
    <a>Carro</a>
    <a v-for="item in cart">{{ item }}</a>
</div>

</template>