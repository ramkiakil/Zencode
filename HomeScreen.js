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
 export default class HomeScreen extends Component {
   constructor(){
     super();
     this.state={
       data:[],
       modalVisible: false,
       itemsvalue:[],
       appApi:100,
       spinner: true,
       isConnected:true,
       refreshing: false,
       stop:false,
       bgcolor:'white',
       count:0,
       isModalVisible: false
     }
   }
  
   componentDidMount(){
     NetInfo.isConnected.addEventListener('connectionChange',this._handleConnectivityChange);
     NetInfo.isConnected.fetch().done( (isConnected)=>{ 
       this.setState({isConnected});

     });
     
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
    this.setState({ isVisible: false,stop:false });
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


     this.state.spinner ?  
      <View style={{flex:1,backgroundColor:'#64D5CA'}}>
      <Spinner
        visible={this.state.spinner}
        textContent={'Data Loading...'}
        textStyle={styles.spinnerTextStyle}
        
        /> 
        </View>
        
        :  
        <View style={[styles.container,{backgroundColor:'#D6BBFC'}]}>
      
        {
          this.state.stop === false ?  
                  <FlatList
                  data={this.state.data}
                  keyExtractor={(x,i)=>i}
                  renderItem={({item})=>(
                  <Card style={{backgroundColor:'#D6BBFC'}}>
                  <List style={{backgroundColor:'#3490DC'}}>

                      <ListItem avatar>
                        <Left style=
                        {[styles.avenir,{flexDirection:'column',fontSize:10,},]}>
                          <Thumbnail source={{ uri:item.user.avatar_url }}  />
                          <Text style={[styles.roboto,{fontSize:9,}]}>{`${item.user.login}`}</Text>
                        </Left>
                        <Body>
                          <TouchableNativeFeedback   style={{backgroundColor:'transparent',}}
                        //  onPress={this._toggleModal}
                            // onPress={()=>{ this.props.navigation.navigate('Details',{id:item.user.login,
                            //     loginid:item.user.login,imageuri:item.user.avatar_url,
                            //     listbody:item.body,

                            // })}}  // pass the data to another screen ,get by this.props.navigation.params.id
                            onPress={()=>{
                                this.props.navigation.navigate('Details',{id:item.user.login,})}} // just pass the one data and access that data using api 
                          >
                          <Text>
                            <Text style={styles.pacificoregular}>{`${item.title}`}</Text>

                          </Text>
                          </TouchableNativeFeedback>
                        </Body>
                        <Right style={{alignItems:'flex-end',justifyContent:'flex-end',}}>
                          <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                        }]}>{moment(item.updated_at).format('MM-DD-YYYY')}</Text>
                              {/* <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                        }]}>{moment(item.updated_at).format('hh:mm')}</Text> */}
                        </Right>
                      </ListItem>
                  </List>
                    <CardItem style={{backgroundColor:'#F9ACAA'}}>
                    <Body>
                      <Text style={styles.avenir}>{`${item.body}`}</Text>
                    </Body>
                  </CardItem>
                  <CardItem  style={{backgroundColor:'#A0F0ED'}}>
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
              
                </Card>
                
                  ) }
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                  onRefresh={this._handleRefresh}
            
                    />

                
                  }
                  /> :
                   <FlatList
                      data={this.state.data}
                      keyExtractor={(x,i)=>i}
                      renderItem={({item})=>(
                          <Card>
                          <List style={{backgroundColor:'#3490DC'}}>
            
                          <ListItem avatar>
                            <Left style=
                            {[styles.avenir,{flexDirection:'column',fontSize:10,},]}>
                              <Thumbnail source={{ uri:item.user.avatar_url }}  />
                              <Text style={[styles.roboto,{fontSize:9,}]}>{`${item.user.login}`}</Text>
                            </Left>
                            <Body>
                              <TouchableNativeFeedback    onPress={()=>{
                                this.props.navigation.navigate('Details',{id:item.user.login,})}}  style={{backgroundColor:'transparent'}} >
                              <Text>
                                <Text style={styles.pacificoregular}>{`${item.title}`}</Text>
                              </Text>
                              </TouchableNativeFeedback>
                            </Body>
                            <Right style={{alignItems:'flex-end',justifyContent:'flex-end',}}>
                              <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                            }]}>{moment(item.updated_at).format('MM-DD-YYYY')}</Text>
                                    {/* <Text style={[styles.OpenSansCondensedBold,{fontSize:10,
                            }]}>{moment(item.updated_at).format('hh:mm')}</Text> */}
                            </Right>
                          </ListItem>
                        </List>
                        <CardItem style={{backgroundColor:'#F9ACAA'}}>
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

   {/* <Modal isVisible={this.state.isModalVisible} deviceHeight={deviceWidth}
    deviceHeight={deviceHeight}  onSwipe={() => this.setState({ isVisible: false })}
    swipeDirection="left||right"  onBackdropPress={() => this.setState({ isVisible: false })} style={{
      backdropColor:'transparent'
               }}>
            <View style={{ flex: 1,backgroundColor:'white',borderRadius:30,width:300,height:200}}>
              <Text>Hello!</Text>
              <TouchableOpacity onPress={this._toggleModal1}>
                <Text>Hide me!</Text>
              </TouchableOpacity>
                      
                      <Content>
                        <Button iconLeft light onPress={this._toggleModal1}>
                          <Icon name='arrow-back' />
                          <Text>Back</Text>
                        </Button>
                        <Button iconRight light>
                          <Text>Next</Text>
                          <Icon name='arrow-forward' />
                        </Button>
                        <Button iconLeft>
                          <Icon name='home' />
                          <Text>Home</Text>
                        </Button>
                        <Button iconLeft transparent primary>
                          <Icon name='beer' />
                          <Text>Pub</Text>
                        </Button>
                        <Button iconLeft dark>
                          <Icon name='cog' />
                          <Text>Settings</Text>
                        </Button>
                      </Content>
            
            </View>
          </Modal> */}