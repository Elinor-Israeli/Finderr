import { useState } from "react"

export function Loader({src, alt}){

    const [imgError, setImgError] = useState(false)
    
    return (
        <div className="loader">
            {!imgError ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setImgError(true)} 
                />
            ) : (
                <p>{alt}</p> 
            )}
        </div>
    )
}