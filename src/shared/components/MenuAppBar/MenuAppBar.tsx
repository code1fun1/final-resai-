import { Menu } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from './MenuAppBarStyles';

interface MenuAppBarProps {
  anchorEl: Element | (() => Element) | null | undefined;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'left' | 'right' | 'center';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'left' | 'right' | 'center';
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MenuAppBar = (props: MenuAppBarProps) => {
  const {
    anchorEl,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    open,
    onClose,
    children
  } = props;
  const styles = useStyles();

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: anchorOriginVertical || 'top',
        horizontal: anchorOriginHorizontal || 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: transformOriginVertical || 'top',
        horizontal: transformOriginHorizontal || 'left'
      }}
      open={open}
      onClose={onClose}
      className={styles.menuWrapper}
    >
      {children}
    </Menu>
  );
};

export default MenuAppBar;
