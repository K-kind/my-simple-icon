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
      resizeObserver: ResizeObserver | undefined
    }>({
      pickerContainer: null,
      colorPicker: undefined,
      resizeObserver: undefined
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
      state.resizeObserver = new ResizeObserver((records) => {
        const pickerContainerWidth = records[0].contentRect.width
        resizePicker(pickerContainerWidth)
      })
      state.resizeObserver.observe(state.pickerContainer!)
    }

    const removeResizeObserver = () => {
      state.resizeObserver?.disconnect()
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
      removeResizeObserver()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
