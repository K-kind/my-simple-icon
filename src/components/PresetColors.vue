<template>
  <div class="grid grid-cols-6 gap-1">
    <div
      v-for="color in presetColors"
      :key="color"
      :style="{ backgroundColor: color }"
      class="h-10 cursor-pointer rounded-md"
      @click="onColorClick(color)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

const PRESET_COLORS = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#757575'
  // '#607D8B'

  // '#f44336',
  // '#e91e63',
  // '#9c27b0',
  // '#673ab7',
  // '#3f51b5',
  // '#2196f3',
  // '#03a9f4',
  // '#00bcd4',
  // '#009688',
  // '#4caf50',
  // '#8bc34a',
  // '#cddc39',
  // '#ffeb3b',
  // '#ffc107',
  // '#ff9800',
  // '#ff5722',
]

export default defineComponent({
  props: {
    selectedColor: {
      type: String,
      required: true
    }
  },
  emits: ['color-select'],
  setup: (props, { emit }) => {
    const emitColorSelect = (color: string) => {
      emit('color-select', color)
    }

    const onColorClick = (color: string) => {
      emitColorSelect(color)
    }

    onMounted(() => {
      if (!props.selectedColor) {
        emitColorSelect(PRESET_COLORS[0])
      }
    })

    return {
      presetColors: PRESET_COLORS,
      onColorClick
    }
  }
})
</script>
