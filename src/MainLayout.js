import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { generatePath } from 'react-router'

import MainMap from './MainMap'
import Settings from './Settings'
import InfoDrawer from './InfoDrawer'

export default class MainLayout extends Component {
  state = {
    fitBounds: null
  }

  _replacePath = (params) => {
    const { match, history} = this.props
    const currentParams = match.params
    const newParams = {...currentParams, ...params}
    const pathTemplate = newParams.selected ? '/:election/:ballot/:level/:theme/:selected' : '/:election/:ballot/:level/:theme'
    const newPath = generatePath(pathTemplate, newParams)
    history.push(newPath + window.location.hash)
  }

  render () {
    const { election, ballot, level, theme, selected } = this.props.match.params
    const { fitBounds } = this.state

    const settings = (
      <Settings 
        election={election} ballot={ballot} level={level} theme={theme}
        onChangeElection={election => this._replacePath({election})}
        onChangeBallot={ballot => this._replacePath({ballot})}
        onChangeLevel={level => this._replacePath({level, selected: null})}
        onChangeTheme={theme => this._replacePath({theme})}
        onPlaceSearched={({boundingBox}) => {this.setState({fitBounds: boundingBox})}}
      />
    )

    return (
      <NavigationDrawer
        toolbarTitle="Election Results"
        contentStyle={{position: 'relative'}}
        drawerTitle="Settings"
        drawerChildren={settings}
      >
        <MainMap
          election={election} ballot={ballot} level={level} theme={theme} selected={selected}
          onFeatureSelected={(selected) => this._replacePath({selected})}
          fitBounds={fitBounds}
        />
        <InfoDrawer
          election={election} ballot={ballot} level={level} selected={selected}
          onClose={() => this._replacePath({selected: null})}
        />
      </NavigationDrawer>
    )
  }
}