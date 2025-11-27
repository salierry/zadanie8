import React from 'react';
import { Card } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './Gallery.css';
import image4 from '../../img/gallery/image4.jpg';
import image2 from '../../img/gallery/image2.jpg';
import image3 from '../../img/gallery/image3.jpg';
import image7 from '../../img/gallery/image7.jpg';
import image5 from '../../img/gallery/image5.jpg';
import image6 from '../../img/gallery/image6.jpg';
import image1 from '../../img/gallery/image1.jpg';
import image8 from '../../img/gallery/image8.jpg';
import image9 from '../../img/gallery/image9.jpg';

const Gallery = () => {
  const images = [
    { id: 4, src: image4, alt: 'Изображение 4' },
    { id: 2, src: image2, alt: 'Изображение 2' },
    { id: 3, src: image3, alt: 'Изображение 3' },
    { id: 7, src: image7, alt: 'Изображение 7' },
    { id: 5, src: image5, alt: 'Изображение 5' },
    { id: 6, src: image6, alt: 'Изображение 6' },
    { id: 1, src: image1, alt: 'Изображение 1' },
    { id: 8, src: image8, alt: 'Изображение 8' },
    { id: 9, src: image9, alt: 'Изображение 9' }
  ];
  

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Определяем количество отображаемых изображений в зависимости от ширины экрана
  const getItemsPerPage = () => {
    if (windowWidth <= 480) {
      return 1; // На мобильных - 1 изображение
    } else if (windowWidth <= 768) {
      return 2; // На планшетах - 2 изображения
    } else {
      return 3; // На десктопе - 3 изображения
    }
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Обработчик изменения размера окна
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex);
  };

  const visibleImages = images.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="gallery-section">
      <div className="section-content">
        <h2>Галерея изображений</h2>
        
        <Card className="gallery-card">
          <div className="gallery-container">
            <div className="gallery-slider">
              <button className="nav-button prev-button" onClick={prevSlide}>
                <ArrowLeftOutlined />
              </button>
              
              <div className="images-container">
                {visibleImages.map((image) => (
                  <div key={image.id} className="image-item">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="gallery-image"
                    />
                  </div>
                ))}
              </div>
              
              <button className="nav-button next-button" onClick={nextSlide}>
                <ArrowRightOutlined />
              </button>
            </div>
            
            <div className="gallery-pager">
              <span className="current-page">{currentIndex + 1}</span>
              {' / '}
              <span className="total-pages">{totalPages}</span>
            </div>
            
            <div className="pager-dots">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToPage(index)}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Gallery;