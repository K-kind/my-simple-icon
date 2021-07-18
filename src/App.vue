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
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { generateSimpleIcon } from '@/utils/generate-simple-icon'
import { getPairColor } from '@/utils/color'
import '@/assets/style.css'
import PresetColors from '@/components/PresetColors.vue'
import ColorPalette from '@/components/ColorPalette.vue'

const EXTENSIONS = {
  PNG: 'png',
  JPG: 'jpg',
  SVG: 'svg'
} as const

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
      selectedExtension: string
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

    const setPairColor = () => {
      state.pairColor = getPairColor(state.selectedColor)
    }

    const setSVG = () => {
      // const icon = generateSimpleIcon('#3AD4C4', '#EBFCFA')
      const icon = generateSimpleIcon(state.selectedColor, state.pairColor)
      const iconContainer = state.iconContainer!
      const oldSVG = iconContainer.children[0]
      if (oldSVG) {
        iconContainer.removeChild(oldSVG)
      }
      iconContainer.appendChild(icon)
    }

    const onColorSelect = (color: string) => {
      state.selectedColor = color
      setPairColor()
      setSVG()
    }

    const exchangePair = () => {
      ;[state.selectedColor, state.pairColor] = [
        state.pairColor,
        state.selectedColor
      ]
      setSVG()
    }

    const togglePalette = () => {
      state.paletteVisible = !state.paletteVisible
    }

    const downloadPNG = () => {
      const svg = state.iconContainer!.children[0] as SVGSVGElement
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      canvas.width = svg.width.baseVal.value
      canvas.height = svg.height.baseVal.value

      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.onload = function () {
        ctx!.drawImage(image, 0, 0)
        const a = document.createElement('a')
        a.href = canvas.toDataURL('image/png')
        a.setAttribute('download', 'simple-icon.png')
        a.dispatchEvent(new MouseEvent('click'))
      }
      image.src =
        'data:image/svg+xml;charset=utf-8;base64,' +
        btoa(unescape(encodeURIComponent(svgData)))
    }

    const downloadJPG = () => {
      const svg = state.iconContainer!.children[0] as SVGSVGElement
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      canvas.width = svg.width.baseVal.value
      canvas.height = svg.height.baseVal.value

      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.onload = function () {
        ctx!.drawImage(image, 0, 0)
        const a = document.createElement('a')
        a.href = canvas.toDataURL('image/jpeg')
        a.setAttribute('download', 'simple-icon.jpg')
        a.dispatchEvent(new MouseEvent('click'))
      }
      image.src =
        'data:image/svg+xml;charset=utf-8;base64,' +
        btoa(unescape(encodeURIComponent(svgData)))
    }

    const downloadSVG = () => {
      const svg = state.iconContainer!.children[0] as SVGSVGElement
      const svgSource = svg.outerHTML
      const svgSourceWithNamespace = svgSource.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      )
      var svgBlob = new Blob([svgSourceWithNamespace], {
        type: 'image/svg+xml;charset=utf-8'
      })
      var svgUrl = URL.createObjectURL(svgBlob)
      var downloadLink = document.createElement('a')
      downloadLink.href = svgUrl
      downloadLink.download = 'simple-icon.svg'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

    const download = () => {
      if (state.selectedExtension === EXTENSIONS.PNG) {
        downloadPNG()
      } else if (state.selectedExtension === EXTENSIONS.JPG) {
        downloadJPG()
      } else if (state.selectedExtension === EXTENSIONS.SVG) {
        downloadSVG()
      }
    }

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
.icon-container >>> svg {
  width: 100%;
  height: auto;
  /* color: hsl(4, 90%, 58%);
  color: hsl(4, 90%, 95%);
  color: hsl(4, 90%, 58%);
  color: hsl(4, 90%, 88%);
  color: #F44336;
  color: hsl(174, 64%, 53%);
  color: hsl(173, 64%, 95%);
  color: hsl(176, 62%, 35%);
  color: hsl(173, 74%, 80%);
  color: hsl(173, 74%, 65%);
  color: hsl(173, 74%, 95%);
  color: #EBFCFA; */
}
</style>
