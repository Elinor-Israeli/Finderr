import { useState } from 'react'

import { uploadService } from '../services/upload.service' 

export function ImgUploader({ onUploaded = null }) {
  const [_, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [__, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }


  return <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
}