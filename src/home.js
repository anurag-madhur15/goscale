import * as React from 'react';
import { TouchableOpacity, View, Text, FlatList, Linking, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import { getData } from '../src/store/actions';
// import { Provider } from 'react-redux';


const colors = ['#e66a6a', '#00ab00', '#639de1']
class HomeScreen extends React.Component {

    state = {
        dataList: null
    }

    dialCall = (number) => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        }
        else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    };

    componentDidMount = () => {
        fetch('http://www.mocky.io/v2/5c41920e0f0000543fe7b889', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then(result => {
                result.json()
                    .then(data => {
                        this.setState({
                            dataList: data.dataList
                        })
                        this.props.onDataLoad(data.dataList)
                    })
                    .catch(err => {
                        console.log("err: ", err)
                    })
            })
            .catch(err => {
                console.log("error: ", err)
            })
    }
    render() {

        console.log("datas: ", this.props.datas)
        if (!this.state.dataList) {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16}}>Loading Data...</Text>

                </View>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={this.state.dataList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        let color = colors[Math.floor(Math.random() * 3)]
                        return (
                            <React.Fragment>
                                <View style={{ flexDirection: 'row' }}  key={index}>
                                    <View style={{ flex: 1, alignItems: "center", marginTop: 10, marginLeft: 5 }}>
                                        <View style={{ height: 30, width: 30, borderRadius: 30 / 2, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{color: 'white'}}>{item.name[0]}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ flex: 6, marginTop: 10, marginLeft: 5 }} onPress={() => this.props.navigation.navigate('Details')}>
                                        <Text style={{ fontSize: 20, fontFamily: 'bold' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>{item.categoryName}</Text>
                                        <Text style={{ fontSize: 14, color: 'black' }}>{item.location}</Text>
                                        <Text style={{ fontSize: 14, color: 'black' }}>{item.classLocPref}</Text>


                                    </TouchableOpacity>
                                    <View style={{ flex: 2, marginTop: 10 }}>
                                        <Text style={{ fontSize: 10, color: 'silver' }}>16 hours ago</Text>
                                        <TouchableOpacity
                                            style={{ 
                                                height: 30, 
                                                width: 15, 
                                                borderRadius: 2, 
                                                justifyContent: 'flex-end',
                                                // backgroundColor: color, 
                                                marginTop: 10, 
                                                marginLeft: 20,
                                                borderWidth: 1,
                                                borderColor: color
                                            }}
                                            onPress={this.dialCall}
                                        >
                                            <View style={{backgroundColor: color, height:4, justifyContent: 'center', alignItems:'center'}}>
                                                <View style={{backgroundColor: 'white', height:2, width:2, borderRadius: 2/2}} />
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'silver', height: 2, marginTop: 8 }} />
                            </React.Fragment>
                        )
                    }}
                    keyExtractor={(item, index) => item._id}

                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return{
        datas: state.dataReducer.dataList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDataLoad: (data) => dispatch(getData(data))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

