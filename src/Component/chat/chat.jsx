import React, {Component} from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,getMsgList,recvMsg, readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util";

@connect(
  state => state,
  {sendMsg,getMsgList,recvMsg,readMsg}
)
export default class chat extends Component {
  state = {
    text: '',
    showEmoji:false
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarousel()
  }
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel = () => {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  toggleEmoji = () => {
    this.setState({showEmoji: !this.state.showEmoji})
    this.fixCarousel()
  }
  handleSubmit = () => {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to , msg})
    this.setState({text:''})
  }
  render() {
    const emoji = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
      .split(' ')
      .filter( v => v)
      .map(v => ({text:v}))

    const userid = this.props.match.params.user
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div style={{marginTop:45}} id={'chat-page'}>
        <NavBar
          onLeftClick={() => this.props.history.goBack()}
          icon={<Icon type={'left'}></Icon>}
          mode={'dark'}>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map((v,index) => {
          console.log(users[v.from])
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ?
            <List key={index}>
              <List.Item
                thumb={avatar}
              >{v.content}</List.Item>
            </List> :
            <List key={index}>
              <List.Item
                className={'chat-me'}
                extra={<img alt={''} src={avatar}/>}>{v.content}</List.Item>
            </List>})
        }
        <div className={'stick-footer'}>
          <List>
            <InputItem
              placeholder={'请输入'}
              value={this.state.text}
              onChange={v => this.setState({text:v})}
              extra={
                <div>
                  <span onClick={this.toggleEmoji}
                  style={{marginRight: 15}}>表情</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }/>
          </List>
          {this.state.showEmoji && <Grid
            onClick={el => {
              this.setState({text:this.state.text+el.text})
            }}
            columnNum={9}
            isCarousel={true}
          data={emoji}/>}
        </div>
      </div>
    );
  }
}