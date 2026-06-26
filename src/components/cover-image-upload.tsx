'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  value: string | null
  onChange: (url: string | null) => void
}

export default function CoverImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const { url } = await res.json()
    onChange(url)
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">封面图</label>

      {value ? (
        <div className="relative">
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image src={value} alt="封面图" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            移除
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-500 hover:border-gray-400 disabled:opacity-50"
        >
          {uploading ? '上传中…' : '点击上传封面图'}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
