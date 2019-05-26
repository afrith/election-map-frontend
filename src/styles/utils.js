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
  for (const party in partyColors) {
    styleExpr.push(party)
    styleExpr.push(arrayToStep(ballot, partyColors[party]))
  }
  styleExpr.push(arrayToStep(ballot, otherColors))
  return styleExpr
}