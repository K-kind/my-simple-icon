<template>
  <div class="px-4 py-4 min-h-screen md:mx-auto md:px-8 md:py-8 md:max-w-xl">
    <h1 class="mb-5 text-3xl md:mb-7">Simple Icon</h1>

    <div class="relative mx-auto pb-5 w-7/12 sm:w-5/12 md:pb-6 md:w-4/12">
      <div
        ref="iconContainer"
        class="icon-container border-2 rounded-md overflow-hidden"
      ></div>

      <ColorToggleButton
        :main-color="mainColor"
        :sub-color="subColor"
        @click="toggleColor"
      />
    </div>

    <div class="grid gap-4 grid-cols-2 mb-4 p-3 border-2 rounded-md md:mb-6">
      <PresetColors
        :selected-color="selectedColor"
        @color-select="onColorSelect"
      />

      <ColorPalette
        :selected-color="selectedColor"
        @color-select="onColorSelect"
      />
    </div>

    <div class="flex justify-center align-middle mb-6">
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
import '@/assets/style.css'
import { generateSimpleIcon, updateSimpleIcon } from '@/utils/icon-svg'
import { getPairColor } from '@/utils/color'
import { EXTENSIONS, Extension, downloadImage } from '@/utils/download'
import PresetColors from '@/components/PresetColors.vue'
import ColorPalette from '@/components/ColorPalette.vue'
import ColorToggleButton from './components/ColorToggleButton.vue'

export default defineComponent({
  name: 'App',
  components: {
    PresetColors,
    ColorPalette,
    ColorToggleButton
  },
  setup: () => {
    const state = reactive<{
      iconContainer: HTMLElement | null
      selectedColor: string
      selectedExtension: Extension
      colorToggled: boolean
    }>({
      iconContainer: null,
      selectedColor: '',
      selectedExtension: EXTENSIONS.PNG,
      colorToggled: false
    })

    const pairColor = computed(() => {
      return getPairColor(state.selectedColor)
    })

    const mainColor = computed(() => {
      return state.colorToggled ? pairColor.value : state.selectedColor
    })

    const subColor = computed(() => {
      return state.colorToggled ? state.selectedColor : pairColor.value
    })

    const extensionOptions = computed(() => {
      return Object.values(EXTENSIONS)
    })

    const getSVGElement = () => {
      if (state.iconContainer == null) return
      return state.iconContainer.children[0] as SVGSVGElement
    }

    const initSVG = () => {
      const icon = generateSimpleIcon(mainColor.value, subColor.value)
      state.iconContainer!.appendChild(icon)
    }

    const updateSVGColors = () => {
      const SVGElement = getSVGElement()
      if (SVGElement == undefined) return

      updateSimpleIcon(SVGElement, mainColor.value, subColor.value)
    }

    const onColorSelect = (color: string) => {
      state.selectedColor = color
      updateSVGColors()
    }

    const toggleColor = () => {
      state.colorToggled = !state.colorToggled
      updateSVGColors()
    }

    const download = () => {
      const type = state.selectedExtension
      const svg = getSVGElement()!
      const filename = `simple-icon-${state.selectedColor}`
      downloadImage(type, svg, filename)
    }

    onMounted(() => {
      initSVG()
    })

    return {
      ...toRefs(state),
      pairColor,
      mainColor,
      subColor,
      extensionOptions,
      onColorSelect,
      toggleColor,
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

.change-button {
  right: -48px;
}
</style>
