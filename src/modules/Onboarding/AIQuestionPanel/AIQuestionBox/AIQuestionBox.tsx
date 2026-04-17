import { Button, Typography } from '@mui/material';
import React, { useCallback, Dispatch, SetStateAction, useMemo } from 'react';
import { useStyles } from './AIQuestionBoxStyles';
import Editor from '~/shared/components/Editor';
import { EditorState } from 'draft-js';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { AIPromptData, OnboardingData, Question } from '../../Utils/OnboardingUtils';
import { Divider } from '@mui/material';
interface AIQuestionBoxProps {
  aiPromptData: AIPromptData;
  onSave: Dispatch<SetStateAction<OnboardingData>>;
}

const AIQuestionBox: React.FC<AIQuestionBoxProps> = ({ aiPromptData, onSave }) => {
  const { t: i18n, i18n: i18nextInstance } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const styles = useStyles();
  const { currentQuestionIndex, editorData, questionList } = aiPromptData;

  const handleEditorChange = useCallback(
    (value: EditorState) => {
      onSave((prevState: OnboardingData) => {
        const { aiPromptData } = prevState;
        const { currentQuestionIndex, questionList } = aiPromptData;

        const updatedQuestionList = questionList.map((q: Question, index: number) => {
          if (index === currentQuestionIndex) {
            return {
              ...q,
              answer: value.getCurrentContent().getPlainText()
            };
          }
          return q;
        });

        return {
          ...prevState,
          aiPromptData: {
            ...aiPromptData,
            questionList: updatedQuestionList,
            editorData: value
          }
        };
      });
    },
    [onSave]
  );

  const handleEditorClear = useCallback(() => {
    onSave((prevState: OnboardingData) => {
      const { aiPromptData } = prevState;
      const { currentQuestionIndex, questionList } = aiPromptData;
      const updatedQuestionList = questionList.map((q: Question, index: number) => {
        if (index === currentQuestionIndex) {
          return {
            ...q,
            answer: ''
          };
        }
        return q;
      });

      return {
        ...prevState,
        aiPromptData: {
          ...aiPromptData,
          questionList: updatedQuestionList,
          editorData: EditorState.createEmpty()
        }
      };
    });
  }, [onSave]);

  //const { skill_name: skillName = '', question } = questionList[currentQuestionIndex];
  const currentQuestion =
    Array.isArray(questionList) && questionList.length > currentQuestionIndex
      ? questionList[currentQuestionIndex]
      : null;

  const skillName = currentQuestion?.skill_name || '';
  const question = currentQuestion?.question || '';

  const editorKey = useMemo(() => i18nextInstance.language, [i18nextInstance.language]);
  return (
    <>
      <Typography className={styles.subTitle}>{skillName}</Typography>
      <Typography variant="body1" sx={{ fontSize: '0.875rem', marginBottom: 0 }}>
        <span style={{ fontWeight: 'bold', color: 'red' }}>{i18n('aiQuestionHintTitle')}</span>
        {i18n('aiQuestionHintText')}
      </Typography>
      <Divider />
      <Typography className={styles.title}>{question}</Typography>
      <Editor
        editorData={editorData}
        onChange={(value) => handleEditorChange(value)}
        placeholder={i18n('aiQuestionEditorPlaceholder')}
        key={editorKey}
      />
      <Divider />
      <Button className={styles.clearBtn} onClick={handleEditorClear}>
        {i18n('clearAll')}
      </Button>
    </>
  );
};

export default AIQuestionBox;
