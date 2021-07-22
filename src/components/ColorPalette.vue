<template>
  <div id="picker" ref="pickerContainer" class="flex justify-center"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch
} from 'vue'
import iro from '@jaames/iro'

export default defineComponent({
  props: {
    selectedColor: {
      type: String,
      required: true
    }
  },
  emits: ['color-select'],
  setup: (props, { emit }) => {
    const state = reactive<{
      pickerContainer: HTMLElement | null
      colorPicker: iro.ColorPicker | undefined
    }>({
      pickerContainer: null,
      colorPicker: undefined
    })

    const emitColorSelect = (color: string) => {
      emit('color-select', color)
    }

    const onColorChange = (color: any) => {
      emitColorSelect(color.hexString)
    }

    const initPicker = (initialColor: string) => {
      const width = state.pickerContainer!.offsetWidth - 1
      // @ts-expect-error: Error within Library
      state.colorPicker = new iro.ColorPicker('#picker', {
        color: initialColor,
        width,
        layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider }]
      })

      state.colorPicker!.on('color:change', onColorChange)
    }

    const removePicker = () => {
      state.colorPicker!.off('color:change', onColorChange)
      state.colorPicker = undefined
    }

    const resizePicker = (width: number) => {
      state.colorPicker?.resize(width)
    }

    const setResizeObserver = () => {
      const observer = new ResizeObserver((mutationRecords) => {
        const pickerContainerWidth = mutationRecords[0].contentRect.width
        resizePicker(pickerContainerWidth)
      })
      observer.observe(state.pickerContainer!)
    }

    watch(
      () => props.selectedColor,
      (color) => {
        state.colorPicker?.setColors([color])
      }
    )

    onMounted(() => {
      initPicker(props.selectedColor)
      setResizeObserver()
    })

    onUnmounted(() => {
      removePicker()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
