<template>
  <v-container>
    <v-row class="justify-center mt-6">
      <v-col cols="12" md="8" offset-md="2">
        <v-data-table
          :headers="headers"
          :items="appointments"
          :search="search"
          class="custom-table pa-2"
          item-value="patient"
        >
          <template #top>
            <v-row align="center" class="px-4 pt-4" style="gap: 24px;">
              <h3 class="text-h8 font-weight-bold">Appointments</h3>
              <v-text-field
                v-model="search"
                label="Search"
                variant="outlined"
                density="compact"
                hide-details
                prepend-inner-icon="mdi-magnify"
                class="ma-0 ml-4"
                style="max-width: 180px;"
              />
            </v-row>
          </template>

          
          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark small>
              {{ item.status }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              v-if="item.status === 'scheduled'"
              color="primary"
              size="small"
              @click="markAsCompleted(item.id)"
            >
              Mark as Completed
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="4000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
definePageMeta({ layout: 'navbar' })
const { $config, $axios } = useNuxtApp()
const search = ref('')
const snackbar = ref({ show: false, text: '', color: '' })
const appointments = ref([])

const headers = [
  { title: 'Patient Name', key: 'patient_name' },
  { title: 'Date', key: 'date' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled': return 'orange'
    case 'completed': return 'green'
    case 'cancelled': return 'red'
    default: return 'grey'
  }
}

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await $axios.get('/api/appointments/', {
      headers: { Authorization: `Bearer ${token}` }
    })

    appointments.value = res.data
      .filter(a => a.doctor === user.doctor_id)
      .map(a => ({
        ...a,
        patient_name: typeof a === 'object'
          ? `${a.patient_name}`
          : `${a.patient_name}`
      }))
  } catch (err) {
    snackbar.value = {
      show: true,
      color: 'error',
      text: 'Failed to load appointments.'
    }
  }
}

const markAsCompleted = async (appointmentId) => {
  try {
    const token = localStorage.getItem('access_token')
    await $axios.patch(`/api/appointments/${appointmentId}/`, {
      status: 'completed'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    snackbar.value = {
      show: true,
      color: 'success',
      text: 'Appointment marked as completed.'
    }

    await fetchAppointments()
  } catch (err) {
    snackbar.value = {
      show: true,
      color: 'error',
      text: 'Could not update appointment.'
    }
  }
}

onMounted(() => {
  fetchAppointments()
})
</script>

<style scoped>
.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}
</style>
