<template>
    <div>
        <button @click="showOptions()">options</button>
    </div>
</template>

<script>
    export default {
        name: "HeaderComponent",
        methods: {
            showOptions() {
                // сообщение в Background на открытие окна
                console.log('click');
            }
        }

    }
</script>

<style scoped>

</style>
