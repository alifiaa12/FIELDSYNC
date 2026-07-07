// Reads an image file and returns a resized (max 600px) JPEG data URL.
export function compressImage(file, max = 600, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        let w = img.width
        let h = img.height
        if (w > h) {
          if (w > max) { h *= max / w; w = max }
        } else {
          if (h > max) { w *= max / h; h = max }
        }
        const cv = document.createElement('canvas')
        cv.width = w
        cv.height = h
        cv.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(cv.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
