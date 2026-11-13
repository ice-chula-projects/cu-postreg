<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageToggle from './components/LanguageToggle.vue';
import Button from './components/Button.vue';
import Header from './components/Header.vue';

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      title: 'Welcome',
      description: 'Welcome to our application.',
      button: 'Get Started',
    },
    th: {
      title: 'ยินดีต้อนรับ',
      description: 'ยินดีต้อนรับเข้าแอปปลิเคชั่นของพวกเรา',
      button: 'เรื่มต้นเลย',
    },
  },
})
</script>

<template>
  <Header :authenticated="true" />
  <h1 class="font-bold font-chulalongkorn text-2xl text-primary">{{ t('title') }}!</h1>
  <p>
    {{ t('description') }}
  </p>
  <Button>
    {{ t('button') }}
  </Button><br>
  <LanguageToggle />
</template>
