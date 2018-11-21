/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {StyleSheet,View,FlatList,TouchableHighlight,TouchableNativeFeedback,Image,NetInfo,RefreshControl,TouchableOpacity,Dimensions,Platform} from 'react-native';
import { Container, Header, Content, List, ListItem,Text,Left, Right, Icon, Accordion,Thumbnail,Body,
  Card, CardItem, Button,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import ExtraDimensions from 'react-native-extra-dimensions-android';

var moment = require('moment');
const dataArray = [
  { title: "", content: "" },
  { title: "", content: "" },
  { title: "", content: "" }
];
 export default class App extends Component {
   constructor(){
     super();
     this.state={
       data:[],
       modalVisible: false,
       itemsvalue:[],
       appApi:100,
       spinner: true,
       isConnected:null,
       refreshing: false,
       stop:false,
       bgcolor:'white',
       count:0,
       isModalVisible: false,
       id: null,
       selected:null,
     }
   }

   componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      id: nextProps.id,
    })
  }
  
  // _keyExtractor = (item, index) => item.id;
   _keyExtractor = (item, index) =>index.toString();

   componentDidMount(){
     NetInfo.isConnected.addEventListener('connectionChange',this._handleConnectivityChange);
     NetInfo.isConnected.fetch().done( (isConnected)=>{ 
       this.setState({isConnected});

     });
     this.setState({ isVisible: false });
   }

   componentWillUnmount(){
     NetInfo.isConnected.removeEventListener('connectionChange',this._handleConnectivityChange);

   }
  
   _handleConnectivityChange = (isConnected) =>{
     this.setState({
       isConnected,
     })
   }

   componentWillMount(){
    this.setState({ isVisible: false });
     this.fetchData();

   }

   _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    _toggleModal1 = () =>
    this.setState({ isModalVisible:false });

     fetchData = async() =>{
     const response= await fetch("https://api.github.com/repos/crashlytics/secureudid/issues");
     const json=await response.json();
     this.setState({
       data:json,
       spinner: false,
     });
   }


   fetchvalue = async() =>{
    const response= await fetch("https://api.github.com/repos/crashlytics/secureudid/issues");
    const json=await response.json();
    this.setState({
      data:json,
      spinner: false,
    });
  }

   _handleRefresh = () => {
    this.setState({refreshing: true});
    this.fetchvalue().then(() => {
      
      this.setState({refreshing: false,stop:true});
    });
  }
  _handleRefresh1 = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      
      this.setState({refreshing: false,stop:false});
    });
  }



  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderData(title) {
    return (
      <View
        style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#A9DAD6" }}
      >
        <Text style={{ fontWeight: "600" }}>

        </Text>

       </View>
    );
  }


  render() {
    const deviceWidth = Platform.OS === "ios" 
    ? Dimensions.get("window").width :ExtraDimensions.get("REAL_WINDOW_HEIGHT");
    const deviceHeight = Platform.OS === "ios" 
      ? Dimensions.get("window").height
      : ExtraDimensions.get("REAL_WINDOW_HEIGHT");

    if(this.state.isConnected === true){ 
    return (
    
        
        <View style={styles.container}>
           <Spinner
          visible={this.state.spinner}
          textContent={'Data Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
          {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}
        {
          this.state.stop === false ?  <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
     
          renderItem={({item})=>(
       
          <Card>
          <List>

              <ListItem avatar>
                <Left style=
                {[styles.avenir,{flexDirection:'column',fontSize:10,},]}>
                  <Thumbnail source={{ uri:item.user.avatar_url }}  />
                  <Text style={[styles.roboto,{fontSize:9,}]}>{`${item.user.login}`}</Text>
                </Left>
                <Body>
                  <TouchableHighlight   style={{backgroundColor:'transparent',}}
                 onPress={this._toggleModal}
                  >
                  <Text>
                    <Text style={styles.OpenSansCondensedBold}>Title:</Text>
                    <Text style={styles.pacificoregular}>{`${item.title}`}</Text>

                  </Text>
                  </TouchableHighlight>
                </Body>
                <Right style={{alignItems:'flex-end',justifyContent:'flex-end',}}>
                  <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                }]}>{moment(item.updated_at).format('MM-DD-YYYY')}</Text>
                       <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                }]}>{moment(item.updated_at).format('hh:mm')}</Text>
                </Right>
              </ListItem>
           </List>
            <CardItem>
            <Body>
              <Text style={styles.avenir}>{`${item.body}`}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>{`${item.number}`} stars</Text>
              </Button>
            </Left>
            <Right>
            <Text style={[styles.pacificoregular,{color: '#87838B'}]}>{`${item.comments}`}</Text>
            </Right>
          </CardItem>
          <Modal isVisible={this.state.isModalVisible} deviceHeight={deviceWidth}
    deviceHeight={deviceHeight}  onSwipe={() => this.setState({ isVisible: false })}
    swipeDirection="left"  onBackdropPress={() => this.setState({ isVisible: false })} style={{
      backdropColor:'transparent' 
               }}>
            <View style={{ flex: 1,backgroundColor:'white',width:300,height:200}}>   
               <View style={{flex:90,backgroundColor:'white',}} >
                     <Text>
                        <Text style={styles.OpenSansCondensedBold}>Title:</Text>
                        <Text style={styles.pacificoregular}>{`${item.title}`}</Text>
                      </Text>
               </View>     
               <View style={{flex:10,backgroundColor:'red',flexDirection:'row',alignItems:'center',justifyContent:'center',}} >
                  
                      <Button  transparent primary onPress={this._toggleModal1}>
                          <Icon name='arrow-back'/>   
                          <Text>Go Back</Text>
                        </Button>
               </View>             
            </View>
          </Modal>
         </Card>
        
           ) }
           refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
           onRefresh={this._handleRefresh}
     
            />

        
          }
           /> : <FlatList
           data={this.state.data}
           keyExtractor={(x,i)=>i}
           renderItem={({item})=>(
              <Card>
              <List>
 
               <ListItem avatar>
                 <Left style=
                 {[styles.avenir,{flexDirection:'column',fontSize:10,},]}>
                   <Thumbnail source={{ uri:item.user.avatar_url }}  />
                   <Text style={[styles.roboto,{fontSize:9,}]}>{`${item.user.login}`}</Text>
                 </Left>
                 <Body>
                   <TouchableHighlight   style={{backgroundColor:'transparent'}} >
                   <Text>
                     <Text style={styles.pacificoregular}>{`${item.title}`}</Text>
                   </Text>
                   </TouchableHighlight>
                 </Body>
                 <Right style={{alignItems:'flex-end',justifyContent:'flex-end',}}>
                   <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                 }]}>{moment(item.updated_at).format('MM-DD-YYYY')}</Text>
                        <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                 }]}>{moment(item.updated_at).format('hh:mm')}</Text>
                 </Right>
               </ListItem>
            </List>
             <CardItem>
             <Body>
               <Text style={styles.avenir}>{`${item.body}`}</Text>
             </Body>
           </CardItem>
          </Card>
         
            ) }
            refreshControl={
             <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this._handleRefresh1}
      
             />
           }
            />
        }
         
      </View>
          
 

    );

  } else {

    return (
      <View style={[styles.container,{justifyContent:'center',alignItems:'center',}]}>
            <Text style={[styles.pacificoregular,{color: '#87838B'}]}>check your internet connectivity</Text>
      </View>
    );

  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  avenir:{
    fontFamily:'Avenir',
    fontSize:15,
  },
  pacificoregular:{
    fontFamily:'PacificoRegular',
    fontSize:18,
  },
  vinchand:{
    fontFamily:'vincHand',
    fontSize:15,
  },
  roboto:{
    fontFamily:'Roboto',
    fontSize:10,
  },
  AllertaStencilRegular:{
    fontFamily:'AllertaStencilRegular',
    fontSize:15,
  },
  OpenSansCondensedBold:{
    fontFamily:'OpenSansCondensedBold',
    fontSize:18,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily:'vincHand',
    fontSize:20,
  },

});

