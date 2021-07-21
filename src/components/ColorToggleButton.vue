<template>
  <button
    class="change-button absolute bottom-5 right-0 p-1 rounded-full md:bottom-6"
    :style="{
      backgroundColor: buttonHovered ? mainColor : subColor
    }"
    @click="onClick"
    @mouseover="changeHoverState(true)"
    @mouseleave="changeHoverState(false)"
  >
    <svg
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
    >
      <path
        :fill="buttonHovered ? subColor : mainColor"
        d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6 0 .79-.15 1.56-.44 2.25-.15.36-.04.77.23 1.04.51.51 1.37.33 1.64-.34.37-.91.57-1.91.57-2.95 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.79.15-1.56.44-2.25.15-.36.04-.77-.23-1.04-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V18z"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    mainColor: {
      type: String,
      required: true
    },
    subColor: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  setup: (_, { emit }) => {
    const state = reactive<{
      buttonHovered: boolean
    }>({
      buttonHovered: false
    })

    const changeHoverState = (hovered: boolean) => {
      state.buttonHovered = hovered
    }

    const onClick = () => {
      emit('click')
    }

    return {
      ...toRefs(state),
      changeHoverState,
      onClick
    }
  }
})
</script>
