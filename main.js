import SwipeCarousel from './swipe-carousel.js'

const carousel = new SwipeCarousel({
  containerId: '#carousel',
  // slideId: '.item',
  interval: 1000,
  isPlaying: false
})

carousel.init()