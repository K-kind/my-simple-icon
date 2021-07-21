<template>
  <button
    class="
      inline-flex
      items-center
      pl-3
      pr-4
      py-2
      text-gray-800
      font-bold
      bg-gray-300
      hover:bg-gray-400
      rounded
    "
    @click="onClick"
  >
    <svg
      class="mr-1 w-5 h-5 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
      />
    </svg>
    <span>Download</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click'],
  setup: (_, { emit }) => {
    const onClick = () => {
      emit('click')
    }

    return {
      onClick
    }
  }
})
</script>
