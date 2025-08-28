<template>
  <h1>This the dashboard of {{ authStore.user.fullName }}</h1>
</template>

<script setup>
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
</script>
