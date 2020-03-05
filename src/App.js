import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import firebase from "firebase"
import "./App.css"
import { intiFire } from "./fbConfig"
import AvatarComponent from "./components/AvatarComponent"
import CircularProgress from '@material-ui/core/CircularProgress';

const avtObj={
  avatar1:false,
  avatar2:false,
  avatar3:false,
  avatar4:false,
  avatar5:false
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { text: "", messages: [],publisher:false,published:true,type:null,loading:true }
    intiFire();
  }
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleLeavePage);
     this.checkAvatar();
    this.getMessages()
  }

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
      this.writeMessageToDB(this.state.text)
      this.setState({ text: "" })
    }
  }
  
  checkAvatar=()=>{
    var avatar = firebase
    .database()
    .ref("chatroom/avatar/")
    // .child("avatar")
    
    avatar.on("value",snapshot=>{
      let snp=snapshot.val();
      for(let i in snp){
         if(snp[i]===true){
          return this.setState({published:true,type:i,loading:false});
         }
        
         
      }
      return this.setState({published:false,type:null,loading:false});
    })
  
  }
  writeMessageToDB = message => {
    firebase
      .database()
      .ref('chatroom/')
      .child("messages")
      .push({
        text: `${this.state.type} : ${message}`
      })
  }

  getMessages = () => {
    var messagesDB = firebase
      .database()
      .ref("chatroom/messages/")
      .limitToLast(500)
    messagesDB.on("value", snapshot => {
      let newMessages = []
      snapshot.forEach(child => {
        var message = child.val()
        newMessages.push({ id: child.key, text: message.text })
      })
      this.setState({ messages: newMessages })
      this.bottomSpan.scrollIntoView({ behavior: "smooth" })
    })
  }

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItem>
        <ListItemText
          style={{ wordBreak: "break-word" }}
          primary={message.text}
        />
      </ListItem>
    ))
  }

  selectAvatar=(i)=>{
    
   let obj={...avtObj};
   obj[`avatar${i+1}`]=true;
   firebase
   .database()
   .ref("chatroom")
   .child("avatar")
   .set(obj);
   this.setState({publisher:true,published:true})
  }
   
  leave=()=>{
    let obj={...avtObj};
    firebase
    .database()
    .ref("chatroom")
    .child("avatar")
    .set(obj);
  }

  handleLeavePage=(e)=>{
    this.leave();
    const confirmationMessage = 'Some message';
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;
  }

  //unsubscribing to event listerns
  componentWillUnmount(){
     this.leave()
    window.removeEventListener('beforeunload', this.handleLeavePage);


  }
 
  render() {
    //loader
    if(this.state.loading){
      return (<div className="App" style={{marginTop:16}}>
                 <CircularProgress color="secondary" />
             </div>)
    }

    //avatar selection if publisher isnt selcted

    if(!this.state.published){
     return (<><AvatarComponent onselect={this.selectAvatar}/> <span ref={el => (this.bottomSpan = el)} />
     </>);
    }

    return (
      <div className="App">
        <Typography variant="h2" component="h3">
           Chatroom
        </Typography>
        <List>{this.renderMessages()}</List>
        <TextField
          autoFocus={true}
          multiline={true}
          rowsMax={3}
          placeholder="Type something.."
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.state.publisher?this.onSubmit:null}
          style={{ width: "90vw", overflow: "hidden" }}
        />
        {this.state.publisher && <span onClick={this.leave}>Leave</span>}
        <span ref={el => (this.bottomSpan = el)} />
      </div>
    )
  }
}



export default App;
