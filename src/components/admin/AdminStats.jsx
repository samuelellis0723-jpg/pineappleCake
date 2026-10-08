export function AdminStats({ stats, onNavigateToCakes, onNavigateToNew }) {
  const statCards = [
    {
      id: 'total',
      title: 'Total de Pasteles',
      value: stats.total,
      icon: 'inventory_2',
      bgColor: 'bg-[#FBF0EF]',
      textColor: 'text-primary',
    },
    {
      id: 'published',
      title: 'Pasteles Publicados',
      value: stats.published,
      icon: 'visibility',
      bgColor: 'bg-[#F2ECE3]',
      textColor: 'text-tertiary',
    },
    {
      id: 'drafts',
      title: 'Pasteles en Borrador',
      value: stats.drafts,
      icon: 'edit_note',
      bgColor: 'bg-[#EBE7EF]',
      textColor: 'text-primary-container',
    },
    {
      id: 'last',
      title: 'Última Publicación',
      value: stats.lastPublishedAt
        ? new Date(stats.lastPublishedAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'Sin publicaciones',
      isText: true,
      icon: 'event',
      bgColor: 'bg-surface-container',
      textColor: 'text-on-surface',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.id}
            className={`${card.bgColor} rounded-3xl p-6 shadow-sm border border-surface-container-high flex items-center justify-between transition-transform hover:-translate-y-0.5`}
          >
            <div className="space-y-1">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-medium">
                {card.title}
              </span>
              <p
                className={`font-display-md text-on-surface tracking-tight ${
                  card.isText ? 'text-headline-sm font-semibold' : 'text-display-md'
                }`}
              >
                {card.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl bg-surface/80 flex items-center justify-center ${card.textColor} shadow-sm`}
            >
              <span className="material-symbols-outlined text-[26px]">
                {card.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Banner */}
      <div className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-container-high/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            Acciones Rápidas
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            ¿Listo para deleitar a tus clientes con un nuevo diseño?
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Agrega nuevas creaciones artesanales o administra los estados de publicación
            para que se sincronicen en tiempo real con la tienda pública.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={onNavigateToNew}
            type="button"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Nuevo Pastel</span>
          </button>
          <button
            onClick={onNavigateToCakes}
            type="button"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">list_alt</span>
            <span>Ver Catálogo</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminStats
