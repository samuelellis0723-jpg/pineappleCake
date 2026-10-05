export function ProductCard({
  category,
  indexNumber,
  title,
  imageSrc,
  imageAlt,
  description,
  bgColor = '#FBF0EF',
  href = '#',
}) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="group flex flex-col justify-between rounded-xl p-6 shadow-[0_12px_32px_rgba(46,35,35,0.05)] hover:shadow-[0_20px_40px_rgba(46,35,35,0.09)] transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-label-sm text-label-sm uppercase tracking-widest px-3 py-1 rounded-full bg-surface/80 text-primary font-medium">
            {category}
          </span>
          <span className="font-label-md text-label-md text-tertiary">
            {indexNumber}
          </span>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface text-center mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface/60 p-3 mb-4 flex items-center justify-center">
          <img
            alt={imageAlt}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
            src={imageSrc}
          />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 pt-2">
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
        <a
          aria-label={`Pedir ${title}`}
          className="w-10 h-10 rounded-full bg-surface text-on-surface flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105 transition-all"
          href={href}
        >
          <span className="material-symbols-outlined text-[18px]">
            north_east
          </span>
        </a>
      </div>
    </div>
  )
}

export default ProductCard
