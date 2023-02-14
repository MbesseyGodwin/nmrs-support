import {React, useEffect} from 'react';
// import ImageSlider, { Slide as Slider } from "react-auto-image-slider";
// import img1 from "./assets/img/portfolio-1.jpg";
// import img2 from "./assets/img/portfolio-2.jpg";
// import img3 from "./assets/img/portfolio-3.jpg";
// import img4 from "./assets/img/portfolio-4.jpg";

function RedirectExample() {
    useEffect(() => {
      const timeout = setTimeout(() => {
        // 👇️ redirects to an external URL
        window.location.replace('./dashboard');
      }, 10000);
      return () => clearTimeout(timeout);
    }, []);
  }

function Home() {
    return (
        <div className=''>
            <p>home page which will redirect to dashboard</p>
            <RedirectExample />
        </div>
    );
}

export default Home;