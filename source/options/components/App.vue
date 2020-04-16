<template>
<div>
    <navigation-component></navigation-component>
    <router-view></router-view>
</div>
</template>

<script>
    import NavigationComponent from './NavigationComponent.vue';

    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';


    export default {
        name: 'App',
        data() {
            return {
                text: ''
            }
        },
        components: {
            NavigationComponent
        }
    }
</script>

<style scoped>

</style>
