<script setup>
definePageMeta({ layout: 'navbar' })

const user = ref(null)

if (process.client) {
  const storedUser = localStorage.getItem('user')
  user.value = storedUser ? JSON.parse(storedUser) : null
}
</script>

<template>
  <v-container>
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="3">
          <v-row align="center" class="mb-4">
            <v-avatar size="64">
              <v-img src="/images/user.png" />
            </v-avatar>
            <div class="ml-4">
              <h2 class="text-h6 font-weight-bold">{{ user?.first_name }} {{ user?.last_name }}</h2>
              <p class="text-caption">{{ user?.email }}</p>
            </div>
          </v-row>

          <v-divider class="mb-4" />

          <v-list dense>
            <v-list-item>
              <v-list-item-title>
                <strong>Role:</strong> {{ user?.role }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <strong>User ID:</strong> {{ user?.id }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="user?.role === 'patient'">
              <v-list-item-title>
                <strong>Patient ID:</strong> {{ user?.patient_id }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="user?.role === 'doctor'">
              <v-list-item-title>
                <strong>Doctor ID:</strong> {{ user?.doctor_id }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-caption {
  color: gray;
}
</style>

