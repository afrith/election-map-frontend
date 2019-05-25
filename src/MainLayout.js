import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { generatePath } from 'react-router'

import MainMap from './MainMap'
import Settings from './Settings'

export default class MainLayout extends Component {
  _replacePath = (params) => {
    const { match, history} = this.props
    const currentParams = match.params
    const newParams = {...currentParams, ...params}
    const newPath = generatePath('/:election/:ballot/:level/:theme', newParams)
    history.push(newPath + window.location.hash)
  }

  render () {
    const { match } = this.props
    const { election, ballot, level, theme } = match.params

    const settings = (
      <Settings 
        election={election} ballot={ballot} level={level} theme={theme}
        onChangeElection={election => this._replacePath({election})}
        onChangeBallot={ballot => this._replacePath({ballot})}
        onChangeLevel={level => this._replacePath({level})}
        onChangeTheme={theme => this._replacePath({theme})}
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