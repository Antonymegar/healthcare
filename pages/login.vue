<template>
    <v-container fluid class="fill-height pa-0">
     <LoginForm />
    </v-container>
</template>

<script setup>
import LoginForm from '~/components/LoginForm.vue';
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>