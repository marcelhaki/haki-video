// Callers pass explicit viewBoxes ("0 0 120 40", "0 0 40 40"), so the source
// 484x87 artwork is transformed into those zones rather than used natively.
const HAKI_H =
	"M43 68.0002V87.0002H0V0.000183105H43V40.0002L90 40.0002V0.000183105H133V87.0002H90V68.0002H43Z";
const HAKI_A =
	"M217.5 25.2909L206.77 47.0002L193.425 74.0002L187 87.0002H139L182 0.000183105H205H230H253L296 87.0002H248L241.575 74.0002L217.5 25.2909Z";
const HAKI_K =
	"M385.335 38.9908L433.5 0H381.5L345 30.7686V0.000183105H302V87.0002H345V51.0001V50.4949L345.47 51.0001L379 87.0002H435L385.335 38.9908Z";

export const Logo = ({
	className,
	showVersion,
	showBeta,
	white,
	hideLogoName,
	viewBoxDimensions = "0 0 120 40",
	style,
}: {
	className?: string;
	showVersion?: boolean;
	showBeta?: boolean;
	white?: boolean;
	hideLogoName?: boolean;
	style?: React.CSSProperties;
	viewBoxDimensions?: `${string} ${string} ${string} ${string}`;
}) => {
	const ink = white ? "#ffffff" : "#030105";

	return (
		<div className="flex items-center">
			<svg
				viewBox={viewBoxDimensions}
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
				fill="none"
				style={style}
				role="img"
				aria-label="HAKI Logo"
				className={className}
			>
				{hideLogoName ? (
					<>
						<rect width="40" height="40" fill="#f21644" rx="8" />
						<g transform="translate(4.7, 10) scale(0.2299)">
							<path fill="#ffffff" d={HAKI_H} />
						</g>
					</>
				) : (
					<g transform="translate(0, 9.215) scale(0.24793)">
						<path fill={ink} d={HAKI_H} />
						<path fill={ink} d={HAKI_A} />
						<path clipRule="evenodd" fill={ink} fillRule="evenodd" d={HAKI_K} />
						<rect x="441" y="0" width="43" height="87" fill={ink} />
					</g>
				)}
			</svg>
			{showVersion && (
				<span
					className={`text-[10px] font-medium ${
						white ? "text-white" : "text-gray-1"
					}`}
				>
					v{process.env.appVersion}
				</span>
			)}
			{showBeta && (
				<span
					className={`text-[10px] font-medium min-w-[52px] ${
						white ? "text-white" : "text-gray-1"
					}`}
				>
					Beta v{process.env.appVersion}
				</span>
			)}
		</div>
	);
};
