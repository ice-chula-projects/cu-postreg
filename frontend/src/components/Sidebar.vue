<script setup lang="ts">
import { state } from '@/ts/GlobalState'
import { ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const sidebarWidth = ref(256)

const MIN_WIDTH = 180
const MAX_WIDTH = 500

let isResizing = false
let startX = 0
let startWidth = 0

function startResize(event: PointerEvent) {
  event.preventDefault()
  isResizing = true

  startX = event.clientX
  startWidth = sidebarWidth.value

  // Keep receiving pointer events even if the pointer
  // moves outside the resize handle.
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)

  window.addEventListener('pointermove', resize)
  window.addEventListener('pointerup', stopResize)
  window.addEventListener('pointercancel', stopResize)
}

function resize(event: PointerEvent) {
  if (!isResizing) return

  const delta = event.clientX - startX

  sidebarWidth.value = Math.min(
    MAX_WIDTH,
    Math.max(MIN_WIDTH, startWidth + delta)
  )
}

function stopResize() {
  isResizing = false

  window.removeEventListener('pointermove', resize)
  window.removeEventListener('pointerup', stopResize)
  window.removeEventListener('pointercancel', stopResize)
}

onUnmounted(stopResize)
const topics: Record<string, Record<string, string>> = {
  home: {
    announcements: '/',
  },
  registration: {
    registerForCourses: '/register',
    dropCourses: '/drop',
  },
}
const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      home: "Home",
      announcements: "Announcements",
      registration: "Registration",
      registerForCourses: "Register For Courses",
      dropCourses: "Drop Courses",
    },
    th: {
      home: "หน้าแรก",
      announcements: "ประกาศ",
      registration: "การลงทะเบียน",
      registerForCourses: "ลงทะเบียนปกติ",
      dropCourses: "ลดวิชาเรียน",
    },
  }
})
</script>

<template>
  <aside
    class="
      relative block left-0 z-20 h-full
      bg-linear-to-b from-primary-subtle to-primary-light
      shadow-lg shadow-primary/50
      p-6
    "
    :style="{ width: `${sidebarWidth}px` }"
  >
  <div class="flex flex-col h-full">
    <template v-for="(links, topic) in topics">
      <section>
        <h3 class="font-semibold font-chulalongkorn text-primary text-lg">{{ t(topic) }}</h3>
        <ul v-for="(link, linkName) in links">
          <RouterLink 
            :to="link" 
            active-class="!text-primary-dark font-semibold"
            class="
              relative block text-text text-sm ml-2 my-1.5
              hover:underline
              whitespace-nowrap overflow-hidden
              mask-[linear-gradient(to_right,black_85%,transparent_100%)]
            "
            :title="t(linkName)"
          >
            {{ t(linkName) }}
          </RouterLink>
        </ul>
      </section>
      <hr class="border-separator my-2">
    </template>
    
    <div class="mt-auto bg-white rounded-md h-14 p-1 flex-row flex border border-gray-400">
      <img src="/images/User Icon.png" class="h-full">
      <div class="flex flex-col m-auto">
        <p class="font-bold text-sm">{{state.id}}</p>
        <p class="text-xs">Mr. FIRSTNAME LASTNAME</p>
      </div>
    </div>
  </div>
    
    <!-- Resize handle -->
    <div
      draggable="false"
      class="
        absolute right-0 top-1/2 -translate-y-1/2
        flex flex-col gap-1 p-2
        cursor-col-resize touch-none
        opacity-30 hover:opacity-100
        transition-opacity
      "
      @pointerdown="startResize"
    >
      <span class="size-1 rounded-full bg-primary"></span>
      <span class="size-1 rounded-full bg-primary"></span>
      <span class="size-1 rounded-full bg-primary"></span>
    </div>
  </aside>
</template>
