 import { useState, useEffect } from "react";
import API from "../api/axios";

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchImages = async () => {
    const res = await API.get("/api/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !editId) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      if (editId) {
        await API.patch(`/api/gallery/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/api/gallery/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setImageFile(null);
      setEditId(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading!");
    }
  };

  const handleEdit = (img) => {
    setEditId(img._id);
    // Optional: you can show current image preview when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await API.delete(`/api/gallery/delete/${id}`);
    fetchImages();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded mb-6 flex flex-col gap-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="bg-white shadow p-2 rounded">
            <img
              src={img.image}
              alt="Gallery"
              className="w-full h-32 object-cover rounded mb-2"
            />
            <div className="flex justify-between">
              <button
                className="text-blue-600"
                onClick={() => handleEdit(img)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(img._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
