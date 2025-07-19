import { IKImage } from "imagekitio-react";
import React from "react";

const Image = ({ src, path, alt, classname, w, h }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IMAGEKIT_ENDPOINT}
      src={src}
      path={path}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
      loading="lazy"
      alt={alt}
      className={classname}
      lqip={{ active: true, quality: 20 }}
    />
  );
};

export default Image;
