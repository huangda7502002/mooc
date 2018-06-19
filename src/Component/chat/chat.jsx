import React, {Component} from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,getMsgList,recvMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util";

@connect(
  state => state,
  {sendMsg,getMsgList,recvMsg}
)
export default class chat extends Component {
  state = {
    text: ''
  }
  componentDidMount() {
    // if (!this.props.chat.chatmsg.length) {
    //   this.props.getMsgList()
    //   this.props.recvMsg()
    // }
  }
  handleSubmit = () => {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to , msg})
    this.setState({text:''})
  }
  render() {
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
                extra={<img src={avatar}/>}>{v.content}</List.Item>
            </List>})
        }
        <div className={'stick-footer'}>
          <List>
            <InputItem
              placeholder={'请输入'}
              value={this.state.text}
              onChange={v => this.setState({text:v})}
              extra={<span onClick={this.handleSubmit}>发送</span>}/>
          </List>
          <Grid
          data={emoji}/>
        </div>
      </div>
    );
  }
}