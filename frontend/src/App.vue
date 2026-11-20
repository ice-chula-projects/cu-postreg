<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';
import { state } from './ts/GlobalState.ts';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { computeLevenshteinDistance } from './ts/autocomplete.ts';

const storedState = sessionStorage.getItem("state");
if(storedState != null) state.value = JSON.parse(storedState);

watch(state, () => {
  sessionStorage.setItem("state", JSON.stringify(state.value));
}, {deep: true})

const { t } = useI18n({
  useScope: "global",
  messages: {
    en: {
      officeOfTheRegistrar: "OFFICE OF THE REGISTRAR",
      chulalongkornUniversity: "Chulalongkorn University",
    },
    th: {
      officeOfTheRegistrar: "สำนักงานการทะเบียน",
      chulalongkornUniversity: "จุฬาลงกรณ์มหาวิทยาลัย",
    },
  }
})

</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Header />
    <div class="flex flex-1 min-h-0 overflow-hidden">
      <Sidebar v-if="state.loggedIn"/>
      <main class="flex-1 min-w-0 overflow-y-auto bg-linear-to-b from-50% from-white via-80% via-[#FFF2F2] to-[#FCDAFF]">
        <RouterView />
      </main>
    </div>
  </div>
</template>
