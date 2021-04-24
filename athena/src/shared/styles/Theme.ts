import { createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    common: {
      black: '#101010',
      white: '#f5f5f5',
    },
    type: 'dark',
    primary: blue,
    secondary: grey,
    text: {
      primary: '#f5f5f5',
      secondary: '#9e9e9e',
    },
  },
});

export default Theme;
