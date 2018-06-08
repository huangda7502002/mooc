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
export default class geniusinfo extends React.Component {
  state = {
    title: '',
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
        <NavBar mode={'dark'}>牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <InputItem onChange={(v) => this.setState({title:v})}>求职岗位</InputItem>
        <TextareaItem title={'个人简介'} rows={3} autoHeight onChange={(v) => this.setState({desc:v})}/>
        <Button onClick={() => {
          this.props.update(this.state)
        }} type={'primary'}>保存</Button>
      </div>
    )
  }
}