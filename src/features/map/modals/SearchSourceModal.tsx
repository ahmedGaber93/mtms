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
    FlatList
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import SourceSearchItem from "../components/SourceSearchItem";
import firestore from '@react-native-firebase/firestore';
import EmptyView from "../../../components/EmptyView";
import LoadingView from "../../../components/LoadingView";
import FooterComponent from "../../../components/FooterComponent";



const pageSize = 20;


type Props = {
    onClose?(): void,
    onSelect?: (item: any) => void,
    visible?: boolean,
}


const SearchSourceModal: React.FC<Props> = (
    {
        onClose,
        visible = false,
        onSelect =  (item: any) => {},
    }
) => {

    const [searchValue, setSearchValue] = React.useState("");

    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<any[]>([]);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [hasMoreData, setHasMoreData] = React.useState(false);






    React.useEffect(() => {

        if (searchValue?.length === 0) {
            setData([]);
            setLoading(false);
            return;
        }

        firestore()
            .collection('Source')
            .where('name', '>=', searchValue?.toLowerCase())
            .where('name', '<=', searchValue?.toLowerCase() + '\uf8ff')
            .orderBy('name', 'asc')
            .limit(pageSize)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setData(data);
                setLoadingMore(false);
                setHasMoreData(data.length === pageSize);
                setLoading(false);
            });

    }, [searchValue]);



    const onEndReached = () => {
        if (!hasMoreData) {
            return;
        }
        const lastItem = data[data.length - 1]?.name;
        if (!lastItem) {
            return;
        }

        setLoadingMore(true);

        firestore()
            .collection('Source')
            .where('name', '>=', searchValue)
            .where('name', '<=', searchValue+ '\uf8ff')
            .orderBy('name', 'asc')
            .startAfter(lastItem)
            .limit(pageSize)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setData(lastData => [...lastData, ...data]);
                setLoadingMore(false);
                setHasMoreData(data.length === pageSize);
                setLoading(false);
            });
    };





    const renderItem = ({item, index} : any) => (
        <SourceSearchItem
            onPress={() => {
                onSelect(item);
            }}
            title={item?.name}/>
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
                        onEndReached={onEndReached}
                        data={data}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <FooterComponent
                                loadingMore={loadingMore}
                                hasMoreData={data.length >= pageSize ? hasMoreData : true}/>
                        }
                        keyExtractor={item => item.name.toString()}/>
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



export default SearchSourceModal;
