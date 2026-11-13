<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost',
  title?: string
}>(), {
  variant: 'primary',
  title: ""
})

const variants = {
  primary: `
    bg-primary text-white shadow-sm
    hover:bg-primary-dark
    focus-visible:outline-primary
  `,
  secondary: `
    bg-secondary text-white shadow-sm
    hover:bg-secondary-light
    focus-visible:outline-secondary
  `,
  outline: `
    border border-primary-dark text-primary-dark bg-transparent
    hover:bg-primary-subtle
    focus-visible:outline-primary-dark
  `,
  subtle: `
    border border-primary-dark text-primary-dark bg-primary-subtle
    hover:bg-primary-subtle/50
    focus-visible:outline-primary-dark
  `,
  ghost: `
    bg-transparent text-primary-dark
    hover:bg-primary-light
    focus-visible:outline-primary
  `,
}

const variantClasses = computed(() => variants[props.variant])
</script>

<template>
  <button
    :class="[
      'rounded-md px-3 py-2',
      'transition-all duration-200 ease-out',
      'hover:-translate-y-0.5 hover:shadow-lg',
      'active:translate-y-0 active:scale-[0.97] active:shadow-sm',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'motion-reduce:transition-none',
      variantClasses,
    ]"
    :title="props.title"
  >
    <slot />
  </button>
</template>
