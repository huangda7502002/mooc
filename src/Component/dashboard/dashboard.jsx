import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import User from '../user/user'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import {getMsgList, recvMsg} from "../../redux/chat.redux";

function Msg() {
  return <div>msg</div>
}

@connect(
  state => state,
  {getMsgList, recvMsg}
)
export default class dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const user = this.props.user
    const pathName = this.props.location.pathname
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className={'fixed-header'} mode={'dard'}>{navList.find(v => v.path === pathName).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {
              navList.map(v => (<Route key={v.path} path={v.path} component={v.component}/>))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    )
  }
}