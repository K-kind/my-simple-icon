<template>
  <div class="grid gap-1 grid-cols-5 auto-rows-auto">
    <div
      v-for="color in presetColors"
      :key="color"
      class="rounded-md cursor-pointer"
      :style="{ backgroundColor: color }"
      @click="onColorClick(color)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

const PRESET_COLORS = [
  '#F44336',
  '#E91E63',
  '#F06292',
  '#AB47BC',
  '#673AB7',
  '#9575CD',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#4FC3F7',
  '#00BCD4',
  '#4DB6AC',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FDD835',
  '#FFC107',
  '#FF9800',
  '#FF6F00',
  '#FF5722',
  '#795548',
  '#A1887F',
  '#757575',
  '#607D8B'
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
