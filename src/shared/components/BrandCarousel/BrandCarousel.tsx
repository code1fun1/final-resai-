import { Box } from '@mui/material';
import Image from 'next/image';
import Carousel from '~/shared/components/Carousel';
import { CarouselCard } from '../Carousel/Carousel';
import { useStyles } from './BrandCarouselStyles';

interface BrandCarouselProps {
  carouselCardData?: CarouselCard[];
  carousel?: boolean;
}

const BrandCarousel = (props: BrandCarouselProps) => {
  const { carouselCardData, carousel } = props;
  const styles = useStyles();
  return (
    <>
      {carousel ? (
        <Box display="flex" flexDirection={'column'} gap={{ xs: 3, sm: 5 }} alignItems="center">
          <Box component="header" className={styles.logoHeader}>
            <Image src="/image/ResAi-gold-Logo.png" height={40} width={130} alt="ResAI Logo" />
          </Box>
          <Box py={0} px={{ xs: 3, md: '90px' }}>
            <Carousel carouselCard={carouselCardData!} />
          </Box>
        </Box>
      ) : (
        <Image src="/image/ResAi-gold-Logo.png" height={35} width={100} alt="ResAI Logo" />
      )}
    </>
  );
};
export default BrandCarousel;
