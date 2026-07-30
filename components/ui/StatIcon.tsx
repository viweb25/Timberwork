import React from "react";

export function StatIcon({ index }: { index: number }) {
  const iconUrls = [
    "https://res.cloudinary.com/defqgygsf/image/upload/v1785308152/img1-removebg-preview_bwrxph.png",
    "https://res.cloudinary.com/defqgygsf/image/upload/v1785308151/img2-removebg-preview_vwmbre.png",
    "https://res.cloudinary.com/defqgygsf/image/upload/v1785308480/img4-removebg-preview_hgg8kl.png",
    "https://res.cloudinary.com/defqgygsf/image/upload/v1785308559/img3-removebg-preview_qbe4kb.png"
  ];

  // Fallback to the first image URL if a specific index URL is missing
  const src = iconUrls[index] ?? iconUrls[0];

  return (
    <img
      src={src}
      alt={`Stat icon ${index + 1}`}
      className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
    />
  );
}
