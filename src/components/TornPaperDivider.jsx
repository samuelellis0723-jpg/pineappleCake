export function TornPaperDivider({ inverted = false, className = '' }) {
  if (inverted) {
    return (
      <div className={`relative w-full overflow-hidden leading-none z-20 text-primary select-none -mb-[1px] ${className}`}>
        <svg
          className="w-full h-10 md:h-16 block fill-current"
          preserveAspectRatio="none"
          viewBox="0 0 1440 90"
        >
          <path d="M0,0 L1440,0 L1440,46 C1420,38 1395,59 1350,42 C1305,25 1260,65 1215,50 C1170,35 1125,62 1080,45 C1035,28 990,66 945,52 C900,38 855,66 810,48 C765,30 720,66 675,44 C630,22 585,35 540,50 C495,65 450,22 405,38 C360,54 315,26 270,42 C225,58 180,34 135,48 C90,62 45,30 0,45 Z" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden leading-none z-20 text-surface select-none -mb-[1px] ${className}`}>
      <svg
        className="w-full h-10 md:h-16 block fill-current"
        preserveAspectRatio="none"
        viewBox="0 0 1440 90"
      >
        <path d="M0,45 C45,30 90,62 135,48 C180,34 225,58 270,42 C315,26 360,54 405,38 C450,22 495,65 540,50 C585,35 630,22 675,44 C720,66 765,30 810,48 C855,66 900,38 945,52 C990,66 1035,28 1080,45 C1125,62 1170,35 1215,50 C1260,65 1305,25 1350,42 C1395,59 1420,38 1440,46 L1440,90 L0,90 Z" />
      </svg>
    </div>
  )
}

export default TornPaperDivider
