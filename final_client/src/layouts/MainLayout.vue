<template>
  <q-layout view="hHh lpR fFf" >
    <q-header v-model="header" reveal elevated bordered>
      <q-toolbar class="bg-black text-white">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>
     <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
     </q-page-container>
  </q-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>
