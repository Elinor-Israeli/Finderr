export const uploadService = {
	uploadImg
}

interface UploadResponse {
    url: string;
    public_id: string;
	height:number
	width:number
}



function uploadImg(ev: React.ChangeEvent<HTMLInputElement>): Promise<UploadResponse>{
	const CLOUD_NAME = "dmw7dxabv"
	const UPLOAD_PRESET = "finder-images"
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const formData = new FormData()
	formData.append('upload_preset', UPLOAD_PRESET)
	formData.append('file', ev.target.files[0])

	return fetch(UPLOAD_URL, {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			return res
		})
		.catch(err => console.error(err))
}
