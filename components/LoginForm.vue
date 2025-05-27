<template>
    <v-container fluid class="fill-height pa-0" >
    <v-row no-gutters class="fill-height">
      
      <v-col cols="12" md="5" class="d-none d-md-flex">
        <v-img
          src="/images/login.jpeg"
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
            Login to View your records.
          </v-card-subtitle>

          <v-form @submit.prevent="login">
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
                </v-row>
            <div class="d-flex justify-space-between align-center mt-2 mb-2">
              <v-btn variant="text" class="text-purple">Forgot password?</v-btn>
            </div>

            <v-btn
              type="submit"
              color="primary"
              class="mt-4 mb-2 rounded-lg"
              block
            >
              login
            </v-btn>

            <div class="text-center mt-4">
              <span>Don't have an account?</span>
              <NuxtLink to="/register" class="text-primary font-weight-medium"> Sign up</NuxtLink>
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
  const { $config, $axios } = useNuxtApp()
  const router = useRouter()

  const form = reactive({
    username: '',
    email: '',
    password: '',
  })
  
  const snackbar = reactive({
    show: false,
    text: '',
    color: 'success',
  })
  
  const login = async () => {
  try {
    const payload = {
      grant_type: 'password',
      username: form.username,
      password: form.password,
      email:form.email,
      client_id: $config.public.oauthClientId,
      client_secret: $config.public.oauthClientSecret
    }

    
    const tokenResponse = await $axios.post('o/token/', payload, {
      headers: { 'Content-Type': 'application/json' }
    })

    const accessToken = tokenResponse.data.access_token
    localStorage.setItem('access_token', accessToken)

    const userResponse = await $axios.get('api/user-profile/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    const user = userResponse.data
    console.log("Iam user", user)
    localStorage.setItem('user', JSON.stringify(user))

  
    snackbar.text = 'Login successful!'
    snackbar.color = 'success'
    snackbar.show = true

  
    if (user.role === 'doctor') {
      router.push('/doctors/appointments')
    } else if (user.role === 'patient') {
      router.push('/patients/book')
    } else {
      router.push('/')
    }

  } catch (err) {
    console.error(err)
    snackbar.text = err.response?.data?.error_description || 'Login failed.'
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
  