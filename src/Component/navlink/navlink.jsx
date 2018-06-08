import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
export default class navlink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const pathName = this.props.location.pathname
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            key={v.path}
            icon={{uri:require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
            title={v.text}
            selected={pathName === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}