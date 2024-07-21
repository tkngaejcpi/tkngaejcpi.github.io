const Loading = () => {
	return (
		<div>
			<svg className="h-5 w-5 animate-spin" viewBox="0 0 100 100">
				<circle
					cx="50"
					cy="50"
					r="40"
					fill="none"
					stroke="#525252"
					stroke-width="15"
					stroke-dasharray={30 * 2 * 3.14}
				/>
			</svg>
		</div>
	);
};

export default Loading;
