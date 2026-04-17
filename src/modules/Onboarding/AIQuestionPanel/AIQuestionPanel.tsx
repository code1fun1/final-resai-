import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Alert from '~/shared/components/Alert';
import SplitViewListingEditor from '~/shared/components/SplitViewListingEditor';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { AIPromptData, OnboardingData, ProfileData } from '../Utils/OnboardingUtils';
import AIQuestionBox from './AIQuestionBox';
import AISuggestions from './AISuggestions';
import SkillAnalysisSummaryModal from '../../../shared/components/SkillAnalysisSummaryModal/SkillAnalysisSummaryModal';
import httpRequest from '~/shared/utils/axios';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import Modal from '~/shared/components/Modal/Modal';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AIQuestionPanelProps {
  aiPromptData: AIPromptData;
  userProfileData: ProfileData;
  IsDataLoading: number;
  onSave: Dispatch<SetStateAction<OnboardingData>>;
}

const AIQuestionPanel: React.FC<AIQuestionPanelProps> = ({
  aiPromptData,
  // userProfileData, // removed unused
  IsDataLoading,
  onSave
}) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(true);
  //const [IsImproveScoreClick, setIsImproveScoreClick] = useState<number>(0);
  const [modelShow, setModelShow] = useState<boolean>(false);
  // const [showAiSkills, setShowAiSkills] = useState<Array<string>>([]); // eslint-disable-line @typescript-eslint/no-unused-vars

  const [skillAnalysisData, setSkillAnalysisData] = useState<unknown>(null);
  const [skillAnalysisError, setSkillAnalysisError] = useState<string | null>(null);
  const [skillAnalysisLoading, setSkillAnalysisLoading] = useState<boolean>(false);
  const [showAiSkills, setShowAiSkills] = useState<Array<string>>([]);
  const [IsImproveScoreClick, setIsImproveScoreClick] = useState<number>(0);
  const [localJobTitle, setLocalJobTitle] = useState<string>('');
  function onlyUnique(value: string, index: number, array: Array<string>) {
    return value && array.indexOf(value) === index;
  }
  useEffect(() => {
    let array: Array<string> = [];
    if (aiPromptData && true) {
      array = aiPromptData.questionList.map((item) => {
        return item.skill_name;
      });
    }

    var unique = array.filter(onlyUnique);
    setShowAiSkills(unique);
  }, [aiPromptData.questionList]);
  useEffect(() => {
    const fetchSkillAnalysis = async () => {
      setSkillAnalysisLoading(true);
      setSkillAnalysisError(null);
      try {
        const request = {
          url: APIS.USER_SKILL_ANALYSIS,
          method: API_METHOD.GET
        };
        const [response] = await httpRequest(request); // remove 'error' unused
        if (response && response.res_data.data[0].skill_analysis_content) {
          setSkillAnalysisData(response.res_data.data[0].skill_analysis_content);
        } else {
          setSkillAnalysisError('No skill analysis data available.');
          setSkillAnalysisData(null);
        }
      } catch (err) {
        setSkillAnalysisError('Failed to load skill analysis data.');
        setSkillAnalysisData(null);
      } finally {
        setSkillAnalysisLoading(false);
      }
    };
    if (modelShow && IsImproveScoreClick === 0) {
      fetchSkillAnalysis();
    }
  }, [modelShow]);

  useEffect(() => {
    // const storedSkills = localStorage.getItem('userSkillsWithGap');
    // if (storedSkills) {
    //   try {
    //     const parsedSkills = JSON.parse(storedSkills);
    //     setUserSkillsWithGap(parsedSkills);
    //   } catch (error) {
    //     console.error('Error parsing userSkillsWithGap:', error);
    //   }
    // }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jdFormValue');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.jobTitle && parsed.jobTitle.trim() !== '') {
            // console.log('parsed.jobTitle', parsed.jobTitle);
            setLocalJobTitle(parsed.jobTitle);
            // return false;
            // jobTitle = parsed.jobTitle;
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }

    const IScoreClick = localStorage.getItem('IsImprovedScoreClick');
    if (IScoreClick) {
      try {
        const parsedIScoreClick = JSON.parse(IScoreClick);
        setIsImproveScoreClick(parsedIScoreClick);
        // localStorage.setItem('IsImprovedScoreClick', JSON.stringify(0));
      } catch (error) {
        console.error('Error parsing IsImprovedScoreClick:', error);
      }
    }
  }, [IsImproveScoreClick]);

  useEffect(() => {
    if (IsDataLoading === 2) {
      setModelShow(true);
    }
  }, [IsDataLoading]);
  const handleClose = () => setModelShow(false);

  return (
    <>
      {IsDataLoading === 2 && (
        <>
          {showAiSkills.length > 0 && IsImproveScoreClick === 1 && localJobTitle === '' && (
            <Modal
              title={i18n('skillAnalysis')}
              open={modelShow}
              onClose={handleClose}
              closeOnBackdropClick={true}
            >
              <Box
                display="flex"
                flexDirection={'column'}
                gap={2}
                width={{ xs: '100%', sm: '409px' }}
                my={0}
              >
                {showAiSkills.length > 0 && IsImproveScoreClick === 1 && IsDataLoading === 2 && (
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="extract-skill"
                      id="extract-skill"
                    >
                      {i18n('skillPopupText4')}
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {showAiSkills.map((item, index) => {
                          return (
                            <li key={index}>
                              <strong>{item}</strong>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>
            </Modal>
          )}
        </>
      )}

      {IsImproveScoreClick === 0 && (
        <SkillAnalysisSummaryModal
          open={modelShow}
          onClose={() => setModelShow(false)}
          closeOnBackdropClick={false}
          data={skillAnalysisData}
          loading={skillAnalysisLoading}
          error={skillAnalysisError}
        />
      )}

      {isToastOpen && (
        <Alert
          title={i18n('aiQuestionPanelMessage')}
          color="warning"
          onClose={() => setIsToastOpen(false)}
        />
      )}

      <SplitViewListingEditor
        editor={<AIQuestionBox aiPromptData={aiPromptData} onSave={onSave} />}
        listing={<AISuggestions aiPromptData={aiPromptData} onSave={onSave} />}
      />
    </>
  );
};
export default AIQuestionPanel;
