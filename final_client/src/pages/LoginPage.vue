<template>
  <div class="container">
    <section class="wrapper fixed-center">
      <div class="p-[16px]">
        <p
          class="flex justify-center text-bold font-medium p-[16px]"
          :class="$q.screen.width < mobileWidth ? 'text-xl' : 'text-2xl'"
        >
          Sign in to your account
        </p>
      </div>
      <q-card
        class="p-[24px]"
        :class="$q.screen.width < mobileWidth ? 'w-[300px]' : 'w-[400px]'"
        bordered
      >
        <q-card-section>
          <q-form @submit="login" @mainButton="login" @moveButton="router.push('/registration')">
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
            label="Sign in"
            @click="login"
          />
          <q-btn
            class="q-mt-md w-full text-[12px]"
            color="black"
            no-caps
            label="Do not have an account? Create here"
            @click="router.push('/registration')"
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
import { mobileWidth } from 'src/boot/config'
import { serverURL } from 'src/boot/config'
import axios from 'axios'
import { errorMessage } from 'src/composables/notify/errorMessage'
// global variables
const $q = useQuasar()
const router = useRouter()

const password = ref('')
const email = ref('')
const isPwd = ref(true)

const login = async () => {
  try {
    const response = await axios.post(`${serverURL}users/weak_auth`, {
      email: email.value,
      password: password.value,
    })
    console.log(response.data);
    errorMessage($q, response.data.message)
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>
