<script setup lang="ts">
import Button from '@/components/Button.vue';
import { courses, getCourseFromId } from '@/ts/courses';
import { state } from '@/ts/GlobalState';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      semester: "First Semester",
      academicYear: "Academic Year 2026",
      faculty: "Faculty of Engineering",
      name: "Mr. FIRSTNAME LASTNAME",
      requestedStudentRegistration: "REQUESTED STUDENT REGISTRATION",
      number: "No.",
      courseId: "Course ID",
      courseName: "Course Name",
      section: "Section",
      credits: "Credits",
      remarks: "Remarks",
      pass: "Pass",
      totalCredits: "Total Credits",
    },
    th: {
      semester: "ภาคการศึกษาต้น",
      academicYear: "ปีการศึกษา 2569",
      faculty: "คณะวิศวกรรมศาสตร์",
      name: "นายชื่อจริง นามสกุล",
      requestedStudentRegistration: "รายงานผลการลงทะเบียนเรียน",
      number: "ลำดับ",
      courseId: "รหัสวิชา",
      courseName: "ชื่อวิชา",
      section: "ตอนเรียน",
      credits: "หน่วยกิต",
      remarks: "สถาณะ",
      pass: "ผ่าน",
      totalCredits: "หน่วยกิตทั้งหมด",
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
    <p class="mt-2 text-primary-dark font-semibold">{{ t('requestedStudentRegistration') }}</p>
    <p class="mt-2 text-text-muted text-sm">{{ t('semester') }} / {{ t('academicYear') }}</p>
  </section>
  <div class="mt-4 mx-10 overflow-x-auto rounded-md border border-primary-dark bg-surface shadow-md">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-primary-light px-4 py-3">
      <h2 class="font-bold uppercase text-primary">
        {{ t('faculty') }}
      </h2>
      <p class="text-primary">
        {{ t('name') }} ({{ state.id }})
      </p>
    </div>
  
    <table class="w-full min-w-225 border-collapse text-left">
      <thead>
        <tr class="bg-primary font-bold font-chulalongkorn text-white">
          <th class="border border-primary-dark border-l px-4 py-3">{{ t('number') }}</th>
          <th class="border border-primary-dark px-4 py-3">{{ t('courseId') }}</th>
          <th class="border border-primary-dark px-4 py-3">{{ t('courseName') }}</th>
          <th class="border border-primary-dark px-4 py-3">{{ t('section') }}</th>
          <th class="border border-primary-dark px-4 py-3">{{ t('credits') }}</th>
          <th class="border border-primary-dark px-4 py-3 text-center">{{ t('remarks') }}</th>
        </tr>
      </thead>
  
      <tbody>
        <tr
          v-for="(row, index) in state.coursesRegistered"
          :key="row.courseId"
          class="transition-colors bg-surface hover:bg-surface-alt"
        >
          <td class="border border-separator px-4 py-3">
            {{ index + 1 }}
          </td>
  
          <td class="border border-separator px-4 py-3">
            {{ row.courseId }}
          </td>
  
          <td class="border border-separator px-4 py-3">
            {{ getCourseFromId(row.courseId)?.name }}
          </td>
  
          <td class="border border-separator px-4 py-3">
            {{ row.section }}
            {{ row.sectionModifier }}
            {{ row.sectionSecondary ?? "" }}
          </td>
  
          <td class="border border-separator px-4 py-3">
            {{ getCourseFromId(row.courseId)?.credits?.toFixed(1) }}
          </td>
  
          <td class="border border-separator px-4 py-2 text-center">
            <span
              class="inline-block w-full max-w-45 rounded-full px-5 py-2 font-bold shadow-md bg-emerald-200 text-emerald-800"
            >
              {{ t('pass') }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex text-sm flex-wrap items-center justify-between gap-3 bg-primary-subtle px-4 py-2">
      <h2 class="text-primary font-semibold">
        {{ t('totalCredits') }}: {{ state.coursesRegistered.map((row) => getCourseFromId(row.courseId)?.credits).reduce((sum, value) => (sum ?? 0) + (value ?? 0), 0)?.toFixed(1) }}
      </h2>
    </div>
  </div>
</template>