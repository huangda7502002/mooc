import React from 'react'
import Logo from '../../Component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import imoocFrom from '../../Component/imooc-form/imoocForm'


@connect(
  state => state.user,
  {
    login
  }
)
@imoocFrom
export default class Login extends React.Component {
  login = () => {
    this.props.login(this.props.state)
  }
  register = () => {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo!=='/login' && <Redirect to={this.props.redirectTo}/>}
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.props.handleChange('user',v)} placeholder={'请输入您的账号'}>用户</InputItem>
            <InputItem  onChange={v => this.props.handleChange('pwd',v)} type={'password'} placeholder={'请输入您的密码'}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.login} type={'primary'}>登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type={'primary'}>注册</Button>
        </WingBlank>
      </div>

    )
  }
}