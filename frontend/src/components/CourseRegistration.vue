<script setup lang="ts">
import { ref, reactive, type Reactive, computed, h } from 'vue'
import Button from './Button.vue'
import { courses, getCourseFromId, type Course } from '@/ts/courses'
import type { Row } from '@/ts/CourseRegistration'
import { state } from '@/ts/GlobalState.ts';
import { useI18n } from 'vue-i18n';
import AutocompleteInput from './AutocompleteInput.vue';
import { computeIdSimilarityScore } from '@/ts/autocomplete';

const { t } = useI18n({
  useScope: "local",
  messages: {
    en: {
      "number": "No.",
      "courseId": "Course ID",
      "courseName": "Course Name",
      "section": "Section",
      "credits": "Credits",
      "cancel": "Cancel",
      "addRow": "Add Row",
      "confirmEntries": "Confirm Entries",
      "confirmCourses": "Confirm Courses",
      "noCoursesAdded": "No courses added yet.",
      "noIdSet": "(no ID set)",
      "registered": "Registered",
      "cancelling": "Cancelling",
      "new": "New",
      "confirm": "Confirm",
      "courseNotFound": "One or more courses could not be found.",
      "incompleteSection": "Please specify a section for every course.",
      "incompleteSecondarySection": "Please specify the second section."
    },
    th: {
      "number": "ลำดับ",
      "courseId": "รหัสวิชา",
      "courseName": "ชื่อวิชา",
      "section": "ตอนเรียน",
      "credits": "หน่วยกิต",
      "cancel": "ยกเลิก",
      "addRow": "เพิ่มรายการ",
      "confirmEntries": "ยืนยันรายการ",
      "confirmCourses": "ยืนยันรายวิชา",
      "noCoursesAdded": "ยังไม่มีรายวิชาที่เพิ่ม",
      "noIdSet": "(ยังไม่ได้ระบุรหัสวิชา)",
      "registered": "ลงทะเบียนแล้ว",
      "cancelling": "รอยกเลิก",
      "new": "รายการใหม่",
      "confirm": "ยืนยัน",
      "courseNotFound": "ไม่พบรหัสวิชาที่ระบุ",
      "incompleteSection": "กรุณาระบุตอนเรียนให้ครบทุกรายวิชา",
      "incompleteSecondarySection": "กรุณาระบุตอนเรียนที่สอง"
    }
  }
})
let nextId = 0
const createId = () => `row-${nextId++}`



function makeRow({ isSaved = false, courseId = '', courseName = null, section = null, sectionModifier = 'only', sectionSecondary = null, credits = null, canceled = false } = {}): Reactive<Row> {
  return reactive({
    id: createId(),
    isSaved,
    cancelled: false,
    courseId,
    courseName,
    section,
    sectionModifier,
    sectionSecondary,
    credits,
    canceled,
  })
}

const rows = ref<Row[]>(state.value.coursesRegistered.map(row => ({ ...row })))

function addRow() {
  rows.value.push(makeRow())
}

function toggleCancel(row: Row, checked: boolean) {
  if (row.isSaved) {
    row.cancelled = checked
    return
  }

  if (checked) {
    rows.value = rows.value.filter(r => r.id !== row.id)
  }
}

function sectionLabel(row: Row) {
  if (!row.section) return 'No section set'
  if (row.sectionModifier === 'only' || !row.sectionSecondary) {
    return `Section ${row.section}`
  }
  return `Section ${row.section} ${row.sectionModifier} ${row.sectionSecondary}`
}

function entryStatus(row: Row) {
  if (row.isSaved) return row.cancelled ? 'Cancelling' : 'Registered'
  return 'New'
}

function handleSubmit() {
  const committedRows = rows.value
    .filter(row => !row.cancelled)
    .map(row => ({
      ...row,
      isSaved: true,
      cancelled: false,
    }))

  state.value.coursesRegistered = committedRows
  rows.value = committedRows.map(row => ({ ...row }))
}

function validateRows(rows: Row[]): { valid: true } | { valid: false; reason: string } {
  for (const row of rows) {
    if (getCourseFromId(row.courseId) == null) {
      return { valid: false, reason: "courseNotFound"}
    }
    if (row.section === null) {
      return { valid: false, reason: "incompleteSection"}
    }
    if (row.sectionModifier !== "only" && row.sectionSecondary === null) {
      return { valid: false, reason: "incompleteSecondarySection"}
    }
  }
  return { valid: true }
}

const validation = computed(() => validateRows(rows.value))
const showValidationError = ref(false)

function confirmEntries() {
  showValidationError.value = false

  if (!validation.value.valid) {
    showValidationError.value = true
    return
  }

  handleSubmit()

  document.getElementById('confirm-popover')?.hidePopover()
}

function openConfirmation() {
  showValidationError.value = false
  document.getElementById('confirm-popover')?.showPopover()
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="overflow-visible rounded-md border border-violet-300">
      <div class="grid grid-cols-[56px_1fr_1fr_1.7fr_90px_84px] bg-blue-500 rounded-t-sm font-bold text-white font-chulalongkorn">
        <div class="px-4 py-4">{{ t('number') }}</div>
        <div class="px-4 py-4">{{ t('courseId') }}</div>
        <div class="px-4 py-4">{{ t('courseName') }}</div>
        <div class="px-4 py-4">{{ t('section') }}</div>
        <div class="px-4 py-4">{{ t('credits') }}</div>
        <div class="px-4 py-4 text-center">{{ t('cancel') }}</div>
      </div>

      <div
        v-for="(row, index) in rows"
        :key="row.id"
        class="grid grid-cols-[56px_1fr_1fr_1.7fr_90px_84px] items-center border-t border-violet-300 bg-violet-200 py-3 transition-opacity last:rounded-b-sm"
        :class="{ 'opacity-50': row.cancelled }"
      >
        <div class="px-4 font-bold">{{ index + 1 }}</div>

        <div class="px-4">
          <AutocompleteInput
            :options="courses"
            :similarity-score-function="computeIdSimilarityScore"
            :rendering-function="(x) => h('p', {}, (x as Course).id + ' ' + (x as Course).name)"
            :selected-value-function="(x) => (x as Course).id"
            :initial-value="row.courseId"
            @select="(course) => {
              row.courseId = course.id;
              row.courseName = course.name;
              row.credits = course.credits;
            }"
            :disabled="row.isSaved"
            aria-label="Course ID"
            class="rounded-md border border-separator bg-surface disabled:bg-surface-alt disabled:text-text-disabled"
          />
        </div>

        <div class="px-4">
          <AutocompleteInput
            :options="courses"
            :similarity-score-function="computeIdSimilarityScore"
            :rendering-function="(x) => h('p', {}, (x as Course).id + ' ' + (x as Course).name)"
            :selected-value-function="(x) => (x as Course).name"
            :initial-value="row.courseName"
            @select="(course) => {
              row.courseId = course.id;
              row.courseName = course.name;
              row.credits = course.credits;
            }"
            :disabled="row.isSaved"
            aria-label="Course ID"
            class="rounded-md border border-separator bg-surface disabled:bg-surface-alt disabled:text-text-disabled"
          />
        </div>

        <div class="flex items-center gap-2 px-4">
          <input
            v-model.number="row.section"
            type="number"
            min="1"
            :disabled="row.cancelled"
            aria-label="Section"
            class="w-16 rounded-md border border-separator bg-surface px-2 py-2 disabled:bg-surface-alt"
          />
          <select
            v-model="row.sectionModifier"
            :disabled="row.cancelled"
            aria-label="Section range type"
            class="rounded-md border border-separator bg-surface px-2 py-2 disabled:bg-surface-alt"
          >
            <option value="only">only</option>
            <option value="to">to</option>
            <option value="or">or</option>
          </select>
          <input
            v-if="row.sectionModifier !== 'only'"
            v-model.number="row.sectionSecondary"
            type="number"
            min="1"
            :disabled="row.cancelled"
            aria-label="Second section"
            class="w-16 rounded-md border border-separator bg-surface px-2 py-2 disabled:bg-surface-alt"
          />
        </div>

        <div class="px-4 text-slate-700">
          {{ row.credits ?? "-" }}
        </div>

        <div class="flex justify-center px-4">
          <input
            type="checkbox"
            :checked="row.cancelled"
            aria-label="Cancel this course"
            class="h-5 w-5 rounded border-slate-500"
            @change="toggleCancel(row, ($event.target as HTMLInputElement).checked)"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-4 justify-end items-end">
      <div class="mt-4 flex gap-4 items-end">
        <Button variant="subtle" @click="addRow">
          {{ t('addRow') }}
        </Button>

        <Button @click="openConfirmation">
          {{ t('confirmEntries') }}
        </Button>
      </div>
    </div>

    <div id="confirm-popover" popover class="confirm-popover">
      <h2 class="mb-4 text-center text-xl font-bold font-chulalongkorn text-primary">
        {{ t('confirmCourses') }}
      </h2>

      <p v-if="rows.length === 0" class="text-slate-500">
        {{ t('noCoursesAdded') }}
      </p>

      <ul v-else class="mb-5 space-y-2">
        <li
          v-for="(row, index) in rows"
          :key="row.id"
          class="flex items-center justify-between gap-3 rounded-lg border border-separator bg-surface px-3 py-2"
        >
          <div class="text-sm">
            <span class="font-bold">{{ index + 1 }}.</span>
            {{ row.courseId || t('noIdSet') }}
            <strong>{{ getCourseFromId(row.courseId)?.name }}</strong>
            <span class="text-text-muted">
              ({{ sectionLabel(row) }}, {{ getCourseFromId(row.courseId)?.credits }} {{ t('credits') }})
            </span>
          </div>

          <span
            class="shrink-0 rounded-full px-2 py-1 text-xs font-bold"
            :class="{
              'bg-emerald-200 text-emerald-800': entryStatus(row) === 'Registered',
              'bg-rose-200 text-rose-800': entryStatus(row) === 'Cancelling',
              'bg-sky-200 text-sky-800': entryStatus(row) === 'New',
            }"
          >
            {{ t(entryStatus(row).toLowerCase()) }}
          </span>
        </li>
      </ul>

      <!-- Validation error -->
      <div
        v-if="showValidationError && !validation.valid"
        class="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800"
        role="alert"
      >
        {{ t(validation.reason) }}
      </div>

      <div class="flex justify-between gap-3">
        <Button @click="confirmEntries">
          {{ t('confirm') }}
        </Button>

        <Button
          type="button"
          variant="ghost"
          popovertarget="confirm-popover"
          popovertargetaction="hide"
        >
          {{ t('cancel') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-popover {
  width: min(90vw, 32rem);
  margin: auto;
  border: 1px solid var(--color-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: var(--color-primary-subtle);
}

.confirm-popover::backdrop {
  background: rgb(15 23 42 / 0.45);
}
</style>
