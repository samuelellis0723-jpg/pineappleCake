export function Footer() {
  return (
    <footer className="relative w-full bg-primary text-on-primary">
      <div className="w-full overflow-hidden leading-none -mt-px">
        <svg
          className="block w-full h-8 sm:h-12 text-surface fill-current rotate-180"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter lg:gap-space-xl">
          <div className="space-y-space-md">
            <div className="flex flex-col">
              <span className="font-headline-lg text-headline-lg text-on-primary">
                PineappleCakes
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">
                Pasteles de Piña &amp; Repostería
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-primary-fixed max-w-xs leading-relaxed">
              Creando momentos diarios de dulce deleite y lujo artesanal desde 2018.
            </p>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-primary tracking-wide">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-space-sm">
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="about-us"
                  href="#"
                >
                  Nuestra Historia
                </a>
              </li>
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="cakes"
                  href="#"
                >
                  Menú de Temporada
                </a>
              </li>
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="catering"
                  href="#"
                >
                  Catering &amp; Eventos
                </a>
              </li>
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="gift-cards"
                  href="#"
                >
                  Tarjetas de Regalo
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-primary tracking-wide">
              Atención al Cliente
            </h4>
            <ul className="space-y-space-sm">
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="ordering-and-pickup"
                  href="#"
                >
                  Pedidos y Recogida
                </a>
              </li>
              <li className="leading-none">
                <a
                  className="font-body-sm text-body-sm text-primary-fixed hover:text-on-primary transition-colors"
                  data-path="delivery-info"
                  href="#"
                >
                  Información de Envío
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-primary tracking-wide">
              Contáctanos
            </h4>
            <ul className="space-y-space-sm">
              <li className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                  call
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed">
                  +1 (555) 234-5678
                </span>
              </li>
              <li className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                  mail
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed">
                  contacto@pineapplecakes.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md opacity-85">
          <p className="font-body-sm text-body-sm text-primary-fixed">
            © 2024 Pineapple Cakes &amp; Bakery. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-space-lg">
            <a
              className="font-label-sm text-label-sm text-primary-fixed hover:text-on-primary transition-colors"
              data-path="privacy-policy"
              href="#"
            >
              Política de Privacidad
            </a>
            <a
              className="font-label-sm text-label-sm text-primary-fixed hover:text-on-primary transition-colors"
              data-path="terms-of-service"
              href="#"
            >
              Términos del Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
