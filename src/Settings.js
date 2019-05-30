import React from 'react'
import { SelectField, Paper } from 'react-md'

import { legend as leadingParty } from './styles/leadingParty'
import { legend as colorBlind } from './styles/colorBlind'
import { legend as partySupport, partyList } from './styles/partySupport'
import { legend as turnout } from './styles/turnout'

import PlaceSearch from './PlaceSearch'

const elections = [
  {value: 'npe2019', label: 'NPE 2019'},
  {value: 'npe2014', label: 'NPE 2014'},
  {value: 'npe2009', label: 'NPE 2009'},
  {value: 'npe2004', label: 'NPE 2004'}
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
  return (
    <div className="md-grid md-list--drawer">
      <div className="md-cell md-cell--12">
        <SelectField
          id="select-election"
          label="Election"
          menuItems={elections}
          fullWidth
          value={election}
          onChange={value => onChangeElection ? onChangeElection(value) : null}
        />

        <SelectField
          id="select-ballot"
          label="Ballot"
          menuItems={[{value: 'nat', label: 'National'}, {value: 'prov', label: 'Provincial'}]}
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
    </div>
  )
}

export default Settings