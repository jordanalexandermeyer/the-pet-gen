import { Dispatch, SetStateAction } from 'react'

const Modal = ({
  setShowModal,
  showEscape = true,
  allowClickOutsideToDismiss = true,
  children,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
  showEscape?: boolean
  allowClickOutsideToDismiss?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto text-gray-800">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4">
        <div
          onClick={() => {
            if (allowClickOutsideToDismiss) {
              setShowModal(false)
            }
          }}
          className="fixed inset-0 backdrop-blur bg-black bg-opacity-50"
        ></div>
        <div className="relative">
          <div className="flex flex-col p-2 w-full overflow-hidden text-left align-top transition-all bg-white rounded-md shadow-xl">
            {showEscape && (
              <button
                className="p-2 self-end hover:bg-gray-100 rounded-md"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
