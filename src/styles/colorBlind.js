import { buildLeadingPartyExpression, buildLeadingPartyLegend } from './utils'

const partyColors = [
  {abbr: 'ANC', colors: ['rgb(199, 233, 192)', 'rgb(161, 217, 155)', 'rgb(116, 196, 118)', 'rgb(65, 171, 93)', 'rgb(35, 139, 69)', 'rgb(0, 90, 50)']},
  {abbr: 'DA', colors: ['rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)']}
]

const otherColors = ['rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)']

export const styleExpression = (ballot) => buildLeadingPartyExpression(ballot, partyColors, otherColors)

export const legend = buildLeadingPartyLegend(partyColors, otherColors)