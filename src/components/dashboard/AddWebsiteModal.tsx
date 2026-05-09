import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { DomainInput } from '#/components/ui/DomainInput'

interface AddWebsiteModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (domain: string) => Promise<void>
}

export function AddWebsiteModal({ isOpen, onClose, onAdd }: AddWebsiteModalProps) {
  async function handleSuccess(domain: string) {
    await onAdd(domain)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => { if (!open) onClose() }}
      size="md"
      backdrop="blur"
      classNames={{
        base: 'border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)]',
        header: 'border-b border-neutral-100 pb-4',
        body: 'py-6',
        footer: 'border-t border-neutral-100 pt-4',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <span className="text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">Add a website</span>
          <p className="text-[13px] text-neutral-400 font-normal">Enter your domain to start collecting feedback.</p>
        </ModalHeader>
        <ModalBody>
          <DomainInput
            size="compact"
            btnLabel="Add website →"
            onSuccess={handleSuccess}
          />
        </ModalBody>
        <ModalFooter>
          <button
            onClick={onClose}
            className="text-[13px] text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Cancel
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
