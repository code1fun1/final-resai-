import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { Box } from '@mui/material';
import { useStyles } from './EditorStyles';

const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false
});

interface EditorComponentProps {
  editorData: EditorState;
  onChange: (data: EditorState) => void;
  placeholder: string;
  className?: string;
}

const Editor: React.FC<EditorComponentProps> = ({
  editorData,
  onChange,
  placeholder,
  className
}) => {
  const styles = useStyles();

  const memoizedEditor = useMemo(() => {
    return (
      <DynamicEditor
        toolbarHidden
        editorState={editorData}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(newEditorState: EditorState) => {
          onChange(newEditorState);
        }}
        placeholder={placeholder}
      />
    );
  }, [editorData, onChange, placeholder]);

  return <Box className={`${styles.editorWrap} ${className || ''}`}>{memoizedEditor}</Box>;
};

export default Editor;
