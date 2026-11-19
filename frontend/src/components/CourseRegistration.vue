<script setup lang="ts">
import { ref, reactive, type Reactive, computed } from 'vue'
import Button from './Button.vue'
import { courses } from '@/ts/courses'
import type { Row } from '@/ts/CourseRegistration'
import { state } from '@/ts/GlobalState.ts';

let nextId = 0
const createId = () => `row-${nextId++}`

function lookupCourse(courseId: string) {
  const key = courseId?.trim().toUpperCase()
  return courses[key] ?? { name: '-', credits: '-' }
}

function makeRow({ isSaved = false, courseId = '', section = null, sectionModifier = 'only', sectionSecondary = null, canceled = false } = {}): Reactive<Row> {
  return reactive({
    id: createId(),
    isSaved,
    cancelled: false,
    courseId,
    section,
    sectionModifier,
    sectionSecondary,
    canceled,
  })
}

const rows = computed<Row[]>(() => state.value.coursesRegistered)

function addRow() {
  rows.value.push(makeRow())
}

function toggleCancel(row: Row) {
  if (row.isSaved) { // Saved courses can't be deleted and its cancel needs confirmation
    row.cancelled = !row.cancelled
    return
  }
  state.value.coursesRegistered = rows.value.filter((r) => r.id !== row.id)
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
  console.log('submitting', rows.value)
  state.value.coursesRegistered = rows.value.map((row) => {
    return {
      ...row,
      isSaved: true
    }
  }).filter((r) => !r.cancelled)
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="overflow-hidden rounded-2xl border border-violet-300">
      <div class="grid grid-cols-[56px_1fr_1fr_1.7fr_90px_84px] bg-blue-500 font-bold text-white font-chulalongkorn">
        <div class="px-4 py-4">No.</div>
        <div class="px-4 py-4">Course ID</div>
        <div class="px-4 py-4">Course Name</div>
        <div class="px-4 py-4">Section</div>
        <div class="px-4 py-4">Credits</div>
        <div class="px-4 py-4 text-center">Cancel</div>
      </div>

      <div
        v-for="(row, index) in rows"
        :key="row.id"
        class="grid grid-cols-[56px_1fr_1fr_1.7fr_90px_84px] items-center border-t border-violet-300 bg-violet-200 py-3 transition-opacity"
        :class="{ 'opacity-50': row.cancelled }"
      >
        <div class="px-4 font-bold">{{ index + 1 }}</div>

        <div class="px-4">
          <input
            v-model="row.courseId"
            type="text"
            :disabled="row.isSaved"
            aria-label="Course ID"
            class="w-full rounded-md border border-separator bg-surface px-3 py-2 disabled:bg-surface-alt disabled:text-text-disabled"
          />
        </div>

        <div class="truncate px-4">
          {{ lookupCourse(row.courseId).name }}
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
            class="w-16 rounded-md border border-slate-400 bg-white px-2 py-2 disabled:bg-slate-100"
          />
        </div>

        <div class="px-4 text-slate-700">
          {{ lookupCourse(row.courseId).credits }}
        </div>

        <div class="flex justify-center px-4">
          <input
            type="checkbox"
            :checked="row.cancelled"
            aria-label="Cancel this course"
            class="h-5 w-5 rounded border-slate-500"
            @change="toggleCancel(row)"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-4">
      <Button @click="addRow">Add Row</Button>
      <Button popovertarget="confirm-popover">Confirm Entries</Button>
    </div>

    <div id="confirm-popover" popover class="confirm-popover">
      <h2 class="mb-4 text-lg font-bold">Review your entries</h2>

      <p v-if="rows.length === 0" class="text-slate-500">No courses added yet.</p>

      <ul v-else class="mb-5 space-y-2">
        <li
          v-for="(row, index) in rows"
          :key="row.id"
          class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
        >
          <div class="text-sm">
            <span class="font-bold">{{ index + 1 }}.</span>
            {{ row.courseId || '(no ID set)' }} — {{ lookupCourse(row.courseId).name }}
            <span class="text-slate-500">
              ({{ sectionLabel(row) }}, {{ lookupCourse(row.courseId).credits }} credits)
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
            {{ entryStatus(row) }}
          </span>
        </li>
      </ul>

      <div class="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          popovertarget="confirm-popover"
          popovertargetaction="hide"
          class="rounded-xl px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-100"
        >
          Back
        </Button>
        <Button @click="handleSubmit">Submit</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-popover {
  width: min(90vw, 32rem);
  margin: auto;
  border: 2px solid #c4b5fd; /* violet-300, to match the table border */
  border-radius: 1rem;
  padding: 1.5rem;
  background: white;
}

.confirm-popover::backdrop {
  background: rgb(15 23 42 / 0.45);
}
</style>