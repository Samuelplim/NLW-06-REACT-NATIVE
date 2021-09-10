import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { Feather} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalView } from '../../components/ModalView';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { Button } from '../../components/Button';
import { CategorySelect } from '../../components/CategorySelect';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Background } from '../../components/Background';
import { Guilds } from '../Guilds';

import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useNavigation } from '@react-navigation/native';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [guildsModal, setGuildasModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handlerCategorySelect(categoryId:string){
    setCategory(categoryId);
  }
  function handlerGuildModal(){
    setGuildasModal(!guildsModal);
  }
  function handlerCloseGuilds(){
    setGuildasModal(!guildsModal);
  }
  function handlerGuildSelect(guildSelect:GuildProps){
    handlerGuildModal();
    setGuild(guildSelect);

  }
  async function handleSave() {
    const newAppointment = {
      id:uuid.v4(),
      guild,
      category,
      date:`${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments,newAppointment])
      );

    navigation.navigate('Home');
  }
  
  return(
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <Background>
      <ScrollView>
    
      <Header
        title="Agendar partida"
      />
      <Text style={[styles.label,
        {marginLeft: 24, marginTop:36,marginBottom:16}]}>
        Categoria
      </Text>
      <CategorySelect
        hasCheclBox
        categorySelected={category}
        setCategory={handlerCategorySelect}
      />
      <View style={styles.form}>
        <RectButton
          onPress={handlerGuildModal}
        >
          <View style={styles.select}>
            {
              guild.icon ? 
              <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image}/> 
            }
            <View style={styles.selectBody}>
              <Text style={styles.label}>
                {guild.name ? guild.name : 'Selecione um servidor'}
              </Text>
            </View>

            <Feather
              name="chevron-right"
              color={theme.colors.heading}
              size={18}
            />
          </View>
        </RectButton>
        
        <View style={styles.field}>
          <View style={styles.wapper}>
            <Text style={[styles.label, {marginBottom:12}]}>
              Dia e mês
            </Text>
            
            <View style={styles.column}>
              <SmallInput 
                maxLength={2}
                onChangeText={setDay}
              />
              <Text style={styles.divider}>
                /
              </Text>
              <SmallInput 
                maxLength={2}
                onChangeText={setMonth}
              />
            </View>
          </View>
          <View style={styles.wapper}>
            <Text style={[styles.label, {marginBottom:12}]}>
              Hora e minuto
            </Text>
            
            <View style={styles.column}>
              <SmallInput
               maxLength={2}
               onChangeText={setHour}
               />
              <Text style={styles.divider}>
                :
              </Text>
              <SmallInput 
              maxLength={2}
              onChangeText={setMinute}
              />
            </View>
          </View>

        </View>

        <View style={[styles.field, {marginBottom: 12}]}>
          <Text style={styles.label} >
            Descrição
          </Text>
          <Text style={styles.caracteresLimit}>
            Max 100 caracteres
          </Text>
        </View>
        <TextArea 
          multiline
          maxLength={100}
          numberOfLines={5}
          autoCorrect={false}
          onChangeText={setDescription}
        />
        <View style={styles.footer}>
            <Button
              title="Agendar"
              onPress={handleSave}
            />
        </View>
      </View>
    </ScrollView>
    </Background>
    <ModalView visible={guildsModal} closeModal={handlerCloseGuilds}>
      <Guilds handleGuildSelect={handlerGuildSelect}/>
    </ModalView>
    </KeyboardAvoidingView>
  ) ;
}