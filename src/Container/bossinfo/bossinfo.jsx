import React from 'react'
import {NavBar,InputItem,TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../Component/avatarSelector/avatarSelector'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(state => state.user,
  {
    update
  })
export default class bossinfo extends React.Component {
  state = {
    title: '',
    company: '',
    money: '',
    desc: '',
    avatar:''
  }
  selectAvatar = (ele) => {
    this.setState({
      avatar:ele.text
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect!== path && <Redirect to={this.props.redirectTo}></Redirect>}
        <NavBar mode={'dark'}>BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <InputItem onChange={(v) => this.setState({title:v})}>招聘职位</InputItem>
        <InputItem onChange={(v) => this.setState({company:v})}>公司名称</InputItem>
        <InputItem onChange={(v) => this.setState({money:v})}>职位薪资</InputItem>
        <TextareaItem title={'职位要求'} rows={3} autoHeight onChange={(v) => this.setState({desc:v})}/>
        <Button onClick={() => {
          this.props.update(this.state)
        }} type={'primary'}>保存</Button>
      </div>
    )
  }
}