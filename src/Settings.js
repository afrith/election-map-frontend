import React from 'react'
import { SelectField, Paper } from 'react-md'

import { legend as leadingParty } from './styles/leadingParty'
import { legend as colorBlind } from './styles/colorBlind'
import { legend as partySupport, partyList } from './styles/partySupport'
import { legend as turnout } from './styles/turnout'

import PlaceSearch from './PlaceSearch'

const electionTypes = {
  lge: {ballots: [{value: 'pr', label: 'PR'}, {value: 'ward', label: 'Ward'}]},
  npe: {ballots: [{value: 'nat', label: 'National'}, {value: 'prov', label: 'Provincial'}]}
}

const elections = [
  {value: 'lge2021', label: 'LGE 2021'},
  {value: 'npe2019', label: 'NPE 2019'},
  {value: 'lge2016', label: 'LGE 2016'},
  {value: 'npe2014', label: 'NPE 2014'},
  {value: 'lge2011', label: 'LGE 2011'},
  {value: 'npe2009', label: 'NPE 2009'},
  {value: 'lge2006', label: 'LGE 2006'},
  {value: 'npe2004', label: 'NPE 2004'},
  {value: 'lge2000', label: 'LGE 2000'}
]

const levels = [
  {value: 'prov', label: 'Province'},
  {value: 'dist', label: 'District council'},
  {value: 'muni', label: 'Municipality'},
  {value: 'ward', label: 'Ward'},
  {value: 'vd', label: 'Voting district'}
]

const themes = [
  {value: 'leading', label: 'Leading party'},
  {value: 'leading-cb', label: 'Leading party, color blind friendly'},
  {value: 'turnout', label: 'Turnout'}
]
themes.push(...partyList.map(row => ({value: `${row.code}-support`, label: `${row.abbr} support`})))

const legends = {
  'leading': leadingParty,
  'leading-cb': colorBlind,
  'turnout': turnout
}
partyList.forEach(row => {legends[`${row.code}-support`] = partySupport(row.code)})



const Settings = (props) => {
  const { election, ballot, level, theme, onChangeElection, onChangeBallot, onChangeLevel, onChangeTheme, onPlaceSearched } = props

  const handleChangeElection = election => {
    const etype = election.substr(0, 3)
    const newBallot = electionTypes[etype].ballots.some(element => element.value === ballot) ? ballot : electionTypes[etype].ballots[0].value
    if (onChangeElection) onChangeElection(election, newBallot)
  }

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
              menuItems={electionTypes[election.substr(0,3)].ballots}
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
            {legends[theme]}
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