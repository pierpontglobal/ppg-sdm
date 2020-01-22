import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    minHeight: '180px',
    minWidth: '220px'
  }
});

function PPGModal(props) {
  const { setOpen, classes, width, height, setPadding, onlyChildren, onBackAction } = props;

  let style = {
    argin: 'auto',
    width: width,
    height: height,
    overflowY: 'scroll',
    padding: '32px',
  };

  if (!setPadding) {
    style.padding = '48px 0px 0px 0px';
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={setOpen}
      onClose={props.handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {
        !onlyChildren
          ? 
          (
            <div
                style={style}
                className={classes.paper}
              >
              <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
                {
                  (onBackAction) ? (
                    <IconButton onClick={props.onBackAction}>
                      <ArrowBackIcon />
                    </IconButton>
                    ) 
                  : null
                }
              </div>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <IconButton onClick={props.handleClose}>
                  <Close />
                </IconButton>
              </div>
              {props.children}
            </div>
          )
        : props.children
      }
    </Modal>
  );
}

export default withStyles(styles)(PPGModal);
