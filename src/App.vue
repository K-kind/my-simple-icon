<template>
  <div class="md:container md:mx-auto h-screen px-4 py-4 md:px-8 md:py-8">
    <h1 class="text-3xl mb-4">Simple Icon</h1>

    <div class="relative pb-5">
      <div
        ref="iconContainer"
        class="
          icon-container
          w-6/12
          mx-auto
          border-2
          rounded-md
          overflow-hidden
        "
      ></div>
      <span class="absolute bottom-2 right-2" @click="exchangePair">
        <span class="material-icons-round">loop</span>
      </span>
    </div>

    <PresetColors
      class="mb-4"
      :selected-color="selectedColor"
      @color-select="onColorSelect"
    />

    <span @click="togglePalette">
      <span class="material-icons-round">palette</span>
      <span class="material-icons-round">arrow_drop_down</span>
    </span>
    <div v-if="paletteVisible">
      <ColorPalette
        :selected-color="selectedColor"
        @color-select="onColorSelect"
      />
    </div>

    <div>
      <select v-model="selectedExtension" name="extension">
        <option
          v-for="(extension, index) in extensionOptions"
          :key="extension"
          :value="extension"
          :selected="index === 0"
        >
          {{ extension }}
        </option>
      </select>

      <button @click="download">
        <span class="material-icons-round">download</span>
        Download
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

export default defineComponent({
  name: 'App',
  components: {
    PresetColors,
    ColorPalette
  },
  setup: () => {
    const state = reactive<{
      iconContainer: HTMLElement | null
      selectedColor: string
      pairColor: string
      paletteVisible: boolean
      selectedExtension: Extension
    }>({
      iconContainer: null,
      selectedColor: '',
      pairColor: '',
      paletteVisible: false,
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

    onMounted(() => {
      initSVG()
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
</style>
