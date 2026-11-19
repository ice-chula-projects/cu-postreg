<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Header :authenticated="true" />
    <div class="flex flex-1 min-h-0 overflow-hidden">
      <Sidebar />
      <main class="flex-1 min-w-0 overflow-y-auto bg-linear-to-b from-50% from-white via-80% via-[#FFF2F2] to-[#FCDAFF]">
        <RouterView />
      </main>
    </div>
  </div>
</template>
