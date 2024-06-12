import React, { useMemo } from 'react'
import { SelectField, Paper } from 'react-md'

import { legend as leadingParty, legend2024 as leading2024 } from './styles/leadingParty'
import { legend as colorBlind } from './styles/colorBlind'
import { legend as partySupport, partyList } from './styles/partySupport'
import { legend as turnout } from './styles/turnout'

import { elections, ballots, levels } from './params'

import PlaceSearch from './PlaceSearch'

const electionTypes = {
  lge: {ballots: ballots.filter(b => b.electionType === 'lge')},
  npe: {ballots: ballots.filter(b => b.electionType === 'npe')}
}

const legends = {
  'leading': leadingParty,
  leading2024,
  'leading-cb': colorBlind,
  'turnout': turnout
}
partyList.forEach(row => {legends[`${row.code}-support`] = partySupport(row.code)})

const getAllowedBallots = election => electionTypes[election.substr(0, 3)].ballots.filter(b => (b.value !== 'reg' || election === 'npe2024'))

const Settings = (props) => {
  const { election, ballot, level, theme, onChangeElection, onChangeBallot, onChangeLevel, onChangeTheme, onPlaceSearched } = props
  const allowedBallots = getAllowedBallots(election)

  const handleChangeElection = election => {
    const allowedBallots = getAllowedBallots(election)
    const newBallot = allowedBallots.some(element => element.value === ballot) ? ballot : allowedBallots[0].value
    const newTheme = (election !== 'npe2024' && theme === 'mk-support') ? 'leading' : theme
    if (onChangeElection) onChangeElection(election, newBallot, newTheme)
  }

  const themes = useMemo(() => {
    const themes = [
      {value: 'leading', label: 'Leading party'},
      {value: 'leading-cb', label: 'Leading party, color blind friendly'},
      {value: 'turnout', label: 'Turnout'}
    ]
    themes.push(...(partyList
      .filter(row => (row.code !== 'mk' || election === 'npe2024'))
      .map(row => ({value: `${row.code}-support`, label: `${row.abbr} support`}))
    ))
    console.log('THEMES', themes)
    return themes
  }, [election])

  return (
    <div className="md-list--drawer">
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <Paper style={{padding:8}}>
            <SelectField
              id="select-election"
              label="Election"
              menuItems={elections}
              fullWidth
              value={election}
              onChange={handleChangeElection}
            />

            <SelectField
              id="select-ballot"
              label="Ballot"
              menuItems={allowedBallots}
              fullWidth
              value={ballot}
              onChange={value => onChangeBallot ? onChangeBallot(value) : null}
            />

            <SelectField
              id="select-level"
              label="Level of detail"
              menuItems={levels}
              fullWidth
              value={level}
              onChange={value => onChangeLevel ? onChangeLevel(value) : null}
            />

            <SelectField
              id="select-theme"
              label="Colour scheme"
              menuItems={themes}
              fullWidth
              value={theme}
              onChange={value => onChangeTheme ? onChangeTheme(value) : null}
            />
          </Paper>
        </div>

        <div className="md-cell md-cell--12">
          <Paper style={{padding:8}}>
            <h4>Legend</h4>
            {(election === 'npe2024' && theme === 'leading') ? legends.leading2024 : legends[theme]}
          </Paper>
        </div>

        <div className="md-cell md-cell--12">
          <Paper style={{padding:8}}>
            <h4>Search</h4>
            <PlaceSearch onSearchResult={onPlaceSearched} />
          </Paper>
        </div>

        <div className="md-cell md-cell--12">
          <Paper style={{padding:8}}>
            <div><small><i>
                Developed by <a href="https://adrianfrith.com/">Adrian Frith</a>; <a href="https://github.com/afrith/election-map-frontend">the code is on GitHub</a>.
                Data from public election result reports.
                This site is not affiliated with the Electoral Commission.
              </i></small></div>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Settings