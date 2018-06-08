import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(null,{loadData})
export default class authroute extends React.Component {

  publicList = [
    '/login','/register'
  ]

  componentDidMount() {
    const pathname = this.props.location.pathname
    if (this.publicList.indexOf(pathname) > -1) {
      return null
    }
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if(res.data.code === 0) {
          //有登陆信息
         this.props.loadData(res.data.data)
        } else {
          // 没有登陆信息
          this.props.history.push('/login')
        }
      }
    })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}