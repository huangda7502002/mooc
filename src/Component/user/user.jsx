import React from 'react'
import {connect} from 'react-redux'
import {Result} from 'antd-mobile'

@connect(
  state => state.user
)
export default class user extends React.Component {
  render() {
    const props = this.props
    return props.user ? (
      <div>
        <Result
          title={props.user}
          mssage={props.type === 'boss' ? props.company : null}
          img={<img style={{width: 50}} src={require(`../img/${this.props.avatar}.png`)} alt=""/>}
        />
      </div>
    ) : null
  }
}