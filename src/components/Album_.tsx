import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Slide {
  src: string;
  description?: string;
}

interface Props {
  slides: Slide[];
}

const Album = (props: Props) => {
  const { slides: images } = props;

  const [index, setIndex] = useState(0);
  const currentSlide = images[index];

  const prevSlide = () => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  };
  const nextSlide = () => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <div className="not-prose flex flex-col gap-2 border-neutral-800">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={index}
          src={currentSlide.src}
          alt={currentSlide.description}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        />

        <p className="text-center text-sm italic text-neutral-500">
          {currentSlide.description}
        </p>
      </AnimatePresence>

      <div className="flex flex-row justify-around">
        <button className="text-lg font-bold" onClick={prevSlide}>
          ←
        </button>

        <p className="text-lg font-bold">{`${index + 1}/${images.length}`}</p>

        <button className="text-lg font-bold" onClick={nextSlide}>
          →
        </button>
      </div>
    </div>
  );
};

export default Album;
