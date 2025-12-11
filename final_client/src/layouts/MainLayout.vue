<template>
  <q-layout view="hHh lpR fFf">
    <q-header v-model="header" reveal elevated bordered>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title>
          <q-badge color="{1:orange}" text-color="{2:black}" label="weak:v1.0.0" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const header = ref(true)
</script>

<style></style>
