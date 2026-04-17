import { IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonIconProps {
  ariaLabel?: string;
  ariaControls?: string;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children: ReactNode;
}

const ButtonIcon = (props: ButtonIconProps) => {
  const { ariaLabel, ariaControls, onClick, children } = props;
  return (
    <>
      <IconButton
        size="large"
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        aria-haspopup="true"
        onClick={onClick}
        sx={{ padding: 0 }}
      >
        {children}
      </IconButton>
    </>
  );
};

export default ButtonIcon;
