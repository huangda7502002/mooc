import React, {Component} from 'react';
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
  state => state
)
export default class msg extends Component {
  getLast = (arr) => {
    return arr[arr.length -1]
  }
  render() {
    if (!this.props.chat.chatmsg.length) {
      return null
    }
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a)
      const b_last = this.getLast(b)
      return b_last - a_last
    })
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    return (
      <div>
        <List>
          {
            chatList.map(v => {
              const lastItem = this.getLast(v)
              const targetId = lastItem.from === userid ? lastItem.to : lastItem.from
              const avatar = userinfo[targetId].avatar
              const unreadNum = v.filter(v => !v.read && v.to === userid).length
              return (
              <List.Item
                arrow={'horizontal'}
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${avatar}.png`)}
                key={lastItem._id}>
                {lastItem.content}
                <List.Item.Brief>{userinfo[targetId].name}</List.Item.Brief>
              </List.Item>)
            })
          }
        </List>
      </div>
    );
  }
}