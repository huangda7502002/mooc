import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import cookies from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
  state => state.user, {
    logoutSubmit
  }
)
export default class user extends React.Component {
  logout = () => {
    const alert = Modal.alert
    alert('注销','确认退出登陆吗?',[
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {
          cookies.erase('userid')
          this.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const props = this.props
    return props.user ? (
      <div>
        <Result
          title={props.user}
          mssage={props.type === 'boss' ? props.company : null}
          img={<img style={{width: 50}} src={require(`../img/${this.props.avatar}.png`)} alt=""/>}
        />
        <List renderHeader={() => '简介'}>
          <List.Item multipleLine>
            {props.title}
            {props.desc.split('\n').map((v,index) => (<List.Item.Brief key={index}>{v}</List.Item.Brief>))}
            {props.money && <List.Item.Brief >薪资:{props.money}</List.Item.Brief>}
          </List.Item>
        </List>
        <WhiteSpace/>
        <Button type={'primary'} onClick={this.logout}>退出登陆</Button>
      </div>
    ) : (this.props.redirectTo && <Redirect to={this.props.redirectTo}/>)
  }
}