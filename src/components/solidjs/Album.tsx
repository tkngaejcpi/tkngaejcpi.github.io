import { createSignal } from 'solid-js';

interface Slide {
  src: string;
  description?: string;
}

interface Props {
  slides: Slide[];
}

const Album = (props: Props) => {
  const { slides: images } = props;

  const [index, setIndex] = createSignal(0);
  const currentSlide = () => images[index()];

  const prevSlide = () => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  };
  const nextSlide = () => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <div class="not-prose flex flex-col gap-2 border-neutral-800">
      <img src={currentSlide().src} />

      <p>{currentSlide().description}</p>

      <div class="flex flex-row justify-around">
        <button class="text-lg font-bold" onClick={prevSlide}>
          ←
        </button>

        <p class="text-lg font-bold">{`${index() + 1}/${images.length}`}</p>

        <button class="text-lg font-bold" onClick={nextSlide}>
          →
        </button>
      </div>
    </div>
  );
};

export default Album;
