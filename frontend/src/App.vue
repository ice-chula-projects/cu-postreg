<script setup lang="ts">
import { provide, ref, type Ref } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';
import type GlobalState from './ts/GlobalState.ts';



const state: GlobalState = {name: "", id: "", loggedIn: false};

//this method doesnt work, needs to be change
provide<Ref<GlobalState>>("state", ref<GlobalState>(state));

</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Header :authenticated="state.loggedIn" />
    <div class="flex flex-1 min-h-0 overflow-hidden">
      <Sidebar v-if="state.loggedIn"/>
      <main class="flex-1 min-w-0 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
