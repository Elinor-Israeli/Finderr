import { useState } from 'react'
import { uploadService } from '../services/upload.service' 

export function ImgUploader({ onUploaded = null }) {
  const [, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }
  return <input style={{ fontFamily :'Macan', fontSize:'12px'}} type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
}