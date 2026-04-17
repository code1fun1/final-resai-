import React, { Dispatch, SetStateAction, useState, useCallback, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ContentState, EditorState } from 'draft-js';
// import Icon from '~/shared/components/Icon';
import Pagination from '~/shared/components/Pagination';
import SuggestionCard from '../SuggestionCard';
import { useStyles } from './AISuggestionsStyles';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SUGGESTION_PER_PAGE,
  getSuggestion,
  mapSuggestionsByCurrentQuestionIndex
} from '../Utils/AIQuestionPanelUtils';
import { AIPromptData, OnboardingData, Question, Suggestion } from '../../Utils/OnboardingUtils';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { CARD_VARIANT, LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import withLoader from '~/shared/components/HOC/withLoader';
import { handleToast } from '~/shared/utils/utils';

interface AISuggestionsProps {
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  aiPromptData: AIPromptData;
  setLoadWithoutMount: (value: boolean) => void;
}

const suggestionsPerPage: number = DEFAULT_SUGGESTION_PER_PAGE;

const AISuggestions: React.FC<AISuggestionsProps> = React.memo(
  ({ onSave, aiPromptData, setLoadWithoutMount }) => {
    const myRef = useRef<HTMLDivElement>(null);
    const { currentQuestionIndex } = aiPromptData;

    const styles = useStyles();
    const suggestions: Suggestion[] = mapSuggestionsByCurrentQuestionIndex(aiPromptData);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_INDEX);
    const totalPages: number = Math.round(suggestions.length / suggestionsPerPage);

    const startIndex: number = (currentPage - 1) * suggestionsPerPage;
    const endIndex: number = Math.min(startIndex + suggestionsPerPage, suggestions.length);
    const slicedSuggestions: Suggestion[] = suggestions.slice(startIndex, endIndex);
    const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
    const { ERROR } = SEVERITY;

    const [toastState, setToastState] = useState<ToastMessage>({
      open: false,
      severity: SEVERITY.SUCCESS,
      message: ''
    });
    const handleTop = () => {
      if (myRef.current) {
        myRef.current.scrollTop = 0;
      }
    };
    useEffect(() => {
      handleTop();
      setCurrentPage(DEFAULT_PAGE_INDEX);
    }, [currentQuestionIndex]);

    const handlePreviousButtonClick = useCallback(() => {
      setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1));
    }, []);

    const handleNextButtonClick = useCallback(() => {
      setCurrentPage((prevPage: number) => Math.min(prevPage + 1, totalPages));
    }, [totalPages]);
    // State to track which suggestion's button was clicked
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [clickedSuggestion, setClickedSuggestion] = useState<{
      title: string | null;
      description: string | null;
    }>({ title: null, description: null });
    const handleSuggestion = useCallback(
      (value: string, index: number, title: string, description: string) => {
        // Update the clicked suggestion index
        setClickedSuggestion({ title, description });
        onSave((prevState: OnboardingData) => {
          const updatedQuestionList = prevState.aiPromptData.questionList.map(
            (question: Question, index: number) => {
              if (index !== currentQuestionIndex) return question;

              const newAnswer: string = `${question?.answer ?? ''}\n${value}`; //75 point modified code
              // Clear the existing answer and add the new suggestion's value
              // const newAnswer: string = value; // Set the new answer to the selected suggestion

              return { ...question, answer: newAnswer };
            }
          );

          const currentQuestion: Question = updatedQuestionList[currentQuestionIndex];
          const newAnswer: string = currentQuestion?.answer ?? '';

          const updatedEditorData: EditorState = EditorState.createWithContent(
            ContentState.createFromText(newAnswer)
          );

          return {
            ...prevState,
            aiPromptData: {
              ...prevState.aiPromptData,
              questionList: updatedQuestionList,
              editorData: updatedEditorData
            }
          };
        });
      },
      [onSave, currentQuestionIndex]
    );

    const loadSuggestions = async () => {
      const currentQuestion: Question = aiPromptData.questionList[currentQuestionIndex];
      setLoadWithoutMount(true);
      const res = await getSuggestion(currentQuestion);
      setLoadWithoutMount(false);
      const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
      handleToast({ severity, message: res.message }, setToastState, toastState);
      if (res?.data?.suggestions) {
        onSave((prevState: OnboardingData) => {
          const updatedQuestionList = prevState.aiPromptData.questionList.map(
            (question: Question, index: number) => {
              if (index === currentQuestionIndex) {
                return {
                  ...question,
                  suggestions: [...question.suggestions, ...res.data.suggestions]
                };
              }
              return question;
            }
          );
          return {
            ...prevState,
            aiPromptData: {
              ...prevState.aiPromptData,
              questionList: updatedQuestionList
            }
          };
        });
        setCurrentPage(totalPages + 1);
      }
    };
    /*const copyBtnDisableState = (description: string) => {
      const selectedAnswer = description;
      if (
        aiPromptData.questionList[currentQuestionIndex]?.answer === selectedAnswer &&
        aiPromptData.questionList[currentQuestionIndex]?.answer
      ) {
        return true;
      } else {
        return false;
      }
    };*/
    return (
      <Box display="flex" flexDirection="column" gap={{ xs: 1, md: 3 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Image
            src="/image/aiSuggestionGold.svg"
            alt={i18n('aiSuggestions')}
            width={36}
            height={36}
          />
          <Typography className={styles.sidebarTitle}>{i18n('aiSuggestions')}</Typography>
        </Box>
        <Typography className={styles.sidebarSubtitle}>
          {i18n('appendMultipleSuggestions')}
        </Typography>
        <Box
          height={{ xs: 'calc(498px - 242px)', md: '498px' }}
          overflow="auto"
          ref={myRef}
          id="mybox"
        >
          <Box display="flex" flexDirection="column" gap={2} mr={1}>
            {slicedSuggestions.map((aiSuggestion: Suggestion, index: number) => (
              <SuggestionCard
                key={`${aiSuggestion.title}+${index}`}
                cardTitle={aiSuggestion.title}
                cardContent={aiSuggestion.description}
                variant={CARD_VARIANT.ELEVATION}
                buttonName={i18n('copy')}
                // onClick={handleSuggestion}
                onClick={() =>
                  handleSuggestion(
                    aiSuggestion.description,
                    index,
                    aiSuggestion.title,
                    aiSuggestion.description
                  )
                }
                //disabled={copyBtnDisableState(aiSuggestion.description)}
                disabled={
                  clickedSuggestion.title === aiSuggestion.title &&
                  clickedSuggestion.description === aiSuggestion.description &&
                  aiPromptData.questionList[currentQuestionIndex]?.answer
                    ? true
                    : false
                } // Disable if this suggestion has been clicked
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousButtonClick={handlePreviousButtonClick}
            onNextButtonClick={handleNextButtonClick}
          />
          <Button
            startIcon={
              <Image src="/image/flashIconBlack.svg" height={30} width={30} alt="No Flash Icon" />
            }
            className={styles.btnStyle}
            onClick={loadSuggestions}
          >
            {i18n('loadMoreSuggestion')}
          </Button>
        </Box>
      </Box>
    );
  }
);

export default withLoader(AISuggestions);
