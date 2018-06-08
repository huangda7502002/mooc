import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import User from '../user/user'

function Boss() {
  return <div>boss</div>
}
function Genius() {
  return <div>genius</div>
}
function Msg() {
  return <div>msg</div>
}

@connect(
  state => state
)
export default class dashboard extends React.Component {
  render() {
    const user = this.props.user
    const pathName = this.props.location.pathname
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
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
        <NavBar mode={'dard'}>{navList.find(v => v.path === pathName).title}</NavBar>
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