export default function filterSrc (obj, searchTerm) {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj).toLowerCase().includes(searchTerm.toLowerCase())
      ? obj
      : undefined
  }

  if (Array.isArray(obj)) {
    const filteredArray = obj
      .map(item => filterSrc(item, searchTerm))
      .filter(
        item =>
          item !== undefined &&
          (typeof item !== 'object' || Array.isArray(item)
            ? true
            : Object.keys(item).length > 0)
      )
    return filteredArray.length > 0 ? filteredArray : undefined
  }

  const filteredObject = {}
  let hasMatch = false

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const originalValue = obj[key]

      if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
        // Key match: include the entire original value (subtree)
        filteredObject[key] = originalValue
        hasMatch = true
      } else {
        const value = obj[key]
        if (typeof value === 'object' && value !== null) {
          const nestedFiltered = filterSrc(value, searchTerm)
          if (
            nestedFiltered !== undefined &&
            (typeof nestedFiltered !== 'object' || Array.isArray(nestedFiltered)
              ? true
              : Object.keys(nestedFiltered).length > 0)
          ) {
            filteredObject[key] = nestedFiltered
            hasMatch = true
          }
        } else if (
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          // Primitive value match
          filteredObject[key] = value
          hasMatch = true
        }
      }
    }
  }
  return hasMatch ? filteredObject : undefined
}
