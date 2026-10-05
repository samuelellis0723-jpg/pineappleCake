export function CakeCardRow({
  cake,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling = false,
}) {
  const formattedDate = new Date(cake.created_at).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Cake Thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-surface-container-high flex items-center justify-center">
          {cake.image_url ? (
            <img
              src={cake.image_url}
              alt={cake.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-[28px] text-tertiary">
              cake
            </span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-[11px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-medium">
              {cake.category}
            </span>
            <button
              type="button"
              onClick={() => onToggleStatus(cake)}
              disabled={isToggling}
              className={`font-label-sm text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                cake.is_published
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
              title="Haz clic para cambiar estado"
            >
              {cake.is_published ? '● Publicado' : '○ Borrador'}
            </button>
          </div>

          <h4 className="font-headline-sm text-[18px] text-on-surface truncate font-semibold">
            {cake.name}
          </h4>

          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
            {cake.description || 'Sin descripción'}
          </p>

          <span className="font-label-sm text-[11px] text-tertiary block">
            Registrado: {formattedDate}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={() => onEdit(cake)}
          className="w-10 h-10 rounded-2xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-all"
          title="Editar pastel"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(cake)}
          className="w-10 h-10 rounded-2xl bg-surface-container-high hover:bg-error hover:text-on-error text-error flex items-center justify-center transition-all"
          title="Eliminar pastel"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  )
}

export default CakeCardRow
