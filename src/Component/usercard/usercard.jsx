import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Card,WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
export default class usercard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick = (v) => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        {this.props.userlist.map(v => (
          v.avatar && <Card onClick={this.handleClick.bind(this,v)} key={v._id}>
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}/>
            <Card.Body>
              {v.type === 'boss' && <div>公司: {v.company}</div>}
              {v.desc.split('\n').map((v,index) => (
                <div key={index}>{v}</div>
              ))}
              {v.type === 'boss' && <div>薪资：{v.money}</div>}
            </Card.Body>
          </Card>
        ))
        }
      </WingBlank>
    );
  }
}