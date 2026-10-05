import { useState, useRef } from 'react'
import { storageService } from '../../services/storageService'

const CATEGORY_OPTIONS = [
  'Temático Infantil',
  'Crema & Diseño',
  'Edición Deportiva',
  'Fantasía Cósmica',
  'Bodas & Celebraciones',
  'Especialidad de Autor',
]

/**
 * Formulario de creación y edición de pasteles para el panel administrativo.
 * Soporta carga por archivo (FileReader / Base64) o URL externa con vista previa instantánea.
 */
export function CakeForm({
  cakeToEdit = null,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const isEditing = Boolean(cakeToEdit)

  // Inicialización directa de estado basada en props (sin efectos secundarios)
  const [name, setName] = useState(cakeToEdit?.name || '')
  const [description, setDescription] = useState(cakeToEdit?.description || '')
  const [category, setCategory] = useState(cakeToEdit?.category || CATEGORY_OPTIONS[0])
  const [isPublished, setIsPublished] = useState(
    cakeToEdit ? Boolean(cakeToEdit.is_published) : true,
  )
  const [imageMode, setImageMode] = useState('file') // 'file' | 'url'
  const [urlValue, setUrlValue] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(cakeToEdit?.image_url || '')
  const [isReadingFile, setIsReadingFile] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fileInputRef = useRef(null)

  // Manejador de selección de archivo con FileReader y compresión Base64
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = storageService.validateImage(file)
    if (!validation.valid) {
      setErrorMessage(validation.message)
      return
    }

    try {
      setIsReadingFile(true)
      setErrorMessage('')
      const base64Data = await storageService.readFileAsBase64(file)
      setImageFile(file)
      setPreviewUrl(base64Data)
    } catch (err) {
      setErrorMessage(err.message || 'No se pudo cargar la imagen seleccionada.')
    } finally {
      setIsReadingFile(false)
    }
  }

  // Aplicar URL externa como imagen
  const handleApplyUrl = () => {
    if (!urlValue.trim()) {
      setErrorMessage('Por favor ingresa una URL válida.')
      return
    }
    setErrorMessage('')
    setImageFile(null)
    setPreviewUrl(urlValue.trim())
  }

  // Eliminar imagen actual
  const handleRemoveImage = () => {
    setImageFile(null)
    setPreviewUrl('')
    setUrlValue('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Validación y envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('El nombre del pastel es un campo obligatorio.')
      return
    }

    if (!previewUrl && !imageFile) {
      setErrorMessage('Debes adjuntar una fotografía o enlace de imagen para el pastel.')
      return
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      category,
      isPublished,
      imageFile,
      imageUrl: previewUrl,
      currentImagePath: cakeToEdit?.image_path,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-error-container text-on-error-container text-body-sm flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[20px] text-error">
            error
          </span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna Izquierda: Información del Pastel */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cakeName"
              className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2"
            >
              Nombre del Pastel *
            </label>
            <input
              id="cakeName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Pastel Aventura Jurásica"
              required
              className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md text-body-md transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="cakeCategory"
              className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2"
            >
              Categoría *
            </label>
            <select
              id="cakeCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md text-body-md"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cakeDescription"
              className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2"
            >
              Descripción
            </label>
            <textarea
              id="cakeDescription"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bizcocho esponjoso, cobertura y detalles en fondant..."
              className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md text-body-md resize-none transition-all"
            />
          </div>

          {/* Toggle de Estado de Publicación */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold block">
                Estado en Catálogo
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {isPublished
                  ? 'Público en la Landing Page'
                  : 'Borrador interno (no visible al cliente)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsPublished((prev) => !prev)}
              aria-label="Alternar publicación"
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPublished ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isPublished ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Columna Derecha: Selector de Imagen & Vista Previa */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Fotografía del Pastel *
            </label>
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
              <button
                type="button"
                onClick={() => setImageMode('file')}
                className={`px-3 py-1 rounded-lg text-label-sm font-medium transition-all ${
                  imageMode === 'file'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Subir Archivo
              </button>
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`px-3 py-1 rounded-lg text-label-sm font-medium transition-all ${
                  imageMode === 'url'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                URL Web
              </button>
            </div>
          </div>

          {/* Modo URL Input */}
          {imageMode === 'url' && (
            <div className="flex gap-2">
              <input
                type="url"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="https://ejemplo.com/foto-pastel.jpg"
                className="flex-1 px-4 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-sm focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 rounded-2xl bg-primary text-on-primary text-label-sm uppercase font-semibold shrink-0 hover:bg-primary-container transition-all"
              >
                Cargar
              </button>
            </div>
          )}

          {/* Contenedor Dropzone / Vista Previa */}
          <div className="relative border-2 border-dashed border-outline-variant/60 rounded-3xl p-4 text-center bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col items-center justify-center min-h-[220px]">
            {isReadingFile ? (
              <div className="flex flex-col items-center gap-2 p-6">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-body-sm text-on-surface-variant">
                  Procesando imagen...
                </span>
              </div>
            ) : previewUrl ? (
              <div className="relative w-full aspect-square max-w-[220px] rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={previewUrl}
                  alt="Vista previa del pastel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {imageMode === 'file' && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-full bg-surface text-on-surface hover:scale-110 transition-transform shadow-md"
                      title="Cambiar imagen"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2.5 rounded-full bg-error text-on-error hover:scale-110 transition-transform shadow-md"
                    title="Eliminar imagen"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer space-y-3 p-4 flex flex-col items-center w-full"
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">
                    add_photo_alternate
                  </span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">
                    Haz clic para cargar imagen
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    JPG, PNG, WEBP o GIF (FileReader Base64 optimizado)
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-3 pt-5 border-t border-surface-container-high">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-2xl border border-outline-variant/60 text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSaving || isReadingFile}
          className="px-8 py-2.5 rounded-2xl bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-md shadow-primary/25 hover:bg-primary-container disabled:opacity-60 transition-all flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                {isEditing ? 'check' : 'add'}
              </span>
              <span>{isEditing ? 'Actualizar Pastel' : 'Guardar Pastel'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default CakeForm
