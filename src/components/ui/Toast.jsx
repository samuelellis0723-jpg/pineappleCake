export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null

  const isSuccess = type === 'success'
  const isError = type === 'error'

  const bgColor = isSuccess
    ? 'bg-primary text-on-primary'
    : isError
      ? 'bg-error text-on-error'
      : 'bg-surface-container-highest text-on-surface'

  const iconName = isSuccess ? 'check_circle' : isError ? 'error' : 'info'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-md ${bgColor}`}
      >
        <span className="material-symbols-outlined text-[20px]">{iconName}</span>
        <span className="font-body-sm text-body-sm font-medium">{message}</span>
        {onClose && (
          <button
            aria-label="Cerrar notificación"
            className="ml-2 hover:opacity-80 transition-opacity"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Toast
