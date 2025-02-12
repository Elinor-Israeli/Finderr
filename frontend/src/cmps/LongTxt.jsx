import { useState } from 'react'

export function LongTxt({ txt, length}) {
    const [isShowMore, setShowMore] = useState(false)

    function getTxtToShow(txt, length) {
        return (txt.length < length || isShowMore) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt() {
        setShowMore(prevLongTxtShown => !prevLongTxtShown)
    }

    return <article className="long-txt">
        <p>{getTxtToShow(txt, length)}</p>
        {txt.length > length && <button className='button-longText' onClick={onToggleLongTxt}>{isShowMore ? '-See less' : '+See more'}</button>}
    </article>
}