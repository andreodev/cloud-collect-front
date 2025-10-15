import toast from "react-hot-toast"

export const useFormToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
    })
  }

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    })
  }

  const showErrors = (errors: { message: string }[]) => {
    errors.forEach((err) => {
      showError(err.message)
    })
  }

  return { showSuccess, showError, showErrors }
}
