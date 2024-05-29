import './deps/embla-carousel.js';

export const addDotBtnsAndClickHandlers = (
  emblaApi,
  dotsNode,
  onButtonClick,
) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('');

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove('embla__dot--selected');
    dotNodes[selected].classList.add('embla__dot--selected');
  };

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = '';
  };
};

// const plugins = [EmblaCarouselAutoplay()];

// const OPTIONS = { axis: 'y', dragFree: true, direction: 'rtl', loop: true };

const emblaNodes = document.querySelectorAll('.embla');
console.log(emblaNodes);
emblaNodes.forEach((emblaNode, index) => {
  const plugins = [
    EmblaCarouselAutoplay({
      delay: 4000 + 300 * (index + 1),
    }),
  ];

  const OPTIONS = { axis: 'y', dragFree: true, direction: 'rtl', loop: true };

  const viewportNode = emblaNode.querySelector('.embla__viewport');
  console.log(viewportNode);
  const dotsNode = emblaNode.querySelector('.embla__dots');

  const emblaApi = EmblaCarousel(viewportNode, OPTIONS, plugins);

  const onNavButtonClick = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  };

  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick,
  );

  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
});
