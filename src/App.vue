<template>
  <div class="px-4 py-4 h-screen md:mx-auto md:px-8 md:py-8 md:max-w-xl">
    <h1 class="mb-4 text-3xl">Simple Icon</h1>

    <div class="relative pb-5">
      <div
        ref="iconContainer"
        class="
          icon-container
          mx-auto
          w-6/12
          border-2
          rounded-md
          overflow-hidden
        "
      ></div>

      <button
        class="absolute bottom-2 right-2 p-1 rounded-full"
        :style="{
          backgroundColor: changeButtonHovered ? selectedColor : pairColor
        }"
        @click="exchangePair"
        @mouseover="changeButtonHovered = true"
        @mouseleave="changeButtonHovered = false"
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path
            :fill="changeButtonHovered ? pairColor : selectedColor"
            d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6 0 .79-.15 1.56-.44 2.25-.15.36-.04.77.23 1.04.51.51 1.37.33 1.64-.34.37-.91.57-1.91.57-2.95 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.79.15-1.56.44-2.25.15-.36.04-.77-.23-1.04-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V18z"
          />
        </svg>
      </button>
    </div>
    <PresetColors
      class="mb-4"
      :selected-color="selectedColor"
      @color-select="onColorSelect"
    />

    <div class="mb-4">
      <button class="p-1 rounded-full" @click="togglePalette">
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g><rect fill="none" height="24" width="24" /></g>
          <g>
            <path
              d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10c1.38,0,2.5-1.12,2.5-2.5c0-0.61-0.23-1.2-0.64-1.67c-0.08-0.1-0.13-0.21-0.13-0.33 c0-0.28,0.22-0.5,0.5-0.5H16c3.31,0,6-2.69,6-6C22,6.04,17.51,2,12,2z M17.5,13c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5C19,12.33,18.33,13,17.5,13z M14.5,9C13.67,9,13,8.33,13,7.5C13,6.67,13.67,6,14.5,6S16,6.67,16,7.5 C16,8.33,15.33,9,14.5,9z M5,11.5C5,10.67,5.67,10,6.5,10S8,10.67,8,11.5C8,12.33,7.33,13,6.5,13S5,12.33,5,11.5z M11,7.5 C11,8.33,10.33,9,9.5,9S8,8.33,8,7.5C8,6.67,8.67,6,9.5,6S11,6.67,11,7.5z"
            />
          </g>
        </svg>
      </button>
      <span ref="paletteButton" @click="togglePalette"> </span>

      <div
        id="tooltip"
        ref="paletteContainer"
        class="z-20 p-4 w-52 bg-white border-2 rounded-md"
        :class="{ 'palette-hidden': !paletteVisible }"
      >
        <ColorPalette
          :selected-color="selectedColor"
          @color-select="onColorSelect"
        />
        <div id="arrow" class="before:border-2" data-popper-arrow></div>
      </div>

      <div
        v-show="paletteVisible"
        class="fixed z-10 left-0 top-0 w-screen h-screen opacity-0"
        @click="togglePalette"
      ></div>
    </div>

    <div class="flex align-middle">
      <div class="relative mr-4 w-4/12">
        <select
          v-model="selectedExtension"
          name="extension"
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
        >
          <option
            v-for="(extension, index) in extensionOptions"
            :key="extension"
            :value="extension"
            :selected="index === 0"
          >
            {{ extension }}
          </option>
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
      </div>

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
        @click="download"
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
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { createPopper, preventOverflow } from '@popperjs/core'
import '@/assets/style.css'
import { generateSimpleIcon, updateSimpleIcon } from '@/utils/icon-svg'
import { getPairColor } from '@/utils/color'
import { EXTENSIONS, Extension, downloadImage } from '@/utils/download'
import PresetColors from '@/components/PresetColors.vue'
import ColorPalette from '@/components/ColorPalette.vue'

export default defineComponent({
  name: 'App',
  components: {
    PresetColors,
    ColorPalette
  },
  setup: () => {
    const state = reactive<{
      iconContainer: HTMLElement | null
      paletteContainer: HTMLElement | null
      paletteButton: HTMLElement | null
      selectedColor: string
      pairColor: string
      paletteVisible: boolean
      changeButtonHovered: boolean
      dropDownHeight: number
      selectedExtension: Extension
    }>({
      iconContainer: null,
      paletteContainer: null,
      paletteButton: null,
      selectedColor: '',
      pairColor: '',
      paletteVisible: false,
      changeButtonHovered: false,
      dropDownHeight: 280,
      selectedExtension: EXTENSIONS.PNG
    })

    const extensionOptions = computed(() => {
      return Object.values(EXTENSIONS)
    })

    const getSVGElement = () => {
      if (state.iconContainer == null) return
      return state.iconContainer.children[0] as SVGSVGElement
    }

    const initSVG = () => {
      const icon = generateSimpleIcon(state.selectedColor, state.pairColor)
      state.iconContainer!.appendChild(icon)
    }

    const updateSVGColors = () => {
      const SVGElement = getSVGElement()
      if (SVGElement == undefined) return

      updateSimpleIcon(SVGElement, state.selectedColor, state.pairColor)
    }

    const onColorSelect = (color: string) => {
      state.selectedColor = color
      state.pairColor = getPairColor(state.selectedColor)
      updateSVGColors()
    }

    const exchangePair = () => {
      ;[state.selectedColor, state.pairColor] = [
        state.pairColor,
        state.selectedColor
      ]
      updateSVGColors()
    }

    const togglePalette = () => {
      state.paletteVisible = !state.paletteVisible
    }

    const download = () => {
      const type = state.selectedExtension
      const svg = getSVGElement()!
      const filename = `simple-icon-${state.selectedColor}`
      downloadImage(type, svg, filename)
    }

    const initPopper = () => {
      createPopper(state.paletteButton!, state.paletteContainer!, {
        placement: 'right',
        modifiers: [
          preventOverflow,
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          }
        ]
      })
    }

    onMounted(() => {
      initSVG()
      initPopper()
    })

    return {
      ...toRefs(state),
      extensionOptions,
      onColorSelect,
      exchangePair,
      togglePalette,
      download
    }
  }
})
</script>

<style scoped>
.icon-container :deep() svg {
  width: 100%;
  height: auto;
}

#tooltip {
  transition: 0.2s opacity ease-out, 0.2s visibility ease-out;
}

#tooltip.palette-hidden {
  visibility: hidden;
  opacity: 0;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 12px;
  height: 12px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
  border: solid rgb(229, 231, 235);
  border-width: 0 0 2px 2px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -8px;
}
</style>
