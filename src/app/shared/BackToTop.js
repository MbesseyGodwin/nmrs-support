import React, { useState, useEffect } from 'react';

const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset;

            if (scrollPosition > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showButton && (
                <button
                    type="button"
                    onClick={handleBackToTop}
                    className="btn btn-warning px-4"
                    style={{ whiteSpace: 'nowrap' }}>
                    Back To Top
                    <i className="ml-2 mdi mdi-arrow-up"></i>
                </button>

            )}
        </>
    );
};

export default BackToTop;
