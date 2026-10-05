import TornPaperDivider from './TornPaperDivider'

export function Hero() {
  return (
    <section className="relative w-full bg-primary overflow-hidden text-on-primary">
      {/* Ambient backdrops and subtle lighting */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary-container/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-margin-mobile md:px-margin pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-space-md z-10">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-container/50 text-primary-fixed backdrop-blur-md shadow-sm">
              <span
                className="material-symbols-outlined text-[16px] text-primary-fixed"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                auto_awesome
              </span>
              <span className="font-label-md text-label-md tracking-widest uppercase">
                Alta Pastelería Artesanal
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-surface-bright leading-tight tracking-tight">
              La vida es mejor con{' '}
              <span className="italic font-normal text-primary-fixed">
                un toque dulce
              </span>
            </h1>

            {/* Refined Body Paragraph */}
            <div className="font-body-lg text-body-md md:text-body-lg text-primary-fixed/90 max-w-xl leading-relaxed pt-space-xs">
              <p>
                Creaciones 100 % personalizadas, lo que usted desea{' '}
                <span className="text-[#ffd9dc]/90 font-medium">
                  nosotros lo hacemos realidad.
                </span>
              </p>
            </div>

            {/* Interactive Actions & Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-space-lg pt-space-md w-full sm:w-auto">
              <a
                className="inline-flex items-center justify-center gap-space-sm h-14 px-8 rounded-full bg-surface text-on-surface font-label-lg text-label-lg uppercase tracking-widest shadow-[0_12px_32px_rgba(46,35,35,0.22)] hover:bg-surface-container-low hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                data-path="cakes"
                href="#colecciones"
              >
                <span>Solicita tu pastel unico</span>
                <span className="material-symbols-outlined text-[20px] text-primary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>

            {/* Micro Metas */}
            <div className="pt-space-md flex items-center gap-space-lg text-primary-fixed/75 text-body-sm font-body-sm">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  wb_twilight
                </span>{' '}
                Horneado fresco cada amanecer
              </span>
            </div>
          </div>

          {/* Right Featured Image Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Concentric soft rings */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-primary-container/35 blur-2xl" />
            <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-primary-fixed/20 animate-pulse" />

            {/* Main Image container with elevation */}
            <div className="relative z-10 w-full max-w-[380px] md:max-w-[430px] aspect-square rounded-3xl overflow-hidden p-3 bg-gradient-to-b from-primary-fixed/20 to-transparent backdrop-blur-md shadow-[0_24px_50px_rgba(46,35,35,0.35)] group">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-surface-container-high/40 flex items-center justify-center relative">
                <img
                  alt="Pastel personalizado Dino Baby Emiliano"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxHpkr8JmmeASKLxETOWNmQfRAhBPJ07fJpWhSe0lAdS2JmtYQ2nEkCSO0u8XazDvhHUi7DZhS00U-HBNPIJ03od1BW26pNYHkhDOSg_ZtPq_5aGZNyhEn1lf0STXrcaAlWFALR5RlCLcBmtyFS2DKbeaK5Ww-_zX05VZhaUfPbDEui0ZlCxyoBZzY5AwAEOPzBV5TSvf_5uQyVPZitIXpCvhe1cg13VqpAwyXeKHZ0F5RY4-5upcpvz3WhLEgvYvQWg"
                />
                {/* Inner ambient gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge: Signature Recipe */}
              <div className="absolute -bottom-2 -left-2 md:-left-4 bg-surface text-on-surface py-2.5 px-4 rounded-full shadow-[0_10px_24px_rgba(46,35,35,0.18)] flex items-center gap-space-sm z-20">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  <span className="material-symbols-outlined text-[18px]">
                    verified_user
                  </span>
                </div>
                <div className="flex flex-col pr-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                    Receta de Autor
                  </span>
                </div>
              </div>

              {/* Floating Pill Sparkle Badge */}
              <div className="absolute top-4 right-4 bg-primary-container/80 backdrop-blur-md text-primary-fixed px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span
                  className="material-symbols-outlined text-[16px] text-primary-fixed"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  auto_awesome
                </span>
                <span className="font-label-sm text-label-sm tracking-wider uppercase">
                  Fondant Artesanal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentic Organic Torn Paper Edge Divider */}
      <TornPaperDivider />
    </section>
  )
}

export default Hero
