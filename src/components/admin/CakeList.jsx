import { useState, useMemo } from 'react'
import CakeCardRow from './CakeCardRow'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todas las categorías' },
  { id: 'Temático Infantil', label: 'Temático Infantil' },
  { id: 'Crema & Diseño', label: 'Crema & Diseño' },
  { id: 'Edición Deportiva', label: 'Edición Deportiva' },
  { id: 'Fantasía Cósmica', label: 'Fantasía Cósmica' },
  { id: 'Bodas & Celebraciones', label: 'Bodas & Celebraciones' },
  { id: 'Especialidad de Autor', label: 'Especialidad de Autor' },
]

export function CakeList({
  cakes = [],
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
  onAddNew,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const matchesSearch = cake.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
      const matchesCategory =
        selectedCategory === 'all' || cake.category === selectedCategory
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'published' && cake.is_published) ||
        (selectedStatus === 'draft' && !cake.is_published)

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [cakes, searchTerm, selectedCategory, selectedStatus])

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/80 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre de pastel..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary font-body-md text-body-md"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary font-body-sm text-body-sm"
          >
            {CATEGORY_FILTERS.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary font-body-sm text-body-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="published">Solo Publicados</option>
            <option value="draft">Solo Borradores</option>
          </select>

          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary-container shrink-0 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Nuevo</span>
          </button>
        </div>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            Cargando catálogo de pasteles...
          </p>
        </div>
      ) : filteredCakes.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-3xl p-12 text-center border border-dashed border-outline-variant/80 space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mx-auto">
            <span className="material-symbols-outlined text-[32px]">cake</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'No se encontraron resultados'
                : 'Aún no has agregado ningún pastel'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-sm mx-auto">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Prueba modificando tus filtros o el término de búsqueda.'
                : 'Comienza agregando tu primer diseño artesanal para exhibirlo en la tienda.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Agregar Primer Pastel</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredCakes.map((cake) => (
            <CakeCardRow
              key={cake.id}
              cake={cake}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CakeList
