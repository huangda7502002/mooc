import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class avatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  state = {
    icon: '',
    text: ''
  }
  render() {
    const avatarList = 'boy,girl,man,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,woman,zebra'.split(',')
      .map(v => ({
        icon:require(`../img/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.text ? (<div><span>已选择头像:</span><img style={{width: 20}} src={this.state.icon} alt=""/></div>) : (<div><span>请选择头像:</span></div>)
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid onClick={ele => {
            this.setState({
              icon: require(`../img/${ele.text}.png`),
              text: ele.text
            })
            this.props.selectAvatar(ele)
          }} data={avatarList} columnNum={5}></Grid>
        </List>
      </div>
    )
  }
}