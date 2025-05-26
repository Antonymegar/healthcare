<template>
    <v-container fluid class="fill-height pa-0">
     <RegisterForm />
    </v-container>
</template>

<script setup>
import RegisterForm from '~/components/RegisterForm.vue';
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>