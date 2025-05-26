<template>
    <v-container fluid class="fill-height pa-0" >
    <v-row no-gutters class="fill-height">
      
      <!-- Left image section -->
      <v-col cols="12" md="5" class="d-none d-md-flex">
        <v-img
          src="/images/register.jpeg"
          class="rounded-0"
          cover
        >
          <div class="d-flex flex-column justify-end pa-6 white--text" style="height: 100%;">
                <div class="text-h6 font-weight-bold text-white">
                “The Best Digital Health Platform”
                </div>
                <div class="text-caption text-white">
                Linda Afya<br />Covering Universal Healthcare for you !
                </div>

          </div>
        </v-img>
      </v-col>

      <!-- Right form section -->
      <v-col cols="12" md="7" class="d-flex align-center justify-center">
        <v-card flat class="pa-6" width="100%" max-width="800">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Welcome  to <span class="text-primary">DigiHealth</span>
          </v-card-title>
          <v-card-subtitle class="mb-6">
            Get Health Cover for Life .
          </v-card-subtitle>

          <v-form @submit.prevent="register">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="form.first_name" label="First Name"  class="custom-text-field" required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field  variant="outlined" v-model="form.last_name" label="Last Name" class="custom-text-field" required />
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="form.email" label="Email" type="email" class="custom-text-field" required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field  variant="outlined" v-model="form.username" label="Username" class="custom-text-field" required />
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" md="6">
                    <v-text-field  variant="outlined" v-model="form.password" label="Password"  class="custom-text-field" type="password" required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-select :items="['patient', 'doctor']" variant="outlined" v-model="form.role" label="Role" required  class="custom-text-field"/>
                </v-col>
                </v-row>

            <v-btn
              type="submit"
              color="primary"
              class="mt-4 mb-2 rounded-lg"
              block
            >
              Register 
            </v-btn>


            <div class="text-center mt-4">
              <span>Have an account?</span>
              <NuxtLink to="/login" class="text-primary font-weight-medium"> Sign in</NuxtLink>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000">
        {{ snackbar.text }}
      </v-snackbar>
      </v-container>
  </template>
  
  <script setup>
  const { $axios } = useNuxtApp()
  
  const form = reactive({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    password: '',
  })
  
  const snackbar = reactive({
    show: false,
    text: '',
    color: 'success',
  })
  
  const register = async () => {
    try {
      await $axios.post('/register/', form)
      snackbar.text = 'Registration successful!'
      snackbar.color = 'success'
      snackbar.show = true
    } catch (err) {
      snackbar.text = err.response?.data?.detail || 'Registration failed.'
      snackbar.color = 'error'
      snackbar.show = true
    }
  }
  </script>
  <style scoped>
  .custom-text-field .v-field--focused .v-field__outline {
    border-color: #1976D2 !important;
  }
  </style>
  