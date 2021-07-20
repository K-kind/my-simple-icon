<template>
  <div
    id="picker"
    ref="pickerContainer"
    class="flex justify-center mx-auto w-11/12"
  ></div>
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
        layout: [
          {
            component: iro.ui.Wheel,
            options: {
              width
              // borderColor: '#ffffff'
            }
          },
          {
            component: iro.ui.Slider,
            options: {
              width
              // borderColor: '#000000'
            }
          }
        ]
        // layoutDirection: 'horizontal'
      })

      state.colorPicker!.on('color:change', onColorChange)
    }

    const removePicker = () => {
      state.colorPicker!.off('color:change', onColorChange)
      state.colorPicker = undefined
    }

    watch(
      () => props.selectedColor,
      (color) => {
        state.colorPicker!.setColors([color])
      }
    )

    onMounted(() => {
      initPicker(props.selectedColor)
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
