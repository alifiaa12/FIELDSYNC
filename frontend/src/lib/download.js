// Helpers for exporting reports as plain-text files and print windows.

export function downloadTxt(txt, fname) {
  const b = new Blob([txt], { type: 'text/plain;charset=utf-8' })
  const u = URL.createObjectURL(b)
  const a = document.createElement('a')
  a.href = u
  a.download = fname
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(u)
}

// Opens a new window with the given full HTML document and triggers print.
export function printHtml(html) {
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(html)
  w.document.close()
  w.print()
}
