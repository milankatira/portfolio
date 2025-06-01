import React from 'react';
import { Star } from 'lucide-react';

const RatingStatisticsCard = () => {
  // Dummy rating data
  const ratingCounts = {
    5: 120, // 5-star ratings
    4: 80, // 4-star ratings
    3: 50, // 3-star ratings
    2: 30, // 2-star ratings
    1: 20, // 1-star ratings
  };

  // Total Ratings
  const totalRatings = Object.values(ratingCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  // Calculate Average Rating
  const averageRating =
    totalRatings > 0
      ? (
          Object.entries(ratingCounts).reduce(
            (acc, [star, count]) => acc + parseInt(star) * count,
            0
          ) / totalRatings
        ).toFixed(1)
      : '0.0';

  return (
    <div className='p-4 w-full border rounded-lg shadow-md '>
      <div className='p-4 border-b'>
        <div className='flex items-center gap-2'>
          <div className='p-2 bg-yellow-500/10 rounded-lg'>
            <Star className='h-5 w-5 text-yellow-500' />
          </div>
          <h2 className='text-lg font-semibold'>Rating Statistics</h2>
        </div>
        <p className='text-gray-500 text-sm'>
          Overall rating distribution and averages
        </p>
      </div>

      <div className='p-6 space-y-6'>
        {/* Average Rating Display */}
        <div className='flex flex-col items-center p-6 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl border'>
          <div className='text-4xl font-bold mb-2'>{averageRating}</div>
          <div className='text-sm text-gray-500'>
            Based on {totalRatings} ratings
          </div>
        </div>

        {/* Rating Bars */}
        <div className='space-y-3'>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star as keyof typeof ratingCounts] || 0;
            const percentage = totalRatings
              ? ((count / totalRatings) * 100).toFixed(1)
              : '0.0';

            return (
              <div key={star} className='group flex items-center gap-3'>
                <div className='flex items-center gap-1 w-12'>
                  <span className='font-medium'>{star}</span>
                  <Star className='h-4 w-4 text-yellow-500' />
                </div>
                <div className='relative flex-1 h-2 bg-yellow-500/10 rounded-full overflow-hidden'>
                  <div
                    className='absolute inset-y-0 left-0 bg-yellow-500 transition-all duration-500 ease-out group-hover:opacity-80'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className='w-20 text-sm text-right'>
                  <span className='font-medium'>{percentage}%</span>
                  <span className='text-gray-500 ml-1'>({count})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingStatisticsCard;
