import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';

interface Slide {
	src: string;
	description?: string;
}

interface Props {
	slides: Slide[];
}

function Album({ slides }: Props) {
	const [index, setIndex] = useState(0);
	const currentSlide = slides[index];

	const prevSlide = () => {
		setIndex((i) => (i > 0 ? i - 1 : slides.length - 1));
	};
	const nextSlide = () => {
		setIndex((i) => (i < slides.length - 1 ? i + 1 : 0));
	};

	return (
		<div className="not-prose flex flex-col gap-2 border-neutral-800">
			{/* use hidden element to prefetch all images in the album */}
			<div hidden>
				{slides.map(({ src }, i) => (
					<img src={src} fetchPriority={index == i ? 'high' : 'low'} alt="" />
				))}
			</div>

			<AnimatePresence mode="popLayout">
				<motion.img
					key={currentSlide.src}
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

				<p className="text-lg font-bold">{`${index + 1}/${slides.length}`}</p>

				<button className="text-lg font-bold" onClick={nextSlide}>
					→
				</button>
			</div>
		</div>
	);
}

export default Album;
