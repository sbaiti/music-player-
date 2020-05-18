import React, { useEffect, useState } from 'react'

const SpinnerDot = () => {
    const [xScroll, setXScroll] = useState(0)
    const [yScroll, setYScroll] = useState(0)

    const onScroll = () => {
        const doc = document.documentElement
        setXScroll(
            (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        )
        setYScroll((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0))
    }

    useEffect(() => {
        window.addEventListener('scroll', e => onScroll(e))
        return () => {
            window.removeEventListener('scroll', () =>
                console.log('removeEventscroll')
            )
        }
    }, [])

    return (
        <div
            className="spinner"
            style={{
                marginLeft: xScroll,
                marginTop: yScroll,
                display: 'block',
            }}
        >
            <div className='dot1' />
            <div className='dot2' />
        </div>
    )
}

export default SpinnerDot
