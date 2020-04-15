<template>

<div>
   <header-component></header-component>
   <chart-component></chart-component>
</div>

</template>
<script>
import ChartComponent from './ChartComponent.vue';
import HeaderComponent from './HeaderComponent.vue';
    export default {
        components: {
           HeaderComponent: HeaderComponent,
            ChartComponent,
        }

    };
</script>
<style >



</style>
