import React from 'react';

export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component {
    state = {}
    handleChange= (key, val) => {
      this.setState({
        [key]:val
      })
    }
    render() {
      return <Comp state={this.state} handleChange={this.handleChange} {...this.props}></Comp>
    }
  }
}