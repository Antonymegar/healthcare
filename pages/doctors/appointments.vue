

<template>
  <v-container>
    <v-row class="justify-center mt-6">
      <v-col cols="12" md="8" offset-md="2">
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="custom-table pa-2"
          item-value="patient"
        >
          <!-- Custom Table Top -->
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

          <!-- Custom Status Chip -->
          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark small>
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
definePageMeta({
  layout: 'navbar',
})

const search = ref('')
const headers = [
  { title: 'Patient Name', key: 'patient' },
  { title: 'Date', key: 'date' },
  { title: 'Status', key: 'status' },
]

const items = [
  { patient: 'John Doe', date: '2025-06-01', status: 'Confirmed' },
  { patient: 'Jane Smith', date: '2025-06-02', status: 'Pending' },
  { patient: 'Ali Mwangi', date: '2025-06-05', status: 'Completed' },
]
function getStatusColor(status) {
  switch (status) {
    case 'Confirmed': return 'green'
    case 'Pending': return 'orange'
    case 'Completed': return 'blue'
    default: return 'grey'
  }
}
</script>
<style scoped>
.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}
</style>