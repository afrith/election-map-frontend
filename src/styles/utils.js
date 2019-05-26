import React from 'react'

const arrayToStep = (ballot, array) => ([
  'step',
  ['get', `${ballot}_win_perc`],
  array[0],
  50, array[1],
  60, array[2],
  70, array[3],
  80, array[4],
  90, array[5]
])

export const buildLeadingPartyExpression = (ballot, partyColors, otherColors) => {
  const styleExpr = [
    'match',
    ['get', `${ballot}_win_party`]
  ]
  for (const row of partyColors) {
    styleExpr.push(row.abbr)
    styleExpr.push(arrayToStep(ballot, row.colors))
  }
  styleExpr.push(arrayToStep(ballot, otherColors))
  return styleExpr
}

const makeRow = (rowData) => (
  <tr key={rowData.abbr}>
    <td>{rowData.name ? <abbr title={rowData.name}>{rowData.displayAbbr || rowData.abbr}</abbr> : (rowData.displayAbbr || rowData.abbr)}</td>
    {rowData.colors.map((color, idx) => <td key={idx} style={{backgroundColor: color, opacity: 0.5}}></td>)}
  </tr>
)

export const buildLeadingPartyLegend = (partyColors, otherColors) => {
  return (
    <table className='legendTable' style={{width: '100%'}}>
      <thead>
        <tr>
          <td></td>
          <td>&lt;50%</td>
          <td>&lt;60%</td>
          <td>&lt;70%</td>
          <td>&lt;80%</td>
          <td>&lt;90%</td>
          <td>&gt;90%</td>
        </tr>
      </thead>
      <tbody>
        {partyColors.map(makeRow)}
        {makeRow({abbr: 'Other', colors: otherColors})}
      </tbody>
    </table>
  )
}