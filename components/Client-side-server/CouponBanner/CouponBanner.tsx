import React from "react";

type Props = {};

const CouponBanner = (props: Props) => {
  return (
    <>
      <div>
        <p className="bg-[#ff9500] text-[10px] sm:text-[8px] lg:text-base md:text-sm flex justify-center py-1 ">
          {" "}
          Discount 20% For New Members, ONLY FOR TODAY !!
        </p>
      </div>
    </>
  );
};

export default CouponBanner;
