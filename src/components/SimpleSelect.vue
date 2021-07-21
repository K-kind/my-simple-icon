<template>
  <select
    v-model="valueData"
    class="
      pr-8
      px-4
      py-2
      w-full
      text-gray-700
      bg-gray-200
      focus:bg-white
      border border-gray-200
      focus:border-gray-500
      rounded
      focus:outline-none
      appearance-none
    "
    v-bind="$attrs"
  >
    <slot />
  </select>
  <div
    class="
      absolute
      inset-y-0
      right-0
      flex
      items-center
      px-2
      text-gray-700
      pointer-events-none
    "
  >
    <svg
      class="w-4 h-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null
    }
  },
  emits: ['update:value'],
  setup: (props, { emit }) => {
    const valueData = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:value', val)
      }
    })

    return {
      valueData
    }
  }
})
</script>
