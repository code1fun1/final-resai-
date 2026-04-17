import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Icon from '../Icon';
import { useStyles } from './ModalStyles';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface ModalProps {
  open: boolean;
  title?: string | undefined;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  maxWidth?: false | Breakpoint | undefined;
}

const Modal = (props: ModalProps) => {
  const { open, onClose, title, children, closeOnBackdropClick, maxWidth } = props;
  const styles = useStyles();
  // console.log(title);
  return (
    <Dialog
      open={open}
      onClose={closeOnBackdropClick === true ? onClose : undefined}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.modalWrapper}
      maxWidth={maxWidth}
    >
      <IconButton onClick={onClose} className={styles.closeIconBtn} style={{ zIndex: 2000 }}>
        <Icon name="crossIcon" />
      </IconButton>
      {title !== undefined ? (
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
      ) : null}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
