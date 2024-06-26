import React from "react";
import axiosPrivate from "../../api/axiosPrivate";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "react-query";
import ReactStars from "react-rating-stars-component";
const LastSixReview = () => {
  const getReviews = async () => {
    const { data } = await axiosPrivate.get(
      "https://tools-master-server.vercel.app/review"
    );
    return data;
  };

  const { data, isLoading } = useQuery("reviews", getReviews);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const lastSixData = [];
  data?.map((item) => lastSixData.unshift(item));
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-6 mb-20 md:mt-14">
      <div className="flex justify-center items-center gap-5 md:gap-10 mt-14">
        <h2 className="text-2xl md:text-3xl text-center uppercase font-semibold text-primary">
          Customers Review
        </h2>
      </div>
      <p className="text-center text-gray-400">What our customers say</p>
      <hr className="border-primary w-20 h-[1px] mx-auto" />
      <hr className="border-primary w-16 h-[1px] mx-auto mt-1" />
      <hr className="border-primary w-12 h-[1px] mx-auto mt-1" />
      <div className="grid lg:grid-cols-3 gap-x-10 gap-y-5 mt-8">
        {lastSixData.slice(0, 6).map((review, index) => (
          <div className="rounded-2xl border-2 border-primary flex items-center gap-5 p-5">
            <div class="avatar">
              <div class="w-14 rounded-full border-2 border-primary">
                <img
                  src={`https://picsum.photos/200/300?random=${index}`}
                  loading="lazy"
                  alt="user"
                />
              </div>
            </div>
            <div>
              <p>{review.description}</p>
              <p>
                <ReactStars count={review.rating} size={24} color="#ffd700" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSixReview;
