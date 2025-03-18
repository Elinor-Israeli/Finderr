import { useState } from "react"

interface LoaderProps {
    src: string
    alt: string
}

export function Loader(props: LoaderProps) {

    const [imgError, setImgError] = useState(false)

    return (
        <div className="loader">
            {!imgError ? (
                <img
                    src={props.src}
                    alt={props.alt}
                    onError={() => setImgError(true)}
                />
            ) : (
                <p>{props.alt}</p>
            )}
        </div>
    )
}