export function Modal({
  isOpen,
  title,
  children,
  onClose,
  maxWidth = 'max-w-xl',
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className={`relative w-full ${maxWidth} bg-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-surface-container-high`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
          <h3 className="font-headline-md text-headline-md text-on-surface">
            {title}
          </h3>
          <button
            aria-label="Cerrar modal"
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
