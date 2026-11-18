<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      officeOfTheRegistrar: 'OFFICE OF THE REGISTRAR',
      chulalongkornUniversity: 'Chulalongkorn University'
    },
    th: {
      officeOfTheRegistrar: 'สำนักงานการทะเบียน (สนท.)',
      chulalongkornUniversity: 'จุฬาลงกรณ์มหาวิทยาลัย'
    },
  }
})
</script>
<template>
  <div class="py-1.75 px-3 rounded-lg flex gap-3 bg-surface shadow-inner shadow-separator-alt">
    <img src="/images/chula-logo-colored.svg" class="bg-transparent w-7" />
    <div>
      <h1 class="font-chulalongkorn font-bold text-primary hover:text-primary-dark text-lg transition-colors duration-200 ease-in-out">
        {{ t("officeOfTheRegistrar") }}
      </h1>
      <p class="font-chulalongkorn leading-none text-text-muted">{{ t("chulalongkornUniversity") }}</p>
    </div>
  </div>
</template>