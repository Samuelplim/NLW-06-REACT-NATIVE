import React, { useState, useEffect } from 'react';
import { 
  View,
  ImageBackground, 
  Text, 
  FlatList, 
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { BorderlessButton} from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Loading } from '../../components/Loading';

import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { api } from '../../services/api';

type Params = {
  guildSelected: AppointmentProps
}
type GuildWidget = {
  id:string,
  name:string,
  instant_invite:string,
  members:MemberProps[]
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Widget tem que está habilidado');
    }finally{
      setLoading(false);
    }
  }
  function handlerShareInvitation(){
    const message = Platform.OS === 'ios' 
    ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }
  function handleOpenGuild(){
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  },[]);
  return(
    <Background>
      <Header
        title="Detalhes"
        action= {
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handlerShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>

        }
      />
      <ImageBackground 
          source={BannerImg}
          style={styles.banner}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.title}>{guildSelected.guild.name}</Text>
            <Text style={styles.subtitle}>{guildSelected.description}</Text>
          </View>
        </ImageBackground>
      {
        loading? <Loading/> :
      <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
        <FlatList
          data={widget.members}
          keyExtractor={item => item.id}
          renderItem={({item}) =>(
            <Member data={item}/>
          )}
          ItemSeparatorComponent={() => <ListDivider/>}
          ListFooterComponent={() => <ListDivider/>}
          style={styles.members}
        />

        <View style={styles.footer}>
          <ButtonIcon 
            title="Entrar na partida" 
            onPress={handleOpenGuild}
          />
        </View>
        </>
      }
    </Background>
  ) ;
}