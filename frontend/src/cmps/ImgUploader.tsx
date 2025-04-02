import { useState } from 'react'
import { uploadService } from '../services/upload.service' 

interface ImgUploaderProps {
  onUploaded?: (url: string) => void
}

export function ImgUploader({ onUploaded }: ImgUploaderProps) {
  const [, setImgData] = useState<{ imgUrl: string | null; height: number; width: number }>({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [, setIsUploading] = useState(false)

  async function uploadImg(ev: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(true)
    const { url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(url)
  }
  return <input style={{ fontFamily :'Macan', fontSize:'12px'}} type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
}