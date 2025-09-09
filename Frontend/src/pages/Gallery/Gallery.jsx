import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import BreadcrumbComponent from '../../components/Breadcums';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import BreadCrumbsComponent from '../../components/Breadcums';

const Gallery = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // const dispatch = useDispatch()

  // const {galleryData, error, status} = useSelector((state)=>state.data)

  // useEffect(()=>{
  //   dispatch(fetchGalleryData())
  // },[])
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gallery = [
    { image: 'https://picsum.photos/1920/1080?random=1' },
    { image: 'https://picsum.photos/1920/1080?random=2' },
    { image: 'https://picsum.photos/1920/1080?random=3' },
    { image: 'https://picsum.photos/1920/1080?random=4' },
    { image: 'https://picsum.photos/1920/1080?random=5' },
    { image: 'https://picsum.photos/1920/1080?random=6' },
  ];


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    arrows: false,
  };

      const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'About Us' },
       
    ];

  return (
    <section>
      <BreadCrumbsComponent headText={"Gallery"} items={breadcrumbItems}/>
      {/* <BreadcrumbComponent headerText="Gallery" items={breadcrumbItems} /> */}
    <div className="min-h-screen bg-gray-100 lg:p-8 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden  shadow-lg bg-white group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => openModal(index)}
            >
              <img 
                src={image} 
                alt={image.alt || 'Gallery Image'} 
                className="w-full lg:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30  flex items-center justify-center transition-all duration-300">
                <div className="text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 text-center">
                  <span className="text-xl font-bold"><ZoomIn size={50} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-5xl w-full max-h-screen p-4 flex items-center justify-center">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
              >
                <X size={24} />
              </button>

              {/* Previous Button */}
              <button 
                onClick={goToPrevious}
                className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Next Button */}
              <button 
                onClick={goToNext}
                className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image */}
              <div className="w-full flex items-center justify-center">
                <img 
                  src={gallery[currentImageIndex].image || gallery[currentImageIndex].image} 
                  alt={gallery[currentImageIndex].alt || 'Gallery Imnage'} 
                  className="max-h-screen max-w-full object-contain rounded-md  shadow-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default Gallery;
