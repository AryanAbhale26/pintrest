import React from "react";
import "./galleryItem.css";
import { Link } from "react-router";
import Image from "../Image/Image";

const GalleryItem = ({ item }) => {
  const rowSpan = Math.ceil(item.height / 100);
  const optimizedHeight = (372 * item.height) / item.width;

  return (
    <div className="galleryItem" style={{ gridRowEnd: `span ${rowSpan}` }}>
      <Image src={item.media} alt="" w={372} h={optimizedHeight} />
      <Link to={`/pin/${item._id}`} className="overlay"></Link>
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <img src="/general/share.svg" alt="" />
        </button>
        <button>
          <img src="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
