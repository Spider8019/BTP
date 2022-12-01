import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';

const DefaultLoader = () => {
    return (
        <div
            className="mx-auto grid place-items-center"
        >
            <ProgressSpinner
                style={{ width: '40px', height: '40px' }}
                strokeWidth="4"
                fill="var(--surface-ground)"
            />
        </div>)
}

export default DefaultLoader