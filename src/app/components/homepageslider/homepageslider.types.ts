export interface SlideData {
  id: string | number;
  image: string;
  mobileimage: string;
  alt: string;
}

export interface HomepageSliderProps {
  slides?: SlideData[];
  autoplayDelay?: number;
  speed?: number;
}