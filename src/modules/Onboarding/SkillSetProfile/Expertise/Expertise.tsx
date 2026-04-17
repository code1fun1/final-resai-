import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import SkillsTab from '~/shared/components/SkillsTab/SkillsTab';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { DataItem, ProfileData } from '../../Utils/OnboardingUtils';
import { ExpertiseTab } from '../Utils/SkillSetProfileUtils';
import { useStyles } from './ExpertiseStyles';

interface ExpertiseProps {
  setLoadWithoutMount: (value: boolean) => void;
  userProfileData: ProfileData;
  onAddItem: (objKey: string, item: { name: string; id: string }) => void;
  onRemoveItem: (objKey: string, item: { name: string; id: string }) => void;
}

const Expertise: React.FC<ExpertiseProps> = ({ userProfileData, onAddItem, onRemoveItem }) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);

  const tabs: ExpertiseTab[] = [
    {
      id: 1,
      grid: { xs: 12, md: 4, className: '' },
      box: { px: { xs: 0, md: 2 }, py: { xs: 1, md: 2 } },
      data: {
        suggestionsKey: 'userStrengthsGaps',
        tabName: i18n('yourStrengths'),
        placeholder: i18n('enterOwn'),
        selectionKey: 'userStrengths',
        suggestTitle: i18n('suggestedStrengths')
      }
    },
    {
      id: 2,
      grid: { xs: 12, md: 4, className: styles.gridBorder },
      box: { px: { xs: 0, md: 2 }, py: { xs: 2, md: 2 } },
      data: {
        suggestionsKey: 'userSkillsGaps',
        tabName: i18n('yourSkills'),
        placeholder: i18n('enterOwn'),
        selectionKey: 'userSkills',
        suggestTitle: i18n('suggestedSkills')
      }
    },
    {
      id: 3,
      grid: { xs: 12, md: 4, className: '' },
      box: { px: { xs: 0, md: 2 }, py: { xs: 2, md: 2 } },
      data: {
        suggestionsKey: 'userDomainsGaps',
        tabName: i18n('yourDomain'),
        placeholder: i18n('enterOwn'),
        selectionKey: 'userDomains',
        suggestTitle: i18n('suggestedDomain')
      }
    }
  ];

  return (
    <Box p={2} className={styles.boxWrapper}>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        {tabs.map((tab: ExpertiseTab) => (
          <Grid key={tab.id} item xs={tab.grid.xs} md={tab.grid.md} className={tab.grid.className}>
            <Box px={tab.box.px} py={tab.box.py}>
              <SkillsTab
                suggestedItems={userProfileData[tab.data.suggestionsKey]}
                tabName={tab.data.tabName}
                placeholder={tab.data.placeholder}
                selectedItems={userProfileData[tab.data.selectionKey]}
                onAddItem={(item: DataItem) => onAddItem(tab.data.selectionKey, item)}
                onRemoveItem={(item: DataItem) => onRemoveItem(tab.data.selectionKey, item)}
                suggestTitle={tab.data.suggestTitle}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default withLoader(Expertise);
