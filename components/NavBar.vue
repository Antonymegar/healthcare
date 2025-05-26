<template>
  <v-navigation-drawer app permanent class="d-flex flex-column">

    <!-- Top Section: Welcome -->
    <div class="pa-4">
      <h3 class="text-h6 font-weight-bold text-primary">Welcome back!</h3>
    </div>

    <!-- Main Navigation List with flex-grow -->
  <v-list dense nav class="flex-grow-1">
  <v-list-item to="/doctors/appointments" exact>
    <template #prepend>
      <v-icon class="mr-3 text-black">mdi-calendar-clock</v-icon>
    </template>
    <v-list-item-title>Appointments</v-list-item-title>
  </v-list-item>

  <v-list-item to="/patients/book" exact>
    <template #prepend>
      <v-icon class="mr-3 text-black">mdi-book-open-page-variant</v-icon>
    </template>
    <v-list-item-title>Bookings</v-list-item-title>
  </v-list-item>
</v-list>


    <!-- Bottom Section: Avatar Menu -->
    <template #append>
      <v-divider class="mt-2 mb-2" />
    <div class="pa-4 mt-auto d-flex justify-center">
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
          <div class="text-subtitle-2 ml-5 font-weight-medium">Colton Shierdan</div>
          <div class="text-caption ml-3">colton@unimatrixui.com</div>
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

const goToProfile = () => {
  router.push('/profile')
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
