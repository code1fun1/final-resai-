import React, { memo, useState, useCallback } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useStyles } from './SuggestionCardStyles';
import { useTranslation } from 'react-i18next';
import { CARD_VARIANT, LOCALE_PAGE } from '~/shared/constants/constants';

interface SuggestionProps {
  cardTitle: string;
  cardContent: string;
  variant?: CARD_VARIANT;
  buttonName?: string;
  onClick: (value: string) => void;
  disabled: boolean;
}

const MAX_CONTENT_LENGTH: number = 250;

const SuggestionCard: React.FC<SuggestionProps> = memo(
  ({ cardTitle, cardContent, variant, buttonName, onClick, disabled }) => {
    const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
    const styles = useStyles();
    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleExpanded = useCallback(() => {
      setExpanded((prevExpanded) => !prevExpanded);
    }, []);

    const handleClick = useCallback(() => {
      onClick(cardContent);
    }, [cardContent, onClick]);
    return (
      <Card variant={variant} className={styles.cardWrapper}>
        <Box component={CardContent} p={0}>
          <Typography variant="body2" className={styles.cardTitle}>
            {cardTitle}
          </Typography>
          <Typography className={styles.cardContent}>
            {expanded || cardContent.length <= MAX_CONTENT_LENGTH
              ? cardContent
              : `${cardContent.substring(0, MAX_CONTENT_LENGTH)}...`}
          </Typography>
          {cardContent.length > MAX_CONTENT_LENGTH && (
            <Typography
              className={`${styles.readMore} ${styles.cardContent}`}
              onClick={toggleExpanded}
            >
              {expanded ? i18n('readLess') : i18n('readMore')}
            </Typography>
          )}
        </Box>

        <CardActions className={styles.cardAction}>
          <Button
            className={styles.addBtn}
            onClick={handleClick}
            startIcon={<AddRoundedIcon />}
            disabled={disabled} // Use disabled as a boolean prop
          >
            {buttonName}
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export default SuggestionCard;
