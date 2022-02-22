<template>
    <a :href="url"> {{ text }} </a>
</template>

<script>

export default {
 name: 'Login',
 props: ['url', 'text']
 
}

</script>

<style lang="scss">
 
</style>