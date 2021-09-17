import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  WapperContainer: {
    marginTop: 20,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  guildIconContainer: {
    height: 68,
    width: 64,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 18,
  },
  category: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 12,
    marginRight: 24,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
    fontSize: 12,
    marginLeft: 8,
  },
  playersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  player: {
    fontFamily: theme.fonts.text500,
    fontSize: 12,
    marginLeft: 8,
    marginRight: 24,
  },
});
