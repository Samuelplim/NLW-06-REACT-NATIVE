import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 18,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameSatus: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 12,
  },
  bulletStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});
