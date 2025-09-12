 import { useState, useEffect } from "react";
import API from "../api/axios";
import { FiUpload, FiEdit2, FiTrash2, FiX, FiCheck, FiImage } from "react-icons/fi";

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await API.get("/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    // Clean up preview URLs to avoid memory leaks
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !editId) return alert("Please select an image!");
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    
    try {
      if (editId) {
        // Optimistically update UI
        const updatedImages = images.map((img) =>
          img._id === editId ? { ...img, image: URL.createObjectURL(imageFile) } : img
        );
        setImages(updatedImages);
        
        await API.patch(`/api/gallery/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Optimistically add image with temporary preview
        const tempId = Date.now().toString();
        const newImage = { _id: tempId, image: URL.createObjectURL(imageFile) };
        setImages([newImage, ...images]);
        
        const res = await API.post("/api/gallery/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        // Replace temp image with actual from server
        setImages([res.data, ...images.filter(img => img._id !== tempId)]);
      }
      
      // Reset form
      setImageFile(null);
      setEditId(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading!");
      fetchImages(); // fallback to refresh in case of error
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (img) => {
    setEditId(img._id);
    setImageFile(null);
    setPreviewUrl(img.image);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    
    // Optimistic delete
    const originalImages = [...images];
    setImages(images.filter((img) => img._id !== id));
    
    try {
      await API.delete(`/api/gallery/delete/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete!");
      setImages(originalImages); // revert on error
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Gallery Management</h1>
          <p className="text-gray-600">Upload, edit, and manage your gallery images</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUpload className="mr-2" />
            {editId ? "Update Image" : "Upload New Image"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 rounded-lg shadow-md mb-4"
                  />
                  <p className="text-gray-600">Click or drag a new image to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiImage className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-1">
                    <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isUploading || (!imageFile && !editId)}
                className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  isUploading || (!imageFile && !editId)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg'
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : editId ? (
                  <>
                    <FiCheck className="mr-2" />
                    Update Image
                  </>
                ) : (
                  <>
                    <FiUpload className="mr-2" />
                    Upload Image
                  </>
                )}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Gallery Images</h2>
          <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        </div>

        {images.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiImage className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No images in gallery</h3>
            <p className="text-gray-500 mb-6">Upload your first image to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div 
                key={img._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={img.image}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {editId === img._id && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-70 flex items-center justify-center">
                      <span className="text-white font-medium">Editing</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(img)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <FiEdit2 className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
                    >
                      <FiTrash2 className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;