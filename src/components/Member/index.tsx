import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Avatar } from "../Avatar";

export type MemberProps = {
    id:string,
    username:string,
    avatar_url: string,
    status:string,
}

type Props = {
    data: MemberProps
}
export function Member({ data }: Props) {
    const isOnline = data.status === 'online';
    const { secondary80, secondary100, on, primary } = theme.colors;

    return (
        <View style={styles.container}>
            <Avatar urlImage={data.avatar_url}/>

            <View >
                <Text style={styles.title}>
                    {data.username}
                </Text>

                <View style={styles.status}>
                    <View
                        style={[
                            styles.bulletStatus,
                            {
                                backgroundColor: isOnline ? on : primary
                            }
                        ]}
                    />
                    <Text style={styles.nameSatus}>
                        {isOnline ? 'Disponível':'Ocupado'}
                    </Text>

                </View>
            </View>
        </View>
    );

}