<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost',
  title?: string
  disabled?: boolean
}>(), {
  variant: 'primary',
  title: "",
  disabled: false,
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
      'cursor-pointer',
      'rounded-md px-3 py-2',
      'transition-all duration-200 ease-out',
      props.disabled ? null : 'hover:-translate-y-0.5 hover:shadow-lg',
      props.disabled ? null : 'active:translate-y-0 active:scale-[0.97] active:shadow-sm',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'motion-reduce:transition-none',
      'disabled:opacity-50',
      variantClasses,
    ]"
    :disabled="props.disabled"
    :title="props.title"
  >
    <slot />
  </button>
</template>
