export const LogoBadge = ({ className }: { className: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="HAKI"
			className={className}
			fill="none"
			viewBox="0 0 40 40"
			preserveAspectRatio="xMidYMid meet"
			style={{
				aspectRatio: "1 / 1",
			}}
		>
			<rect width="40" height="40" fill="#f21644" rx="8" />
			<g transform="translate(4.7, 10) scale(0.2299)">
				<path
					fill="#ffffff"
					d="M43 68.0002V87.0002H0V0.000183105H43V40.0002L90 40.0002V0.000183105H133V87.0002H90V68.0002H43Z"
				/>
			</g>
		</svg>
	);
};
