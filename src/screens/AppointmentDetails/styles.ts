import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  },
  banner:{
    width:'100%',
    height: 234,

  },
  bannerContent:{
    flex:1,
    justifyContent:'flex-end',
    paddingHorizontal:24,
    marginBottom:28,
  },
    title:{
        fontFamily:theme.fonts.title700,
        color:theme.colors.heading,
        fontSize:28,
    },
    subtitle:{
      fontFamily:theme.fonts.text500,
      color:theme.colors.heading,
      fontSize:12,
      lineHeight:21,
  },
  members:{
    marginLeft:24,
    marginTop:27,
  },
  footer:{
    paddingHorizontal:24,
    paddingVertical:20,
    marginBottom: getBottomSpace(),
  },
})