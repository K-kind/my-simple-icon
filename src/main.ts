import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

import generateSimpleIcon from './lib/generate-simple-icon'

const main = () => {
  const icon = generateSimpleIcon('#3AD4C4', '#EBFCFA')
  icon.style.width = '100%'
  icon.style.height = 'auto'
  const iconPreviewArea = document.getElementById('icon-preview')!
  iconPreviewArea.appendChild(icon)
}

window.addEventListener('DOMContentLoaded', () => {
  main()
})
