import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'

import MainMap from './MainMap'
import Settings from './Settings'

export default class MainLayout extends Component {
  state = {
    election: 'npe2019',
    ballot: 'nat',
    level: 'muni',
    theme: 'leading'
  }

  render () {
    const { election, ballot, level, theme } = this.state

    const settings = (
      <Settings 
        election={election} ballot={ballot} level={level} theme={theme}
        onChangeElection={election => this.setState({election})}
        onChangeBallot={ballot => this.setState({ballot})}
        onChangeLevel={level => this.setState({level})}
        onChangeTheme={theme => this.setState({theme})}
      />
    )

    return (
      <NavigationDrawer
        toolbarTitle="Election Results"
        contentStyle={{position: 'relative'}}
        drawerTitle="Settings"
        drawerChildren={settings}
      >
        <MainMap election={election} ballot={ballot} level={level} />
      </NavigationDrawer>
    )
  }
}