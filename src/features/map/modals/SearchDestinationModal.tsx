import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    Image,
    I18nManager,
    TextInput,
    FlatList, Alert
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import SourceSearchItem from "../components/SourceSearchItem";
import firestore from '@react-native-firebase/firestore';
import EmptyView from "../../../components/EmptyView";
import LoadingView from "../../../components/LoadingView";
import FooterComponent from "../../../components/FooterComponent";
import DestinationSearchItem from "../components/DestinationSearchItem";



const pageSize = 20;


type Props = {
    onClose?(): void,
    onSelect?: (item: any) => void,
    visible?: boolean,
}


const SearchDestinationModal: React.FC<Props> = (
    {
        onClose,
        visible = false,
        onSelect =  (item: any) => {},
    }
) => {

    const [searchValue, setSearchValue] = React.useState("");

    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<any[]>([]);






    React.useEffect(() => {

        fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(e => Alert.alert("Network error!", e.toString()));


    }, []);


    const getFilteredData = () => {
        if (searchValue) {
            return data.filter((x) => x.name.includes(searchValue))
        }
        return [];
    };




    const renderItem = ({item, index} : any) => (
        <DestinationSearchItem
            onPress={() => {
                onSelect(item);
            }}
            cityName={item?.name}
            countryName={item?.country}/>
    );


    return (
        <Modal
            visible={visible}
            onDismiss={onClose}
            onRequestClose={onClose}>



            <View style={styles.container}>

                <View style={styles.sectionSearch}>

                    <View style={{width: 16}}/>

                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={onClose}>
                        <AntDesign
                            name={"arrowleft"}
                            color={"#999"}
                            size={22}/>
                    </TouchableOpacity>

                    <TextInput
                        onChangeText={setSearchValue}
                        placeholder={"Enter something to search"}
                        style={styles.searchInput}/>

                </View>





                {
                    loading
                    ?
                    <LoadingView/>
                    :
                    searchValue.length === 0
                    ?
                    <EmptyView />
                    :
                    <FlatList
                        style={{flex : 1,}}
                        onEndReachedThreshold={.5}
                        data={getFilteredData()}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.name.toString() + index}/>
                }





            </View>





        </Modal>

    );
};


const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fafafa',
        flex : 1,
    },

    sectionSearch : {
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : "#eee",
        backgroundColor : '#fff',
    },

    searchInput : {
        flex : 1,
        height : 36,
        lineHeight: 36,
        borderRadius : 18,
        backgroundColor : '#e1e1e1',
        margin : 16,
        paddingHorizontal : 15,


    },

});



export default SearchDestinationModal;
