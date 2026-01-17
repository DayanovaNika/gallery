export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}
export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}
export interface Social {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
}
export interface User {
  accepted_tos: boolean;
  bio: string | null;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string | null;
  last_name: string | null;
  links: UserLinks;
  location: string | null;
  name: string;
  portfolio_url: string | null;
  profile_image: ProfileImage;
  social: Social;
  total_collections: number;
  total_illustrations: number;
  total_likes: number;
  total_photos: number;
  total_promoted_illustrations: number;
  total_promoted_photos: number;
  twitter_username: string | null;
  updated_at: string;
  username: string;
}
export interface ImageInfo {
  alternative_slugs: Record<string, string>;
  links: Record<string, string>;
  user: User;
  alt_description: string;
  asset_type: string;
  blur_hash: string;
  breadcrumbs: string[];
  color: string;
  created_at: string;
  current_user_collections: string[];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  promoted_at: string;
  slug: string;
  sponsorship: null;
  topic_submissions: Record<string, string>;
  updated_at: string;
  urls: Record<string, string>;
  width: number;
}

export interface DataTypes {
  total: number;
  total_pages: number;
  results: ImageInfo[];
}
