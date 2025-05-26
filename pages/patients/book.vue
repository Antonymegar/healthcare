
<template>
 <v-container >
 <v-row class="justify-center mt-6 ml-4">
    <v-col cols="12" md="10">
    <v-data-table
      :headers="[
        { title: 'ID', key: 'id' },
        { title: 'Doctor', key: 'doctor' },
        { title: 'Date', key: 'date' }
      ]"
      :items="appointments"
      :search="search"
      class="custom-table pa-2"
      elevation="0"
    >
      <!-- Custom top section in table -->
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
    </v-data-table>
    </v-col>
    </v-row>

    <!-- Book Appointment Dialog -->
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

    <!-- Snackbar -->
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

const appointments = ref([
  { id: 1, doctor: 'Dr. Ahmed', date: '2025-06-01' },
  { id: 2, doctor: 'Dr. Wanjiru', date: '2025-06-10' }
])

const doctors = ['Dr. Ahmed', 'Dr. Wanjiru', 'Dr. Kiprop']

const dialog = ref(false)
const newAppointment = reactive({ doctor: '', date: '' })
const error = ref('')
const snackbar = ref({ show: false, text: '', color: '' })
const form = reactive({
  date: '',
  time: '',
  doctor: '',
})
const bookAppointment = async () => {
  try {
    await $axios.post('/appointments/', {
      date: form.date,
      time: form.time,
      doctor: form.doctor,
    })
    snackbar.text = 'Appointment booked successfully!'
    snackbar.color = 'success'
    snackbar.show = true
    dialog = false
  } catch (err) {
    snackbar.text = err.response?.data?.detail || 'Booking failed.'
    snackbar.color = 'error'
    snackbar.show = true
  }
}
</script>
<style scoped>
.custom-table {
  border: 1px solid #e0e0e0; /* Light gray border */
  border-radius: 12px;
}
</style>

