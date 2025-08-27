import { ref, watch, onScopeDispose } from 'vue'

export const useLocalStorage = (key, initialValue) => {
  const val = ref(initialValue)

  // retrieve value if it exists in the localStorage
  const storedValue = localStorage.getItem(key)
  if (storedValue && storedValue.length > 0) {
    val.value = JSON.parse(storedValue)
  }

  const handleStorageChange = (event) => {
    if (event.key === key) {
      val.value = JSON.parse(event.newValue)
    }
  }

  window.addEventListener('storage', handleStorageChange)

  onScopeDispose(() => {
    window.removeEventListener('storage', handleStorageChange)
  })

  // watch for value change
  watch(
    val,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return val
}
