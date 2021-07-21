<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-1 mx-auto p-4 w-full max-w-md md:p-8 md:max-w-xl">
      <h1 class="title mb-5 text-3xl md:mb-7">Simple Icon</h1>

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

      <div
        class="
          grid
          gap-4
          grid-rows-2
          mb-4
          p-3
          border-2
          rounded-md
          sm:grid-cols-2 sm:grid-rows-1
          md:mb-6
        "
      >
        <PresetColors
          :selected-color="selectedColor"
          @color-select="onColorSelect"
        />

        <ColorPalette
          class="mx-auto w-6/12 sm:w-11/12"
          :selected-color="selectedColor"
          @color-select="onColorSelect"
        />
      </div>

      <div class="flex justify-center align-middle mb-3">
        <div class="relative mr-4 w-4/12">
          <SimpleSelect v-model="selectedExtension" name="extension">
            <option
              v-for="(extension, index) in extensionOptions"
              :key="extension"
              :value="extension"
              :selected="index === 0"
            >
              {{ extension }}
            </option>
          </SimpleSelect>
        </div>

        <DownloadButton @click="download" />
      </div>
    </div>
    <div class="py-2 text-center text-gray-700 text-sm">© 2021 K-kind</div>
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
import ColorToggleButton from '@/components/ColorToggleButton.vue'
import SimpleSelect from '@/components/SimpleSelect.vue'
import DownloadButton from '@/components/DownloadButton.vue'

export default defineComponent({
  name: 'App',
  components: {
    PresetColors,
    ColorPalette,
    ColorToggleButton,
    SimpleSelect,
    DownloadButton
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
.title {
  font-family: 'Kite One', sans-serif;
}
.icon-container :deep() svg {
  width: 100%;
  height: auto;
}
</style>
