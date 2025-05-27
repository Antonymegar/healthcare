<template>
  <v-container>
    <v-row class="justify-center mt-6">
      <v-col cols="12" md="8" offset-md="2">
        <v-data-table
          :headers="headers"
          :items="appointments"
          :search="search"
          class="custom-table pa-2"
          elevation="0"
        >
          
          <template #top>
            <v-row class="px-4 pt-4 pb-2" align="center" justify="space-between">
              <v-col cols="12" md="4" class="d-flex align-center">
                <h1 class="text-h6 font-weight-bold mr-4">Appointments</h1>
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
              </v-col>

              <v-col cols="12" md="4" class="d-flex justify-end">
                <v-btn color="primary" @click="dialog = true" prepend-icon="mdi-plus">
                  Book Appointment
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template #item.actions="{ item }">
            <v-btn
              v-if="item.status === 'scheduled'"
              color="error"
              size="small"
              @click="cancelAppointment(item.id)"
            >
              Cancel
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Book Appointment</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              v-model="form.date"
              label="Date"
              type="date"
              required
            />
            <v-text-field
              v-model="form.time"
              label="Time"
              type="time"
              required
            />
            <v-select
              v-model="form.doctor"
              :items="doctors"
              label="Select Doctor"
              item-title="name"
              item-value="id"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="bookAppointment">Book</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

const dialog = ref(false)
const search = ref('')
const appointments = ref([])
const doctors = ref([])
const snackbar = ref({ show: false, text: '', color: '' })
const form = reactive({ date: '', time: '', doctor: '' })

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Doctor', key: 'doctor' },
  { title: 'Date', key: 'date' },
  { title: 'Time', key: 'time' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]


const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await $axios.get('/api/appointments/', {
      headers: { Authorization: `Bearer ${token}` }
    })

    appointments.value = res.data
      .filter(a => a.patient === user.patient_id)
      .map(a => ({
        ...a,
        doctor: typeof a.doctor === 'object'
          ? `Dr. ${a.doctor.user.first_name} ${a.doctor.user.last_name}`
          : `Doctor #${a.doctor}`
      }))
  } catch (err) {
    snackbar.text = 'Failed to load appointments.'
    snackbar.color = 'error'
    snackbar.show = true
  }
}

const fetchDoctors = async () => {
  const token = localStorage.getItem('access_token')
  const res = await $axios.get('/api/doctors/', {
    headers: { Authorization: `Bearer ${token}` }
  })
  doctors.value = res.data.map(doc => ({
    name: `Dr. ${doc.user.first_name} ${doc.user.last_name}`,
    id: doc.id
  }))
}


const cancelAppointment = async (appointmentId) => {
  try {
    const token = localStorage.getItem('access_token')
    await $axios.patch(`/api/appointments/${appointmentId}/`, {
      status: 'cancelled'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    snackbar.text = 'Appointment cancelled.'
    snackbar.color = 'info'
    snackbar.show = true
    await fetchAppointments()
  } catch (err) {
    snackbar.text = 'Failed to cancel appointment.'
    snackbar.color = 'error'
    snackbar.show = true
  }
}

const bookAppointment = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const user = JSON.parse(localStorage.getItem('user'))

    await $axios.post('/api/appointments/', {
      date: form.date,
      time: form.time,
      doctor: form.doctor,
      patient: user.patient_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    snackbar.text = 'Appointment booked successfully!'
    snackbar.color = 'success'
    snackbar.show = true
    dialog.value = false
    await fetchAppointments()
  } catch (err) {
    snackbar.text = err.response?.data?.non_field_errors?.[0] || 'Booking failed.'
    snackbar.color = 'error'
    snackbar.show = true
  }
}

onMounted(() => {
  fetchAppointments()
  fetchDoctors()
})
</script>

<style scoped>
.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}
</style>
