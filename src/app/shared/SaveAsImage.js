import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function SaveAsImage({ componentRef }) {
    const saveAsImage = () => {
        const now = new Date();
        const dateString = now.toISOString().replace(/:/g, '-').replace(/\.\d{3}/, '').replace('T', '-');
        html2canvas(componentRef.current).then(canvas => {
            const imageData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imageData;
            downloadLink.download = `image-${dateString}.png`;
            downloadLink.click();
        });
    };

    return (
        <div>
            {/* <nav aria-label="breadcrumb" className='bg-black'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item text-orange-600"><a href="#">OpenMRS</a></li>
                    <li className="breadcrumb-item text-orange-600"><a href="#">Home</a></li>
                    <li className="breadcrumb-item text-orange-600 text-info active" aria-current="page">HTS</li>
                    <li style={{ marginLeft: 'auto' }}><a href="#" onClick={saveAsImage} className='btn btn-sm btn-info'>Save Image</a></li>
                </ol>
            </nav> */}
        </div>
    );
}

export default SaveAsImage;
