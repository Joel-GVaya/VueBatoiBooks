<script>

export default {
    props: ['module'],
}
</script>

<template>
    <option :value="module.id">{{ module.vliteral }}</option>
</template>