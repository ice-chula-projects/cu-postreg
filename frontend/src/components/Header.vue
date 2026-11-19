<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Button from './Button.vue';
import LanguageToggle from './LanguageToggle.vue';
import LogoContainer from './LogoContainer.vue';
import { state } from '@/ts/GlobalState.ts';
import router from '@/router/index.ts';

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      logout: 'Log Out'
    },
    th: {
      logout: 'ออกจากระบบ'
    }
  }
})

function logout(){
  state.value.loggedIn = false;
  router.push("/login");
}
</script>

<template>
  <header class="
    sticky w-full p-4 z-30
    flex items-center justify-between
    bg-primary-light 
    shadow-lg shadow-primary/10
  ">
    <section>
      <LogoContainer />
    </section>
    <section class="flex gap-3">
      <Button class="font-medium" v-if="state.loggedIn" @click="logout">{{ t('logout') }}</Button>
      <LanguageToggle />
    </section>

  </header>
</template>
