<template>
  <v-navigation-drawer app permanent class="d-flex flex-column">

    <div class="pa-4">
      <h3 class="text-h6 font-weight-bold text-primary">Welcome back!</h3>
    </div>

    <v-list dense nav class="flex-grow-1">
      <v-list-item
        v-if="userRole === 'doctor'"
        to="/doctors/appointments"
        exact
      >
        <template #prepend>
          <v-icon class="mr-3 text-black">mdi-calendar-clock</v-icon>
        </template>
        <v-list-item-title>Appointments</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="userRole === 'patient'"
        to="/patients/book"
        exact
      >
        <template #prepend>
          <v-icon class="mr-3 text-black">mdi-book-open-page-variant</v-icon>
        </template>
        <v-list-item-title>Bookings</v-list-item-title>
      </v-list-item>
    </v-list>

    <template #append>
      <v-divider class="mt-2 mb-2" />
      <div class="pa-4 mt-auto d-flex align-center">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-avatar
              v-bind="props"
              color="primary"
              size="48"
              class="cursor-pointer"
            >
              <v-img src="/images/user.png" alt="User" />
            </v-avatar>
            <div>
              <div class="text-subtitle-2 ml-5 font-weight-medium">{{ userName }}</div>
              <div class="text-caption ml-3">{{ userEmail }}</div>
            </div>
          </template>

          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-title>
                <v-icon start class="mr-2">mdi-account-circle</v-icon>
                View Profile
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon start class="mr-2">mdi-logout</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
const router = useRouter()

const user = ref(null)
if (process.client) {
  const storedUser = localStorage.getItem('user')
  user.value = storedUser ? JSON.parse(storedUser) : null
}

const userRole = computed(() => {
  if (!user.value) return null
  return user.value.role
})
const userName = computed(() => {
  if (!user.value) return ''
  return `${user.value.first_name} ${user.value.last_name}`
})
const userEmail = computed(() => {
  if (!user.value) return ''
  return user.value.email
})

const goToProfile = () => {
  router.push('/profile')
}

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
