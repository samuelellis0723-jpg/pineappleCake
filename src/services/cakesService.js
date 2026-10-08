import { supabase, isSupabaseConfigured } from './supabase'
import { storageService } from './storageService'

const STORAGE_KEY = 'pineapple_cakes'

export const DEFAULT_CAKES = [
  {
    id: 'cake-aventura-jurasica',
    name: 'Aventura Jurásica',
    category: 'Temático Infantil',
    description:
      'Modelado de dinosaurio en fondant, hojas selváticas de azúcar y suave bizcocho artesanal.',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCL40KcZYNTe1hJdC1iSPWf8YGb2XtjAkpZSmIa-YDvl8-pK9XWKdHZmn_iBYN8X6BZjRAaj-botJB_E7k_hLy05zmJxYweoICvebtJHADCTULmvd4BMd1gW4GPDheUpsDsRDdym2TQ2yV09Er4Sr68fjkmjKxvOMuhHvIyVa9BoSVZa0JHuJywQnT9ck6TD2PVZgbZEKIrFfU4Kcb7G4ytj69KLz39W4bW167vyxi_CI93cBXotReS7KIcr3V5qC4B9g',
    image_path: '',
    is_published: true,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'cake-bluey-bingo',
    name: 'Bluey & Bingo',
    category: 'Crema & Diseño',
    description:
      'Creación texturizada en crema de mantequilla artesanal con personajes y sombrero festivo.',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1junGGHDDtxT3riTqjjsI8emlRvjFx4C0WtkzQ8gAASf6xPHn01CRjyMNamWqLov6RDvHPHR_QgyVXzG5HlqGiuB6Zbn2BFajLTwzkw0ukIZGrrxXfTg4QdAKU7Z52AAjFnWOYLsCMeDp3GJkK1yLylqy7E0f5ukeNpKldAKB22Olr5PNochcJoRwH_PdrszNUc8IrCse8-5RFN4mtJvXe86Kni7O5rbS5aAkwUkD7131gx1YkB9RQwskWKOet71kw',
    image_path: '',
    is_published: true,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'cake-octagono-ufc',
    name: 'Octágono UFC',
    category: 'Edición Deportiva',
    description:
      'Tarta esculpida con guante en fondant rojo y ring octagonal satinado en fondant negro.',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HHGzDtxwsJ4NsiV141EyxWh3rzNOC842ylUK1eifMoN9pUa6fdFHBjbOUJKjLwn03iOw2Nm60b0yBBbjlobVNULoWcfM4IxZXtuhNuRCbwPY6opuAn-BWb4N5ayIeWBnIQAs_4arPjNfg4j8pzNrIRpULCAEXjNW5pq38l6NDYZsl-PdKSsAiHTBjuU0VAt8ZUK3ENcLgcbRnh_RTPuT3YZH65T2FWmXCLLGHRFJRWXZj7fpmgQ1PaOgU78s2CLm_A',
    image_path: '',
    is_published: true,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'cake-odisea-espacial',
    name: 'Odisea Espacial',
    category: 'Fantasía Cósmica',
    description:
      'Astronauta artesanal, luna en azúcar, cohete dorado y cobertura galáctica con destellos estelares.',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCio-bDnVwoIXMI0D3ez1IupiSxGxpTwI5aYSfQmludiqZfQXgu4Hs_Y4W-Jzvoo36LmQOO0yiM5FeDK3k7j7lQfyyArlwek6xun6PgEDWP5scyDMxw0FZl_QvKIN5ZSvs2fdyujtuMJ7Tu13T9qPmdVQ_DMcUBNPOgtmd9rbaV3uCME9XHRzL1PMyi6rvRFOGuLVlKJZuEaZty24P9qlP3d-QYF5D6tpsD80CYOI697phI-mzQvBdtFoIaO_I_Sfk1ZQ',
    image_path: '',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

/**
 * Obtiene los pasteles del almacenamiento local o siembra los iniciales.
 */
function getLocalCakes() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY)
    if (!rawData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CAKES))
      return [...DEFAULT_CAKES]
    }
    const parsed = JSON.parse(rawData)
    return Array.isArray(parsed) ? parsed : [...DEFAULT_CAKES]
  } catch (err) {
    console.error('[cakesService] Error al leer de localStorage:', err)
    return [...DEFAULT_CAKES]
  }
}

/**
 * Persiste la colección de pasteles en localStorage y emite evento global.
 */
function saveLocalCakes(cakes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cakes))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('pineapple_cakes_updated'))
    }
  } catch (err) {
    console.error('[cakesService] Error al escribir en localStorage:', err)
    throw new Error('Almacenamiento lleno o no disponible. Verifica el tamaño de las imágenes.', {
      cause: err,
    })
  }
}

export const cakesService = {
  /**
   * Obtiene la lista de pasteles públicos (para el catálogo/landing page).
   */
  async getPublishedCakes() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('cakes')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          return data
        }
      } catch (err) {
        console.warn('[cakesService] Fallo al consultar Supabase, usando localStorage:', err.message)
      }
    }

    const localList = getLocalCakes()
    return localList
      .filter((cake) => Boolean(cake.is_published))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  },

  /**
   * Obtiene todos los pasteles con soporte para filtrado (para el panel admin).
   */
  async getAllCakes({ search = '', category = 'all', status = 'all' } = {}) {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('cakes')
          .select('*')
          .order('created_at', { ascending: false })

        if (search.trim()) {
          query = query.ilike('name', `%${search.trim()}%`)
        }
        if (category !== 'all') {
          query = query.eq('category', category)
        }
        if (status === 'published') {
          query = query.eq('is_published', true)
        } else if (status === 'draft') {
          query = query.eq('is_published', false)
        }

        const { data, error } = await query
        if (!error && data) {
          return data
        }
      } catch (err) {
        console.warn('[cakesService] Supabase no disponible, usando localStorage:', err.message)
      }
    }

    const list = getLocalCakes()

    return list
      .filter((cake) => {
        const matchesSearch = search.trim()
          ? cake.name.toLowerCase().includes(search.trim().toLowerCase())
          : true
        const matchesCategory = category === 'all' || cake.category === category
        const matchesStatus =
          status === 'all' ||
          (status === 'published' && cake.is_published) ||
          (status === 'draft' && !cake.is_published)

        return matchesSearch && matchesCategory && matchesStatus
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  },

  /**
   * Calcula estadísticas del inventario de pasteles.
   */
  async getCakesStats() {
    const allCakes = await this.getAllCakes()
    const total = allCakes.length
    const published = allCakes.filter((c) => Boolean(c.is_published)).length
    const drafts = total - published

    const publishedCakes = allCakes
      .filter((c) => Boolean(c.is_published))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const lastPublishedAt = publishedCakes.length > 0 ? publishedCakes[0].created_at : null

    return {
      total,
      published,
      drafts,
      lastPublishedAt,
    }
  },

  /**
   * Crea un nuevo pastel gestionando la imagen (Base64 o Supabase).
   */
  async createCake({ name, description, category, isPublished, imageFile, imageUrl }) {
    let finalImageUrl = imageUrl || ''
    let finalImagePath = ''

    if (imageFile) {
      const uploadRes = await storageService.uploadCakeImage(imageFile)
      finalImageUrl = uploadRes.publicUrl
      finalImagePath = uploadRes.path
    }

    if (!finalImageUrl) {
      throw new Error('Se requiere una imagen válida para registrar el pastel.')
    }

    const newCake = {
      id: `cake-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      description: description ? description.trim() : '',
      category: category || 'Temático Infantil',
      is_published: Boolean(isPublished),
      image_url: finalImageUrl,
      image_path: finalImagePath,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Persistir localmente
    const currentList = getLocalCakes()
    saveLocalCakes([newCake, ...currentList])

    // Sincronizar con Supabase si está disponible
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('cakes')
          .insert([
            {
              name: newCake.name,
              description: newCake.description,
              category: newCake.category,
              is_published: newCake.is_published,
              image_url: newCake.image_url,
              image_path: newCake.image_path,
            },
          ])
          .select()
          .single()

        if (!error && data) {
          return data
        }
      } catch (err) {
        console.warn('[cakesService] No se pudo sincronizar en Supabase:', err.message)
      }
    }

    return newCake
  },

  /**
   * Actualiza un pastel existente.
   */
  async updateCake(
    id,
    { name, description, category, isPublished, imageFile, imageUrl, currentImagePath },
  ) {
    let finalImageUrl = imageUrl
    let newImagePath = currentImagePath || ''

    if (imageFile) {
      const uploadRes = await storageService.uploadCakeImage(imageFile)
      finalImageUrl = uploadRes.publicUrl
      newImagePath = uploadRes.path
    }

    const currentList = getLocalCakes()
    const targetIndex = currentList.findIndex((c) => c.id === id)

    if (targetIndex === -1) {
      throw new Error('Pastel no encontrado en la base de datos.')
    }

    const existingCake = currentList[targetIndex]
    const updatedCake = {
      ...existingCake,
      name: name ? name.trim() : existingCake.name,
      description: description !== undefined ? description.trim() : existingCake.description,
      category: category || existingCake.category,
      is_published: isPublished !== undefined ? Boolean(isPublished) : existingCake.is_published,
      image_url: finalImageUrl || existingCake.image_url,
      image_path: newImagePath,
      updated_at: new Date().toISOString(),
    }

    currentList[targetIndex] = updatedCake
    saveLocalCakes([...currentList])

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('cakes')
          .update({
            name: updatedCake.name,
            description: updatedCake.description,
            category: updatedCake.category,
            is_published: updatedCake.is_published,
            image_url: updatedCake.image_url,
            image_path: updatedCake.image_path,
          })
          .eq('id', id)
      } catch (err) {
        console.warn('[cakesService] Error al actualizar en Supabase:', err.message)
      }
    }

    return updatedCake
  },

  /**
   * Alterna el estado de publicación (publicado / borrador).
   */
  async togglePublishStatus(id, currentStatus) {
    const currentList = getLocalCakes()
    const targetIndex = currentList.findIndex((c) => c.id === id)

    if (targetIndex === -1) {
      throw new Error('Pastel no encontrado.')
    }

    const updatedCake = {
      ...currentList[targetIndex],
      is_published: !currentStatus,
      updated_at: new Date().toISOString(),
    }

    currentList[targetIndex] = updatedCake
    saveLocalCakes([...currentList])

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('cakes')
          .update({ is_published: !currentStatus })
          .eq('id', id)
      } catch (err) {
        console.warn('[cakesService] Error al alternar estado en Supabase:', err.message)
      }
    }

    return updatedCake
  },

  /**
   * Elimina un pastel de la persistencia.
   */
  async deleteCake(id, imagePath) {
    const currentList = getLocalCakes()
    const filteredList = currentList.filter((c) => c.id !== id)
    saveLocalCakes(filteredList)

    if (imagePath) {
      await storageService.deleteCakeImage(imagePath)
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('cakes').delete().eq('id', id)
      } catch (err) {
        console.warn('[cakesService] Error al eliminar en Supabase:', err.message)
      }
    }

    return true
  },
}

export default cakesService
