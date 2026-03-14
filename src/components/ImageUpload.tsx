import React, { useState } from "react";
import { Image } from "@/server/entity"; // Đường dẫn đến file chứa interface
import { MdDeleteForever } from "react-icons/md";
import { uploadImage } from "@/server/api";
import { toast } from "react-toastify";

interface ImageUploadProps {
  onImagesSelected: (images: Image[]) => void; // Hàm callback để truyền danh sách hình ảnh
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesSelected }) => {

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages((prev) => [...prev, ...newImages]);

      const newImagePreviews = newImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    }
  };

  const handleImageRemove = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

    setSelectedImages(newSelectedImages);
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      // Thêm từng hình ảnh vào FormData
      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => {
          formData.append("images", file); // 'images' là tên trường sẽ dùng trên backend
        });
        const response = await uploadImage(formData);
        // Tạo danh sách hình ảnh theo kiểu Image
        if (response.status !== 201) {
          toast.error("Có lỗi xảy ra vui lòng liên hệ quản trị viên !");
          return;
        }
        const images: Image[] = response.data.content.map((image: Image) => ({
          id: image.id, // Tạo ID ngẫu nhiên
          name: image.name,
          image: image.image,
        }));
        // // Gọi hàm callback để trả danh sách hình ảnh cho component cha
        onImagesSelected(images);
      } else toast.error("Vui lòng chọn ảnh");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Thêm Hình Ảnh Mới</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        {imagePreviews.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-1 right-1 bg-white text-black rounded-full p-1 hover:bg-red-600"
                >
                  <MdDeleteForever />
                </button>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-auto rounded"
                />
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Đang Tải..." : "Tải Lên Hình Ảnh"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
