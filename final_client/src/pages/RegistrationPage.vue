<template>
  <div class="container">
    <section class="wrapper fixed-center">
      <div class="p-[16px]">
        <p
          class="flex justify-center text-bold font-medium p-[16px]"
          :class="$q.screen.width < mobileWidth ? 'text-xl' : 'text-2xl'"
        >
          Create your account
        </p>
      </div>
      <q-card
        class="p-[24px]"
        :class="$q.screen.width < mobileWidth ? 'w-[300px]' : 'w-[400px]'"
        bordered
      >
        <q-card-section>
          <q-form @submit="register" @mainButton="register" @moveButton="router.push('/login')">
            <q-input
              placeholder="First Name"
              dense
              outlined
              v-model="firstName"
              class="q-mt-sm"
              type="text"
            />
            <q-input
              placeholder="Last Name"
              dense
              outlined
              v-model="lastName"
              class="q-mt-sm"
              type="text"
            />
            <q-input
              placeholder="Email address"
              dense
              outlined
              v-model="email"
              class="q-mt-sm"
              type="text"
            />
            <q-input
              class="q-mt-sm"
              dense
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Password"
            >
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-form>
          <q-btn
            class="q-mt-md w-full text-[12px]"
            color="black"
            no-caps
            label="Register"
            @click="register"
          />
          <q-btn
            class="q-mt-md w-full text-[12px]"
            color="black"
            no-caps
            label="Do you have an account? Log in"
            @click="router.push('/login')"
          />
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { mobileWidth, serverURL } from 'src/boot/config'
import axios from 'axios'
import { errorMessage } from 'src/composables/notify/errorMessage'
// global variables
const $q = useQuasar()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const password = ref('')
const email = ref('')
const isPwd = ref(true)

const register = async () => {
  try {
    const response = await axios.post(`${serverURL}users/weak_register`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      role: 'user',
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
    errorMessage($q, error.response.data.message)
  }
}
</script>
