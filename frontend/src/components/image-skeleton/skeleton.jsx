import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

const ImageWithSkeleton = ({
  src,
  width = "100%",
  height = "auto",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 rounded-md animate-pulse" />
      )}
      
      {hasError && (
        <div className="relative inset-0 bg-gray-200 rounded-md flex items-center justify-center h-[300px]">
          <div className="text-gray-500">
            <FaImage size={60} />
          </div>
        </div>
      )}
      
      <img
        src={src}
        className={`w-full object-cover transition-opacity duration-300  ${
          isLoading || hasError ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: hasError ? 'none' : 'block', height: '300px' }}
      />
    </div>
  );
};

export default ImageWithSkeleton;