import React, { useEffect, useRef, useState } from "react";

interface DynamicImageProps {
  src: string;
  alt: string;
}

function DynamicImage({ src, alt }: DynamicImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (image) {
      image.onload = () => {
        // Get the original width and height of the image
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        // Update state with the original dimensions
        setOriginalWidth(width);
        setOriginalHeight(height);
      };
    }
  }, [src]);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      width={originalWidth ?? 0}
      height={originalHeight ?? 0}
    />
  );
}

export default DynamicImage;
