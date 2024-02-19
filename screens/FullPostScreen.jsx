import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {View, ScrollView} from "react-native";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";
import {COURSES, DOMEN, EDUCATION_TYPES} from "../consts";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
`



const FullPostScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const { id, name } = route.params

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        })

        axiosInstance
            .get("/products/" + id)
            .then(({data}) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
                alert("Ошибка, не удалось получить статью")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchGroup, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        )
    }

    const image = `http://${DOMEN}/api/products/${data.id}/image/`

    return (
        <ScrollView style={{ padding: 20 }}>
            <PostImage source={{uri: image}} />
            <PostDetails>
                <PostText>
                    Название: {data.name}
                </PostText>
                <PostText>
                    Описание: {data.description}
                </PostText>
                <PostText>
                    Цена: {data.price}
                </PostText>

            </PostDetails>
        </ScrollView>
    )
}

export default FullPostScreen;