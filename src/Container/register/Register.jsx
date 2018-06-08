import React from 'react'
import Logo from '../../Component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

let RadioItem = Radio.RadioItem
@connect(state => state.user,{
  register
})
export default class Register extends React.Component {
  state = {
    type:'genuis',
    pwd: '',
    repeatpwd: '',
    user: ''
  }
  handleRegister = () => {
    this.props.register({...this.state})
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
        <Logo/>
        <List>
          {this.props.msg?<p className={'error-msg'}>{this.props.msg}</p>:null}
          <InputItem value={this.state.user} onChange={v => this.setState({user:v})}>用户</InputItem>
          <InputItem type={'password'} value={this.state.pwd} onChange={v => this.setState({pwd:v})}>密码</InputItem>
          <InputItem type={'password'} value={this.state.repeatpwd} onChange={v => this.setState({repeatpwd:v})}>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem onClick={() => this.setState({'type':'genuis'})} checked={this.state.type === 'genuis'}>
            牛人
          </RadioItem>
          <RadioItem onClick={() => this.setState({'type': 'boss'})} checked={this.state.type === 'boss'}>
            BOSS
          </RadioItem>
          <WhiteSpace/>
          <Button type={'primary'} onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}