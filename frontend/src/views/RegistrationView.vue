<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      officeOfTheRegistrar: "OFFICE OF THE REGISTRAR",
      chulalongkornUniversity: "Chulalongkorn University",
      semester: "First Semester",
      academicYear: "Academic Year 2026",
      faculty: "Faculty of Engineering",
      name: "Ms. Alice Laurent",
      registrationCode: "Registration Code",
      placeholder: "Ex.",
      enter: "Enter",
      remarks: {
        courseRegistrationRemarks: "Course Registration Remarks",
        mustContactAdvisor: "Students must contact their academic advisors to obtain the registration code.",
        mustRequestNewCodeNextSemester: "The registration code is used for regular registration or late registration, and students must request a new registration for the following semester.",
        summerAndNextYearIsTheSame: "The registration code for the summer semester and the next academic year’s first semester is the same.",
        contactIfProblems: "If you encounter any problems regarding registration, contact your affiliated faculty or email",
      },
      fullstop: ".",
    },
    th: {
      officeOfTheRegistrar: "สำนักงานการทะเบียน",
      chulalongkornUniversity: "จุฬาลงกรณ์มหาวิทยาลัย",
      semester: "ภาคเรียนศึกษาต้น",
      academicYear: "ปีการศึกษา 2569",
      faculty: "คณะวิศวกรรมศาสตร์",
      name: "น.ส. อลิส ลอเรนต์",
      registrationCode: "รหัสการลงทะเบียนเรียน",
      placeholder: "เช่น",
      enter: "บันทึก",
      remarks: {
        courseRegistrationRemarks: "Course Registration Remarks",
        mustContactAdvisor: "Students must contact their academic advisors to obtain the registration code.",
        mustRequestNewCodeNextSemester: "The registration code is used for regular registration or late registration, and students must request a new registration for the following semester.",
        summerAndNextYearIsTheSame: "The registration code for the summer semester and the next academic year’s first semester is the same.",
        contactIfProblems: "If you encounter any problems regarding registration, contact your affiliated faculty or email",
      },
      fullstop: "",
    },
  }
})
</script>

<template>
  <section class="flex flex-col items-center">
    <img
      src="/images/chula-logo-colored.svg"
      class="w-15 my-5"
    />
    <h1 class="font-chulalongkorn text-primary font-bold text-2xl">{{ t('officeOfTheRegistrar') }}</h1>
    <p class="font-chulalongkorn text-xl text-text">{{ t('chulalongkornUniversity') }}</p>
    <p class="mt-2 text-text-muted text-sm">{{ t('semester') }} / {{ t('academicYear') }}</p>
    <p class="text-text-muted font-medium text-sm">{{ t('faculty') }}</p>
    <p class="mt-2 text-primary-dark font-semibold">{{ t('name') }} (6738123421)</p>
  </section>
  <form class="flex items-center justify-center-safe gap-2 mt-3">
    <label for="registrationCode" class="text-text-muted font-bold">
      {{ t('registrationCode') }}
    </label>
    <input
      type="text"
      id="registrationCode"
      class="border border-separator rounded-md py-1 px-2"
      :placeholder="t('placeholder') + ' ABC123'"
    />
    <Button type="submit">{{ t('enter') }}</Button>
  </form>
  <div class="
    flex flex-col justify-center mx-5 lg:mx-15 my-2 rounded-lg p-5
    bg-surface border border-separator
  ">
    <h2 class="font-chulalongkorn text-primary-dark font-bold text-xl">{{ t('remarks.courseRegistrationRemarks') }}</h2>
    <ol class="list-decimal ml-5 flex flex-col gap-2">
      <li class="text-text">{{ t('remarks.mustContactAdvisor') }}</li>  
      <li class="text-text">{{ t('remarks.mustRequestNewCodeNextSemester') }}</li>  
      <li class="text-text">{{ t('remarks.summerAndNextYearIsTheSame') }}</li>  
      <li class="text-text">{{ t('remarks.contactIfProblems') }} <strong>webreg@chula.ac.th</strong>{{ t('fullstop') }}</li>  
    </ol>
  </div>
</template>