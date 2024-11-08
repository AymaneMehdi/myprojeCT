"use client";

import CartContext from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import BreadCrumbs from "../layouts/BreadCrumbs";

const Shipping = ({ addresses }) => {
  const { cart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState("");

  const setShippingAddress = (address) => {
    setShippingInfo(address._id);
  };

  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/orders/checkout_session`,
        {
          items: cart?.cartItems,
          shippingInfo,
        }
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(error.response);
      toast.error("Error during checkout. Please try again.");
    }
  };

  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
    { name: "Order", url: "" },
  ];

  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">Shipping information</h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address) => (
                    <label
                      key={address._id} // Added key prop
                      className={`flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer ${
                        shippingInfo === address._id ? "border-blue-500" : ""
                      }`}
                      onClick={() => setShippingAddress(address)}
                    >
                      <span>
                        <input
                          id={address._id} // Added id for accessibility
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                          checked={shippingInfo === address._id} // Set checked state
                          readOnly // Make input readOnly to prevent user typing
                        />
                      </span>
                      <p className="ml-2">
                        <span>{address.street}</span>
                        <small className="block text-sm text-gray-400">
                          {address.city}, {address.state}, {address.zipCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNo}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <Link
                  href="/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <button
                    className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </button>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>${cart?.checkoutInfo?.amount}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Est TAX:</span>
                    <span>${cart?.checkoutInfo?.tax}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-gray-900 font-bold">
                      ${cart?.checkoutInfo?.totalAmount}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                {cart?.cartItems?.map((item) => (
                  <figure key={item.product} className="flex items-center mb-4 leading-5"> {/* Added key prop */}
                    <div>
                      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <img
                          width="50"
                          height="50"
                          src={item.image}
                          alt={item.name} // Improved alt text
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption className="ml-3">
                      <p>{item.name.substring(0, 50)}</p>
                      <p className="mt-1 text-gray-400">
                        Total: ${item.quantity * item.price}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
