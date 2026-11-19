<script setup lang="ts">
import Button from '@/components/Button.vue';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'

const router = useRouter()
const registrationCode = ref("")
const validated = computed(() => registrationCode.value.length == 6)

const handleSubmit = () => {
  if (!validated.value) {
    return
  }
  router.push('/register/courses')
  sessionStorage.setItem("registrationCode", registrationCode.value)
}

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      declarationOfIntent: "Declaration of Intent (Form CR11)",
      semester: "First Semester",
      academicYear: "Academic Year 2026",
    },
    th: {
      declarationOfIntent: "แสดงความจำนง (จท 11)",
      semester: "ภาคการศึกษาต้น",
      academicYear: "ปีการศึกษา 2569",
    },
  }
})
</script>

<template>
<div class="mx-5">
  <div class="flex bg-primary-subtle/50 mt-5 p-3 rounded-md shadow-md shadow-primary-dark/15 border border-primary">
    <h2 class="font-chulalongkorn font-bold text-primary">{{ t('declarationOfIntent') }}</h2>
  </div>
  <p class="mt-2 text-text-muted text-sm">{{ t('semester') }} / {{ t('academicYear') }}</p>
  <div class="bg-surface flex justify-center w-fit mx-auto border border-separator rounded-lg shadow-md my-2">
    <h3 class="py-2 px-3 font-chulalongkorn font-bold text-text">Course Registration</h3>
  </div>
  <form>
    <table class="table-auto">
      <thead>
        <tr>Course</tr>
      </thead>
    </table>
  </form>
</div>
</template>