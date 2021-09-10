import React, {useState,useCallback} from 'react';
import { View,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core';

import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment,AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const  [appointments, setAppointments] = useState<AppointmentProps[]>([]);

function handlerCategorySelect(categoryId:string){

    categoryId === category ? setCategory('') : setCategory(categoryId);
}
function handleAppointmentDetails(guildSelected:AppointmentProps){
    navigation.navigate('AppointmentDetails',{guildSelected});
}
function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
}
async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage:AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category){
        setAppointments(storage.filter(item => item.category === category));
    }else{
        setAppointments(storage);
    }

    setLoading(false);
}

useFocusEffect(useCallback(() =>{
    loadAppointments();
},[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
            
            <CategorySelect
                categorySelected={category}
                setCategory={handlerCategorySelect}
            />
           {
               loading ? <Loading/> :
               <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />
            
                    <FlatList
                        data={appointments}
                        keyExtractor={item=> item.id}
                        renderItem={({item}) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        style={styles.matches}
                        contentContainerStyle={{paddingBottom:68}}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider/>}
                    />
                </>
            }
        </Background>
    );
}