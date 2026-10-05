import { useState, useMemo } from 'react'
import { usePublishedCakes } from '../hooks/useCakes'
import ProductCard from './ProductCard'

const FALLBACK_CAKES = [
  {
    id: 'aventura-jurasica',
    category: 'Temático Infantil',
    name: 'Aventura Jurásica',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCL40KcZYNTe1hJdC1iSPWf8YGb2XtjAkpZSmIa-YDvl8-pK9XWKdHZmn_iBYN8X6BZjRAaj-botJB_E7k_hLy05zmJxYweoICvebtJHADCTULmvd4BMd1gW4GPDheUpsDsRDdym2TQ2yV09Er4Sr68fjkmjKxvOMuhHvIyVa9BoSVZa0JHuJywQnT9ck6TD2PVZgbZEKIrFfU4Kcb7G4ytj69KLz39W4bW167vyxi_CI93cBXotReS7KIcr3V5qC4B9g',
    description:
      'Modelado de dinosaurio en fondant, hojas selváticas de azúcar y suave bizcocho artesanal.',
  },
  {
    id: 'bluey-bingo',
    category: 'Crema & Diseño',
    name: 'Bluey & Bingo',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1junGGHDDtxT3riTqjjsI8emlRvjFx4C0WtkzQ8gAASf6xPHn01CRjyMNamWqLov6RDvHPHR_QgyVXzG5HlqGiuB6Zbn2BFajLTwzkw0ukIZGrrxXfTg4QdAKU7Z52AAjFnWOYLsCMeDp3GJkK1yLylqy7E0f5ukeNpKldAKB22Olr5PNochcJoRwH_PdrszNUc8IrCse8-5RFN4mtJvXe86Kni7O5rbS5aAkwUkD7131gx1YkB9RQwskWKOet71kw',
    description:
      'Creación texturizada en crema de mantequilla artesanal con personajes y sombrero festivo.',
  },
  {
    id: 'octagono-ufc',
    category: 'Edición Deportiva',
    name: 'Octágono UFC',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HHGzDtxwsJ4NsiV141EyxWh3rzNOC842ylUK1eifMoN9pUa6fdFHBjbOUJKjLwn03iOw2Nm60b0yBBbjlobVNULoWcfM4IxZXtuhNuRCbwPY6opuAn-BWb4N5ayIeWBnIQAs_4arPjNfg4j8pzNrIRpULCAEXjNW5pq38l6NDYZsl-PdKSsAiHTBjuU0VAt8ZUK3ENcLgcbRnh_RTPuT3YZH65T2FWmXCLLGHRFJRWXZj7fpmgQ1PaOgU78s2CLm_A',
    description:
      'Tarta esculpida con guante en fondant rojo y ring octagonal satinado en fondant negro.',
  },
  {
    id: 'odisea-espacial',
    category: 'Fantasía Cósmica',
    name: 'Odisea Espacial',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCio-bDnVwoIXMI0D3ez1IupiSxGxpTwI5aYSfQmludiqZfQXgu4Hs_Y4W-Jzvoo36LmQOO0yiM5FeDK3k7j7lQfyyArlwek6xun6PgEDWP5scyDMxw0FZl_QvKIN5ZSvs2fdyujtuMJ7Tu13T9qPmdVQ_DMcUBNPOgtmd9rbaV3uCME9XHRzL1PMyi6rvRFOGuLVlKJZuEaZty24P9qlP3d-QYF5D6tpsD80CYOI697phI-mzQvBdtFoIaO_I_Sfk1ZQ',
    description:
      'Astronauta artesanal, luna en azúcar, cohete dorado y cobertura galáctica con destellos estelares.',
  },
]

const BG_PALETTES = ['#FBF0EF', '#F2ECE3', '#EBE7EF', '#FBF0EF']

const PRESET_CATEGORIES = [
  'Temático Infantil',
  'Crema & Diseño',
  'Edición Deportiva',
  'Fantasía Cósmica',
  'Bodas & Celebraciones',
  'Especialidad de Autor',
]

export function ProductCollection() {
  const { cakes: dbCakes, loading } = usePublishedCakes()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const baseCakes = dbCakes.length > 0 ? dbCakes : FALLBACK_CAKES

  // Extraer dinámicamente las categorías disponibles
  const categories = useMemo(() => {
    const dynamicCats = new Set()
    baseCakes.forEach((c) => {
      if (c.category) dynamicCats.add(c.category)
    })
    PRESET_CATEGORIES.forEach((cat) => {
      // Si la categoría tiene al menos un pastel registrado, la incluimos
      if (baseCakes.some((c) => c.category === cat)) {
        dynamicCats.add(cat)
      }
    })
    return ['all', ...Array.from(dynamicCats)]
  }, [baseCakes])

  // Filtrar los pasteles según la categoría seleccionada
  const filteredCakes = useMemo(() => {
    if (selectedCategory === 'all') return baseCakes
    return baseCakes.filter((cake) => cake.category === selectedCategory)
  }, [baseCakes, selectedCategory])

  const totalFilteredCount = filteredCakes.length

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
  }

  return (
    <section id="colecciones" className="relative w-full bg-surface py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Pastelería de Temporada
          </span>
          <h2 className="font-display-md text-display-md text-on-surface tracking-tight">
            Colecciones de Autor
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Descubre nuestras tartas temáticas y de autor totalmente personalizadas:
            arte comestible, escultura en fondant y bizcochos artesanales para
            celebrar tus mejores momentos.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2 overflow-x-auto py-2 px-3 bg-surface-container-low/80 backdrop-blur-md rounded-full border border-outline-variant/30 max-w-full no-scrollbar shadow-sm">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              const label = cat === 'all' ? 'Todas las Colecciones' : cat
              const count =
                cat === 'all'
                  ? baseCakes.length
                  : baseCakes.filter((c) => c.category === cat).length

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-md shadow-primary/25 font-semibold scale-[1.02]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`inline-flex items-center justify-center text-[10px] h-5 min-w-[20px] px-1.5 rounded-full font-semibold ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 rounded-xl bg-surface-container-high/40 animate-pulse"
              />
            ))}
          </div>
        ) : filteredCakes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface-container-low border border-dashed border-outline-variant/60 max-w-md mx-auto space-y-4">
            <span className="material-symbols-outlined text-[40px] text-tertiary">
              cake
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Sin pasteles en esta categoría
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Aún no hay creaciones guardadas en &quot;{selectedCategory}&quot;.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-sm uppercase tracking-wider hover:bg-primary-container transition-all"
            >
              <span>Ver todas las colecciones</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter transition-all duration-300">
            {filteredCakes.map((cake, index) => {
              const formattedIndex = `${String(index + 1).padStart(2, '0')} / ${String(
                totalFilteredCount,
              ).padStart(2, '0')}`
              const bgColor = BG_PALETTES[index % BG_PALETTES.length]

              return (
                <ProductCard
                  key={cake.id}
                  category={cake.category}
                  indexNumber={formattedIndex}
                  title={cake.name}
                  imageSrc={cake.image_url}
                  imageAlt={`Pastel ${cake.name}`}
                  description={cake.description}
                  bgColor={bgColor}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductCollection
