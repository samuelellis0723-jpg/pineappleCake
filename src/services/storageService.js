import { supabase, isSupabaseConfigured } from './supabase'

const BUCKET_NAME = 'cakes'
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * Servicio de almacenamiento para gestionar imágenes tanto en Base64 (localStorage)
 * como en Supabase Storage cuando está configurado.
 */
export const storageService = {
  /**
   * Valida tipo y tamaño de archivo de imagen.
   * @param {File} file
   * @returns {{ valid: boolean, message?: string }}
   */
  validateImage(file) {
    if (!file) {
      return { valid: false, message: 'No se seleccionó ningún archivo de imagen.' }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        message: 'Formato no soportado. Por favor utiliza JPG, PNG, WEBP o GIF.',
      }
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        message: `La imagen excede el límite máximo de ${MAX_FILE_SIZE_MB}MB.`,
      }
    }

    return { valid: true }
  },

  /**
   * Lee un archivo como DataURL (Base64) usando FileReader y lo optimiza con Canvas
   * para evitar desbordar la cuota de localStorage (~5MB).
   * @param {File} file
   * @param {number} maxDimension - Ancho o alto máximo en píxeles (default: 1200)
   * @param {number} quality - Calidad JPEG (0.1 a 1.0, default: 0.85)
   * @returns {Promise<string>} Data URL Base64 optimizada
   */
  readFileAsBase64(file, maxDimension = 1200, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const validation = this.validateImage(file)
      if (!validation.valid) {
        reject(new Error(validation.message))
        return
      }

      const reader = new FileReader()

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo con FileReader.'))
      }

      reader.onload = (event) => {
        const rawDataUrl = event.target?.result
        if (typeof rawDataUrl !== 'string') {
          reject(new Error('Formato de datos no válido.'))
          return
        }

        // Si es GIF o SVG, no comprimir con canvas para preservar animación/vector
        if (file.type === 'image/gif' || file.type === 'image/svg+xml') {
          resolve(rawDataUrl)
          return
        }

        const img = new Image()
        img.onerror = () => resolve(rawDataUrl) // Fallback al original si falla el canvas
        img.onload = () => {
          let { width, height } = img

          // Redimensionar proporcionalmente si supera la dimensión máxima
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width)
              width = maxDimension
            } else {
              width = Math.round((width * maxDimension) / height)
              height = maxDimension
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            resolve(rawDataUrl)
            return
          }

          ctx.drawImage(img, 0, 0, width, height)
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
          const compressedDataUrl = canvas.toDataURL(outputType, quality)

          resolve(compressedDataUrl)
        }

        img.src = rawDataUrl
      }

      reader.readAsDataURL(file)
    })
  },

  /**
   * Sube una imagen a Supabase Storage (si está configurado) o devuelve Base64.
   * @param {File} file
   * @returns {Promise<{ publicUrl: string, path: string }>}
   */
  async uploadCakeImage(file) {
    if (!isSupabaseConfigured || !supabase) {
      // Si Supabase no está configurado, persistimos en Base64
      const base64Url = await this.readFileAsBase64(file)
      return {
        publicUrl: base64Url,
        path: `local_${Date.now()}_${file.name}`,
      }
    }

    const validation = this.validateImage(file)
    if (!validation.valid) {
      throw new Error(validation.message)
    }

    const fileExt = file.name.split('.').pop()
    const sanitizedName = file.name
      .replace(`.${fileExt}`, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()
    const filePath = `cakes/${Date.now()}_${sanitizedName}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

    return {
      publicUrl: data.publicUrl,
      path: filePath,
    }
  },

  /**
   * Elimina una imagen de Supabase Storage si corresponde.
   * @param {string} filePath
   */
  async deleteCakeImage(filePath) {
    if (!filePath || !isSupabaseConfigured || !supabase) {
      return
    }

    if (!filePath.startsWith('cakes/') && !filePath.includes('/')) {
      return
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      console.warn('Error al eliminar archivo de storage:', error.message)
    }
  },
}

export default storageService

