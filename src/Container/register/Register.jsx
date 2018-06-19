import React from 'react'
import Logo from '../../Component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocForm from '../../Component/imooc-form/imoocForm'

let RadioItem = Radio.RadioItem
@connect(state => state.user,{
  register
})
@imoocForm
export default class Register extends React.Component {
  componentDidMount() {
    this.props.handleChange('type','genius')
  }
  handleRegister = () => {
    this.props.register({...this.props.state})
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
        <Logo/>
        <List>
          {this.props.msg?<p className={'error-msg'}>{this.props.msg}</p>:null}
          <InputItem value={this.props.state.user} onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
          <InputItem type={'password'} value={this.props.state.pwd} onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
          <InputItem type={'password'} value={this.props.state.repeatpwd} onChange={v => this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem onClick={() => this.props.handleChange('type','genius')} checked={this.props.state.type === 'genius'}>
            牛人
          </RadioItem>
          <RadioItem onClick={() => this.props.handleChange('type', 'boss')} checked={this.props.state.type === 'boss'}>
            BOSS
          </RadioItem>
          <WhiteSpace/>
          <Button type={'primary'} onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}