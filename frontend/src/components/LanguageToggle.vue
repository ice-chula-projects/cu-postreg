<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from './Button.vue';
import { Globe } from 'lucide-vue-next';

const { t, locale } = useI18n({
  useScope: 'global',
  messages: {
    en: {
      tooltip: {
        changeLanguage: 'Change Language'
      },
      language: 'ENG'
    },
    th: {
      tooltip: {
        changeLanguage: 'เปลี่ยนภาษา'
      },
        language: 'ไทย'
    }
  }
})

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'th' : 'en'
}
</script>

<template>
  <Button
    variant="subtle"
    :title="t('tooltip.changeLanguage')"
    class="flex items-center gap-3"
    @click="toggleLanguage"
  >
    <Globe :size="18" :stroke-width="2" />
    <span>{{ t("language") }}</span>
  </Button>
</template>