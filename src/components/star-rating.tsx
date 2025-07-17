'use client';

import { Star, StarHalf, StarOff } from "lucide-react";

interface StarRatingProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export const StarRating = ({ score, maxScore = 10, className = "h-5 w-5 text-yellow-400" }: StarRatingProps) => {
  const fullStars = Math.floor(score / (maxScore / 5));
  const halfStar = (score / (maxScore / 5)) % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  if (score === null || isNaN(score)) {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => <StarOff key={i} className={className} />)}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className={className} />
      ))}
      {halfStar === 1 && <StarHalf key="half" fill="currentColor" className={className} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={className} />
      ))}
    </div>
  );
};
