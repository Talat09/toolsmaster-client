//protected hove

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import axiosPrivate from "../../api/axiosPrivate";
import { PartsIdContext } from "../../App";
// import auth from "../../Firebase/firebase.init";
import SetTitle from "../Shared/SetTitle/SetTitle";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import toast from "react-hot-toast";

// user name,email address,address,phone
//quantity field-->by default minimum quantity dekhabe --> eikhane quantity increase/decrease thakbe
//increase er khetre available quantity er cheye baraite parbo nah
//decrease er khetre minimum quantity er cheye komaite parbo nah
const Purchases = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  console.log(id);
  const { setPartsId } = useContext(PartsIdContext);
  setPartsId(id);
  const [parts, setParts] = useState({});
  const { name, available, image, minOrder, price, _id } = parts;
  const [quantity, setQuantity] = useState(0);
  const [err, SetErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [runEffect, setRunEffect] = useState(false);

  useEffect(() => {
    const getParts = async () => {
      const { data } = await axios.get(
        `https://tools-master-server.vercel.app/parts/${id}`
      );
      if (data) {
        console.log(data);
        setParts(data);
        setQuantity(data.minOrder);
      }
    };
    getParts();
  }, [id, runEffect]);

  const orderQuantityHandle = (e) => {
    setQuantity(e.target.value);
    SetErr("");
    if (e.target.value < minOrder) {
      SetErr("Quantity can't be less than minimum!");
    } else if (e.target.value > available) {
      SetErr("Sorry! Insufficient Items");
    }
  };

  const onSubmit = async (data) => {
    const order = {
      name: data.name,
      email: data.email,
      quantity: parseInt(quantity),
      amount: quantity * price,
      partsName: name,
      partsId: _id,
      paid: false,
    };
    console.log("order from purchase page", order);

    const { data: result } = await axiosPrivate.post(
      "https://tools-master-server.vercel.app/order",
      order
    );
    if (result.success) {
      toast.success(result.message, { toastId: "orderConfirmed" });
      setRunEffect(!runEffect);
      reset();
    }
  };
  // console.log(parts);
  return (
    <div className="min-h-screen bg-base-200 pb-20 lg:pb-0 text-accent">
      <SetTitle title={"Purchase"} />
      <h2 className="text-3xl font-semibold text-center pt-8 md:pt-8 md:pb-10 uppercase text-black">
        Your selected item!
      </h2>
      <div class="flex flex-col md:flex-row justify-center items-center gap-10 px-6">
        <div class="card w-full max-w-sm lg:max-w-sm bg-base-100 shadow-lg mt-8 md:mt-0">
          <figure>
            <img src={image} className="h-60" loading="lazy" alt={name} />
          </figure>
          <div class="card-body pt-0">
            <h2 class="card-title font-bold">{name}</h2>
            <small className="font-bold">
              Minimum order:{" "}
              <span className="text-primary font-bold">{minOrder} Piece</span>
            </small>
            <small className="font-bold">
              Available:{" "}
              <span className="text-primary font-bold">{available} Piece</span>
            </small>
            <small className="font-bold">
              Price:
              <span className="text-primary font-bold ms-2">
                ${price} Per Unit
              </span>
            </small>
          </div>
        </div>
        <div class="card w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} class="card-body">
            <div className="lg:flex lg:gap-6">
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    readOnly
                    value={user?.displayName}
                    class="input input-bordered bg-base-200"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    readOnly
                    value={user?.email}
                    class="input input-bordered bg-base-200"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Quantity</span>
                  </label>
                  <input
                    {...register("quantity")}
                    value={quantity}
                    onChange={(e) => orderQuantityHandle(e)}
                    type="text"
                    placeholder="Quantity"
                    class="input input-bordered"
                  />
                  <p className="text-primary">
                    <small>{err}</small>
                  </p>
                </div>
              </div>
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Address</span>
                  </label>
                  <input
                    {...register("address", {
                      required: { value: true, message: "Address is required" },
                    })}
                    type="text"
                    placeholder="Address"
                    class="input input-bordered"
                  />
                  <p className="text-primary">
                    <small>
                      {errors?.address?.type === "required" &&
                        errors.address.message}
                    </small>
                  </p>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Phone</span>
                  </label>
                  <input
                    {...register("phone", {
                      required: { value: true, message: "Phone is required" },
                    })}
                    type="text"
                    placeholder="Phone"
                    class="input input-bordered"
                  />
                  <p className="text-primary">
                    <small>
                      {errors?.phone?.type === "required" &&
                        errors.phone.message}
                    </small>
                  </p>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Amount to pay</span>
                  </label>
                  <input
                    {...register("amount")}
                    value={quantity * price}
                    type="text"
                    placeholder="Quantity"
                    class="input input-bordered"
                  />
                </div>
              </div>
            </div>
            <div class="form-control">
              <button
                disabled={quantity < minOrder || quantity > available}
                className="btn btn-primary text-white btn-md mt-4 "
                type="submit"
              >
                Place Order{" "}
                <FontAwesomeIcon
                  className="ml-1 text-white"
                  icon={faShoppingCart}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
