import { useState, useEffect } from 'react';
import { TestimonialCard } from './TestimonialCard';

interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId?: string;
  apiKey?: string;
  reviews?: Array<{
    id: number;
    name: string;
    role?: string;
    company?: string;
    rating: number;
    text: string;
    date?: string;
  }>;
}

export const GoogleReviews = ({ placeId, apiKey, reviews }: GoogleReviewsProps) => {
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If reviews are provided directly, use them
    if (reviews && reviews.length > 0) {
      return;
    }

    // If placeId and apiKey are provided, fetch from Google Places API
    if (placeId && apiKey) {
      fetchGoogleReviews(placeId, apiKey);
    }
  }, [placeId, apiKey, reviews]);

  const fetchGoogleReviews = async (placeId: string, apiKey: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://brincesolutions.com/api';
      const response = await fetch(`${apiUrl}/google-reviews/?place_id=${placeId}&api_key=${apiKey}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch reviews');
      }
      const data = await response.json();
      setGoogleReviews(data.reviews || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching Google Reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  // Convert Google Reviews format to testimonials format
  const convertToTestimonials = () => {
    if (reviews && reviews.length > 0) {
      return reviews.map((review, index) => ({
        id: review.id || index + 1,
        name: review.name,
        role: review.role || '',
        company: review.company || '',
        rating: review.rating,
        text: review.text,
      }));
    }

    return googleReviews.map((review, index) => ({
      id: index + 1,
      name: review.author_name,
      role: '',
      company: '',
      rating: review.rating,
      text: review.text,
    }));
  };

  const testimonials = convertToTestimonials();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Error loading reviews: {error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          {...testimonial}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

