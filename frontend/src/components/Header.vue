<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Button from './Button.vue';
import LanguageToggle from './LanguageToggle.vue';

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
    sticky w-full p-4
    flex items-center justify-between
    bg-primary-light border-b border-b-primary
    shadow-lg shadow-primary-subtle/50
  ">
    <section>
      <h1 class="font-chulalongkorn font-bold text-3xl text-primary">CU POST-Reg</h1>
    </section>
    <section class="flex gap-3">
      <Button class="font-medium" v-if="props.authenticated">{{ t('logout') }}</Button>
      <LanguageToggle />
    </section>

  </header>
</template>
