import React ,{ Component } from 'react';
import {StyleSheet,View,FlatList,TouchableHighlight,TouchableNativeFeedback,Image,NetInfo,RefreshControl,TouchableOpacity,Dimensions,Platform,AppRegistry,ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header, Content, List, ListItem,Text,Left, Right, Icon, Accordion,Thumbnail,Body,
  Card, CardItem, Button,
} from 'native-base';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
var moment = require('moment');
export default class DetailsScreen extends Component {

    constructor(props){
        super(props);
        this.state={
          data:[],
          show:false,
          showProgress: true
          // tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
          // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
          // tableData: [
          //   ['1', '2', '3'],
          //   ['a', 'b', 'c'],
          //   ['1', '2', '3'],
          //   ['a', 'b', 'c']
          // ]
          // appid:PARAMS,
        }

       
    }

    componentDidMount(){
      this.fetchData();

    }

    fetchData = async() =>{
      const { params } = this.props.navigation.state;
      try {                                            //https://api.github.com/users/bryant1410
        let response = await fetch(
          'https://api.github.com/users/' + params.id );
        let responseJson = await response.json();
        this.setState({
          data:responseJson,
          show:true,
          showProgress: false
        });
       // return responseJson;
      } catch (error) {
        console.error(error);
      }

  }
 
  _handleRefresh = () => {
    this.setState({refreshing: true});
    this.fetchvalue().then(() => {
      
      this.setState({refreshing: false});
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

      return (
        <View style={{ flex: 1, backgroundColor:'#3490DC', }}>
                <View style={{flex:40,padding:20,}}>
                  <Image source={{uri:this.state.data.avatar_url}} style={{width:'100%',height:'100%',borderRadius:20,}}/>
                </View>
                <View style={{flex:60}}>
                <ScrollView>
                  <View style={[styles.alignview]}>
                        <Text style={[styles.childalignview,]}>ID</Text>
                        <Text style={[styles.avenir,styles.childalignview]}>{this.state.data.id}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>NAME</Text>
                        <Text  style={[styles.avenir,styles.childalignview]}>{this.state.data.login}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>COMPANY</Text>
                        <Text  style={[styles.avenir,styles.childalignview]}
                         numberOfLines={2}
                        >{this.state.data.company}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>LOCATION</Text>
                        <Text style={[styles.avenir,styles.childalignview]}
                         numberOfLines={2}
                        >{this.state.data.location}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>BIO</Text>
                        <Text  style={[styles.avenir,styles.childalignview]}
                        numberOfLines={3}
                        >{this.state.data.bio}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>FOLLOWERS</Text>
                        <Text  style={[styles.avenir,styles.childalignview]}>{this.state.data.followers}</Text>
                    </View>
                    <View style={styles.alignview}>
                        <Text style={styles.childalignview}>FOLLOWING</Text>
                        <Text  style={[styles.avenir,styles.childalignview]}>{this.state.data.following}</Text>
                    </View>      

                    </ScrollView> 
                  </View>  
                  <ActivityIndicator animating={this.state.showProgress} size="large"/>
        </View>
      );

   
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
  alignview:{
    flex:1,
    flexDirection: 'row',
    fontSize:15,
   
  },
  childalignview:{
    flex:1,
    textAlign:'center',
    fontSize:15,
    padding:10,
   
  }


});
