import React from "react";

function Story({ image, firstname }) {
  return (
    <div className="flex flex-col  items-center ">
      <img
        src={image}
        alt={firstname}
        className="h-14 w-14 border-red-500  border-2 object-contain rounded-full cursor-pointer "
      />
      <p className="text-xs text-center truncate w-14">{firstname}</p>
    </div>
  );
}

export default Story;
