// MaterialUI 
import { makeStyles } from '@material-ui/core';

const ModalStyle = makeStyles(() => ({
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: { color: '#b2b2b2' },
  top: {
    animationDuration: '100ms',
    position: 'absolute',
    left: 0
  },
  circle: { strokeLinecap: 'round' },
  text: {
    fontWeight: 'bold',
    fontSize: '3em',
    marginTop: '1em',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}));

export default ModalStyle;