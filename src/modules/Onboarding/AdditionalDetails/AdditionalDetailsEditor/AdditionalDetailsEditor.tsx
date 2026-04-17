import { Box, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import EditorAdditional from '~/shared/components/Editor/EditorAdditional';
import { useStyles } from './AdditionalDetailsEditorStyles';

interface AdditionalDetailsEditorProps {
  title: string;
  placeholder: string;
  onEditorChange: (value: EditorState, key: string) => void;
  editorData: EditorState;
  keyName: string;
  autoFocus: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const AdditionalDetailsEditor: React.FC<AdditionalDetailsEditorProps> = ({
  title,
  placeholder,
  onEditorChange,
  editorData,
  keyName
}) => {
  const styles = useStyles();

  const handleEditorChange = (value: EditorState) => {
    const plainText = value.getCurrentContent().getPlainText().trim();

    if (plainText === '' && value.getCurrentContent().hasText()) {
      onEditorChange(EditorState.createEmpty(), keyName);
    } else {
      onEditorChange(value, keyName);
    }
  };

  const displayTitle = (() => {
    const titleMapping: Record<string, string> = {
      'Total Experience': 'Experience',
      शिक्षा: 'Education',
      'व्यावसायिक विकास': 'Professional Development or Certifications',
      'कुल अनुभव': 'Experience',
      'उपलब्धियाँ (पुरस्कार एवं प्रमाणपत्र)': 'Achievements (Awards)',
      भाषा: 'Language',
      'पेशेवर अनुभव': 'Professional Experience',
      'पहला नाम': 'First Name',
      उपनाम: 'Last Name'
    };

    return titleMapping[title] || title;
  })();

  const renderDetailsContent = () => {
    switch (keyName) {
      case 'professional_development':
        return (
          <>
            Add all relevant details — name, title, professional summary, workshops attended,
            companies you have worked with, graduation details with university name — this would
            help us fully showcase your skills, certifications, and professional growth.
          </>
        );

      case 'user_achievements':
        return (
          <>
            Add key details — name, title, awarder/issuer, summary, date, and location — to ensure
            your resume accurately reflects your awards and certifications.
            <br />
            <br />
            <strong>Awards:</strong> name, title, awarder, date, summary
            <br />
            <strong>Certifications:</strong> name, title, issuer, date, summary
          </>
        );

      case 'user_education':
        return <>degree name, degree type, institute, passing year, etc.</>;

      case 'total_experience':
        return <>total number of years of your experience</>;

      case 'user_language':
        return <>language, level, etc.</>;

      case 'user_projects':
        return (
          <>
            name, title, start date, end date, summary, company, role, team size, currently running
            or not, technology used, responsibilities, description, etc.
          </>
        );

      case 'user_professional_experience':
        return <>title, company, location, date, etc.</>;

      case 'first_name':
        return <>first name</>;

      case 'last_name':
        return <>last name</>;

      default:
        return null;
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Typography variant="subtitle1" className={styles.titleStyles}>
        {displayTitle}
      </Typography>

      <Typography variant="body1" sx={{ fontSize: '0.875rem', marginBottom: 0 }}>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {keyName === 'professional_development' ? 'Tip:' : 'Important:'}
        </span>{' '}
        {renderDetailsContent()}
      </Typography>

      <Box px={2} className={styles.editorStyles} sx={{ marginTop: 0 }}>
        <EditorAdditional
          editorData={editorData}
          onChange={(value) => handleEditorChange(value)}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};

export default AdditionalDetailsEditor;
