"use client";

import ProductContext from "@/context/ProductContext";
import React, { useContext, useState } from "react";

const NewProduct = () => {
  const { newProduct } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    seller: "",
    price: "",
    stock: "",
    category: "",
    image: ""
  });

  const { name, description, seller, price, stock, category, image } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const categories = ["Shoes"];

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
    };

    console.log("Submitting product:", formattedProduct); // Log the product object
    newProduct(formattedProduct); // Send formatted product data
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "duqax7wj");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/drukcn21i/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setProduct({ ...product, image: data.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <section className="container max-w-3xl p-6 mx-auto">
      <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black mb-8">
        Create New Product
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4 mt-5">
          <label className="block mb-1">Description</label>
          <textarea
            rows="4"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Product description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className="mb-4 mt-5">
          <label htmlFor="image1" className="block text-gray-700 font-medium mb-2">
            Image:
          </label>
          <input
            type="file"
            id="image1"
            name="image"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {image && (
          <div className="mb-4">
            <img src={image} alt="Uploaded Preview" className="w-32 h-32 object-cover" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="0.00"
              name="price"
              value={price}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Category</label>
              <input
              type="text"
              className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              name="category"
              value={category}
              onChange={onChange}
              required
            />
            
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1">Brand</label>
            <input
              type="text"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="Seller or brand"
              name="seller"
              value={seller}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="0"
              name="stock"
              value={stock}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Create Product
        </button>
      </form>
    </section>
  );
};

export default NewProduct;
