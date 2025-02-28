import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";
import { fetchData } from "./Action";

const ordersURL = "http://localhost:8002";
export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    paymentMethod: "cod", // Default to Cash on Delivery
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
  }, [dispatch]);

  const handleOrder = () => {
    if (!state.address || !state.phone) {
      setState({ ...state, error: "Address and phone are required." });
      return;
    }

    const orderData = {
      address: state.address,
      phone: state.phone,
      paymentMethod: state.paymentMethod,
      totalAmount: totalCost(),
      products: data.cartProduct,
    };

    console.log("Order Placed:", orderData);

    alert("Order placed successfully with Cash on Delivery!");

    history.push("/order-success");
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>

        <div className="flex flex-col md:flex-row md:space-x-2">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>

          <div className="w-full md:w-1/2 order-first md:order-last">
            <div className="p-4 md:p-8">
              {state.error && (
                <div className="bg-red-200 py-2 px-4 rounded mb-4">
                  {state.error}
                </div>
              )}

              <div className="flex flex-col py-2">
                <label htmlFor="address" className="pb-2">
                  Delivery Address
                </label>
                <input
                  value={state.address}
                  onChange={(e) =>
                    setState({ ...state, address: e.target.value, error: false })
                  }
                  type="text"
                  id="address"
                  className="border px-4 py-2"
                  placeholder="Enter your address"
                />
              </div>

              <div className="flex flex-col py-2 mb-4">
                <label htmlFor="phone" className="pb-2">Phone</label>
                <input
                  value={state.phone}
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value, error: false })
                  }
                  type="number"
                  id="phone"
                  className="border px-4 py-2"
                  placeholder="Enter your phone number"
                />
              </div>

              <div
                onClick={handleOrder}
                className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                style={{ background: "#303031" }}
              >
                Place Order (Cash on Delivery)
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
            >
              <div className="md:flex md:items-center md:space-x-4">
                <img
                  onClick={() => history.push(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover"
                  src={`${ordersURL}/uploads/products/${product.pImages[0]}`}
                  alt={product.pName}
                />

                <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Price: ${product.pPrice}.00
                </div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Quantity: {quantity(product._id)}
                </div>
                <div className="font-semibold text-gray-600 text-sm">
                  Subtotal: ${subTotal(product._id, product.pPrice)}.00
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
