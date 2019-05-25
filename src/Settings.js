import React from 'react'
import { SelectField } from 'react-md'

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
  {value: 'leading', label: 'Leading party'}
]

export default (props) => {
  const { election, ballot, level, theme, onChangeElection, onChangeBallot, onChangeLevel, onChangeTheme } = props
  return (
    <div className="md-grid">
      <div className="md-cell md-cell--12">
        <SelectField
          id="select-election"
          label="Election"
          menuItems={elections}
          fullWidth
          value={election}
          onChange={value => onChangeElection ? onChangeElection(value) : null}
        />
      </div>
      <div className="md-cell md-cell--12">
        <SelectField
          id="select-ballot"
          label="Ballot"
          menuItems={[{value: 'nat', label: 'National'}, {value: 'prov', label: 'Provincial'}]}
          fullWidth
          value={ballot}
          onChange={value => onChangeBallot ? onChangeBallot(value) : null}
        />
      </div>
      <div className="md-cell md-cell--12">
        <SelectField
          id="select-level"
          label="Level of detail"
          menuItems={levels}
          fullWidth
          value={level}
          onChange={value => onChangeLevel ? onChangeLevel(value) : null}
        />
      </div>
      <div className="md-cell md-cell--12">
        <SelectField
          id="select-theme"
          label="Colour scheme"
          menuItems={themes}
          fullWidth
          value={theme}
          onChange={value => onChangeTheme ? onChangeTheme(value) : null}
        />
      </div>
    </div>
  )
}