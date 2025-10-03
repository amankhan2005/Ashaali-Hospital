 


 import { useEffect, useState } from 'react';
import BreadCrumb from '../../components/Breadcrumb'; // updated import
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch all gallery images from backend
  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Modal controls
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1);
  };
  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === gallery.length - 1 ? 0 : prev + 1);
  };

   const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Gallery' },
  ];

  return (
    <section>
      <BreadCrumb items={breadcrumbItems} title="Gallery" />

      <div className="min-h-screen bg-gray-100 lg:p-8 p-4">
        <div className="container mx-auto">

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <div
                key={image._id}
                className="relative overflow-hidden shadow-lg bg-white group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => openModal(index)}
              >
                <img
                  src={image.image}
                  alt={image.alt || 'Gallery Image'}
                  className="w-full lg:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" size={50} />
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

                <button
                  onClick={goToPrevious}
                  className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronRight size={32} />
                </button>

                <div className="w-full flex items-center justify-center">
                  <img
                    src={gallery[currentImageIndex].image}
                    alt={gallery[currentImageIndex].alt || 'Gallery Image'}
                    className="max-h-screen max-w-full object-contain rounded-md shadow-2xl"
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
