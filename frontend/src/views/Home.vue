<script setup lang="ts">
import AutocompleteInput from '@/components/AutocompleteInput.vue';
import { computeLevenshteinDistance } from '@/ts/autocomplete';
import { courses } from '@/ts/courses';
import { h } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      announcementsLabel: "Announcements"
    },
    th: {
      announcementsLabel: "ประกาศ"
    },
  },
})
</script>

<template>
  <section class="flex flex-col items-center">
    <img
      src="/images/chula-logo-colored.svg"
      class="w-15 my-5"
    />
    <h1 class="font-chulalongkorn text-primary font-bold text-2xl">{{ t('officeOfTheRegistrar') }}</h1>
    <p class="font-chulalongkorn text-xl text-text ">{{ t('chulalongkornUniversity') }}</p>
    <div>
      <div class="self-start flex">
        <img src="/images/announcement.jpg" class="h-15 mt-auto">
        <h1 class="font-bold font-chulalongkorn text-4xl mt-auto">{{ t("announcementsLabel") }}</h1>
      </div>
      <div class="border-separator bg-surface/40 rounded-2xl border-2 w-160 h-100 p-2 overflow-scroll">
      <h3 class="font-bold">27 Sep 2026</h3>
      <p>
        Announcement !! During 27–29 September 2026 <br>
For 2304193 Physics Lab for Eng <br>
Announcement: Cancellation and Rescheduling of Practical Classes <br>
<br>
Due to flooding in certain areas affecting travel and safety, please be advised that all practical classes scheduled for this Monday and Tuesday (for both regular and international programs) are canceled. <br>
<br>
The makeup classes will be held on the following dates: <br>
<br>
Classes originally on Monday: Rescheduled to October 26 <br>
<br>
Classes originally on Tuesday: Rescheduled to November 3 <br>
<br>
We apologize for any inconvenience caused and thank you for your understanding. <br>
For 2147334 Machine Learning or Deep Learning & 2100201 Intro to AI <br>
The announcement has already been sent to the students via MCV, informing them that all classes will be conducted fully online. <br>

      </p>
      </div>
    </div>
  </section>
</template>
