import { useState } from 'react'
import { useAdminCakes } from '../hooks/useCakes'
import { cakesService } from '../services/cakesService'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import AdminStats from '../components/admin/AdminStats'
import CakeList from '../components/admin/CakeList'
import CakeForm from '../components/admin/CakeForm'
import Modal from '../components/ui/Modal'
import Toast from '../components/ui/Toast'

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [cakeToEdit, setCakeToEdit] = useState(null)
  const [cakeToDelete, setCakeToDelete] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const { cakes, stats, loading, refetch } = useAdminCakes()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000)
  }

  const handleSelectTab = (tab) => {
    setActiveTab(tab)
    if (tab !== 'new') setCakeToEdit(null)
  }

  const handleStartEdit = (cake) => {
    setCakeToEdit(cake)
    setActiveTab('new')
  }

  const handleSaveCake = async (formData) => {
    try {
      setIsSaving(true)
      if (cakeToEdit) {
        await cakesService.updateCake(cakeToEdit.id, formData)
        showToast('Pastel actualizado exitosamente.')
      } else {
        await cakesService.createCake(formData)
        showToast('Pastel creado y guardado exitosamente.')
      }
      setCakeToEdit(null)
      setActiveTab('cakes')
      await refetch()
    } catch (err) {
      showToast(err.message || 'Error al guardar el pastel.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleStatus = async (cake) => {
    try {
      await cakesService.togglePublishStatus(cake.id, cake.is_published)
      showToast(
        cake.is_published
          ? 'El pastel ahora está en borrador.'
          : 'El pastel ha sido publicado en el Landing Page.',
      )
      await refetch()
    } catch (err) {
      showToast(err.message || 'Error al cambiar estado.', 'error')
    }
  }

  const handleConfirmDelete = async () => {
    if (!cakeToDelete) return
    try {
      setIsDeleting(true)
      await cakesService.deleteCake(cakeToDelete.id, cakeToDelete.image_path)
      showToast('Pastel eliminado correctamente.')
      setCakeToDelete(null)
      await refetch()
    } catch (err) {
      showToast(err.message || 'Error al eliminar el pastel.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const getHeaderTitle = () => {
    if (activeTab === 'dashboard') return 'Resumen del Negocio'
    if (activeTab === 'cakes') return 'Gestión del Catálogo'
    if (activeTab === 'new') {
      return cakeToEdit ? `Editar: ${cakeToEdit.name}` : 'Crear Nuevo Pastel'
    }
    return 'Panel Administrativo'
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AdminHeader
          title={getHeaderTitle()}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminStats
              stats={stats}
              onNavigateToCakes={() => setActiveTab('cakes')}
              onNavigateToNew={() => {
                setCakeToEdit(null)
                setActiveTab('new')
              }}
            />
          )}

          {activeTab === 'cakes' && (
            <CakeList
              cakes={cakes}
              loading={loading}
              onEdit={handleStartEdit}
              onDelete={(cake) => setCakeToDelete(cake)}
              onToggleStatus={handleToggleStatus}
              onAddNew={() => {
                setCakeToEdit(null)
                setActiveTab('new')
              }}
            />
          )}

          {activeTab === 'new' && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-sm">
              <CakeForm
                key={cakeToEdit ? cakeToEdit.id : 'new'}
                cakeToEdit={cakeToEdit}
                onSave={handleSaveCake}
                onCancel={() => {
                  setCakeToEdit(null)
                  setActiveTab('cakes')
                }}
                isSaving={isSaving}
              />
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(cakeToDelete)}
        title="Confirmar Eliminación"
        onClose={() => setCakeToDelete(null)}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            ¿Estás seguro de que deseas eliminar permanentemente el pastel{' '}
            <strong className="text-on-surface font-semibold">
              {cakeToDelete?.name}
            </strong>
            ? Esta acción también eliminará la imagen asociada y no se puede deshacer.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high">
            <button
              type="button"
              onClick={() => setCakeToDelete(null)}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-2xl border border-outline-variant/60 text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-6 py-2.5 rounded-2xl bg-error text-on-error font-label-md text-label-md uppercase tracking-wider shadow-md shadow-error/20 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Floating Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  )
}

export default AdminDashboardPage
