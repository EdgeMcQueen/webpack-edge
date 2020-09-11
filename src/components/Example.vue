<template>
    <div class="wrapper">
        <h1>{{ message }}</h1>
        <h2>second headline</h2>
        <img src="/assets/img/You.jpg" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null
        }
    },
    created() {
        this.message = this.$store.getters.getMessage
    },
}
</script>

<style lang="scss">
    h1 {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: red;
    }
</style>