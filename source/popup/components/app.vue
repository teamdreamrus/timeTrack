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

   ::-webkit-scrollbar {
      width: 7px;
   }

   /* Track */
   ::-webkit-scrollbar-track {
      background: #574a6f;
   }

   /* Handle */
   ::-webkit-scrollbar-thumb {
      background: #e5e5e5;
   }

   /* Handle on hover */
   ::-webkit-scrollbar-thumb:hover {
      background: #b097e2;
   }

</style>
