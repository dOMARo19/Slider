
    const container = document.querySelector('#carousel')
    const slides = document.querySelectorAll('.slide')
    const indicatorsContainer = container.querySelector('#indicators-container')
    const indicatorItems = indicatorsContainer.querySelectorAll('.indicator')
    const pauseBtn = container.querySelector('#pause-btn')
    const nextBtn = container.querySelector('#next-btn')
    const prevBtn = container.querySelector('#prev-btn')

    const SLIDES_COUNT = slides.length
    const CODE_ARROW_LEFT = `ArrowLeft`
    const CODE_ARROW_RIGHT = `ArrowRight`
    const CODE_SPACE = ` `
    const FA_PAUSE = `<i class="fas fa-pause-circle"></i>`
    const FA_PLAY = `<i class="fas fa-play-circle"></i>`
    const TIMER_INTERVAL = 3000

    let isPlying = true
    let timerId = null
    let currentSlide = 0
    let startPosX = null
    let endPosX = null

    function goToNth(n) {
      slides[currentSlide].classList.toggle('active')
      indicatorItems[currentSlide].classList.toggle('active')
      currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT
      slides[currentSlide].classList.toggle('active')
      indicatorItems[currentSlide].classList.toggle('active')
    }

    function goToPrev() {
      goToNth(currentSlide - 1)
    }

    function goToNext() {
      goToNth(currentSlide + 1)
    }

    function tick() {
      timerId = setInterval(goToNext, TIMER_INTERVAL)
    }

    function pauseHandler() {
      if (!isPlying) return 
      clearInterval(timerId)
      pauseBtn.innerHTML = FA_PLAY
      isPlying = false
    }

    function playHandler() {
      tick()
      pauseBtn.innerHTML = FA_PAUSE
      isPlying = true
    }

    function pausePlayHandler() {
      isPlying ? pauseHandler() : playHandler()
    }

    function prevHandler() {
      pauseHandler()
      goToPrev()
    }

    function nextHandler() {
      pauseHandler()
      goToNext()
    }

    function indicateHandler(e) {
      const { target } = e
      if (target.classList.contains('indicator')) {
          pauseHandler()
          goToNth(+target.dataset.slideTo)
        }
    }

    function pressKeyHandler(e) {
      const { key } = e
      if (key === CODE_ARROW_LEFT) prevHandler()
      if (key === CODE_ARROW_RIGHT) nextHandler()
      if (key === CODE_SPACE) {
        e.preventDefault()
        e.stopPropagation()
        pausePlayHandler()
      }
      
    }


    function swipeStartHandler(e) {
      startPosX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
    }

    function swipeEndHandler(e) {
      endPosX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
      if (endPosX - startPosX > 100) prevHandler()
      if (endPosX - startPosX < -100) nextHandler()
    }
    
    function initListeners() {
      pauseBtn.addEventListener('click', pausePlayHandler)
      prevBtn.addEventListener('click', prevHandler)
      nextBtn.addEventListener('click', nextHandler)
      indicatorsContainer.addEventListener('click', indicateHandler)
      container.addEventListener('touchstart', swipeStartHandler, { passive: true })
      container.addEventListener('mousedown', swipeStartHandler)
      container.addEventListener('touchend', swipeEndHandler)
      container.addEventListener('mouseup', swipeEndHandler)
      document.addEventListener('keydown', pressKeyHandler)
      
    }

    function init() {
      initListeners()
      tick()
    }

    init()
