import React from 'react'

const Loader = ()=> {
    return (
        <div className="loader-section">
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
}

export { Loader as default };