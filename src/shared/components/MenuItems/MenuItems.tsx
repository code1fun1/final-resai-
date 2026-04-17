import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import Icon from '../Icon';
import { useStyles } from './MenuItemsStyles';

interface MenuItemsProps {
  itemLabel: string;
  itemIcon?: string;
  onClick: () => void;
}

const MenuItems = (props: MenuItemsProps) => {
  const { onClick, itemLabel, itemIcon } = props;
  const styles = useStyles();
  return (
    <MenuItem onClick={onClick} className={styles.menuItemList}>
      {itemIcon && (
        <ListItemIcon>
          <Icon name={itemIcon} />
        </ListItemIcon>
      )}
      <Typography textAlign="center">{itemLabel}</Typography>
    </MenuItem>
  );
};

export default MenuItems;
