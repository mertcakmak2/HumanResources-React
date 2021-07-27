import React from 'react'
import { Carousel } from 'antd'

export default function HomePage() {

    const contentStyle = {
        height: '20em',
        color: '#fff',
        lineHeight: '20em',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <div>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
            </Carousel>
        </div>
    )
}
