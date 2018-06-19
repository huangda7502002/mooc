import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'
import {getUserList} from '../../redux/chatuser.redux'


@connect(
  state => state.chatuser,
  {getUserList}
)
export default class genius extends Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    return (
      <UserCard userlist={this.props.userlist}/>
    );
  }
}