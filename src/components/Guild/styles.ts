import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:90,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:24,
    },content:{
        flex:1,
        justifyContent:'center',
        marginLeft:12,
    },title:{
        fontFamily:theme.fonts.title700,
        fontSize: 18,
        color:theme.colors.heading,
        marginBottom:6,
    },ownerContent:{
        
        fontFamily:theme.fonts.text400,
        fontSize: 18,
        color:theme.colors.highlight,
    }

})