<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Button from './Button.vue';
import LanguageToggle from './LanguageToggle.vue';
import LogoContainer from './LogoContainer.vue';
import type GlobalState from '@/ts/GlobalState';
import { inject, type Ref } from 'vue';

const state: Ref<GlobalState> = inject("state") as Ref<GlobalState>;

const props = withDefaults(defineProps<{
  authenticated?: boolean
}>(), {
  authenticated: false,
})

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
      <Button class="font-medium" v-if="props.authenticated" @click="() => state.loggedIn = false"><RouterLink to="/login">{{ t('logout') }}</RouterLink></Button>
      <LanguageToggle />
    </section>

  </header>
</template>
