import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const goTo = useNavigate();
  return (
    <CCarousel
      indicators
      controls
      style={{ width: '50%', height: '65vh', margin: 'auto' }}
      className="mt-5"
    >
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src="https://cdn-icons-png.flaticon.com/512/78/78948.png"
          alt="slide 1"
          style={{ height: '65vh' }}
          onClick={(e) => {
            goTo('/panelAdmin');
          }}
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src="https://cdn-icons-png.flaticon.com/512/8347/8347452.png"
          alt="slide 2"
          style={{ height: '65vh' }}
          onClick={(e) => {
            goTo('/loginCompany');
          }}
        />
      </CCarouselItem>
    </CCarousel>
  );
};
