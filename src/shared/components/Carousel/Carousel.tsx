import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import { Typography, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import { useStyles } from './CarouselStyle';

export interface CarouselCard {
  title: string;
  description: string;
}

interface CarouselCardProps {
  carouselCard: CarouselCard[];
}

const Carousel: React.FC<CarouselCardProps> = ({ carouselCard }) => {
  const styles = useStyles();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Box width="100%" height="100%">
      <Slider {...sliderSettings} className={styles.sliderWrapper}>
        {carouselCard.map((card, index) => (
          <Box key={index} className={styles.sliderContentWrapper}>
            <Typography
              variant="h5"
              className={styles.subTitle}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              {card?.description}
            </Typography>
            <Typography
              variant="h1"
              className={styles.title}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              {card?.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
