import { buildLeadingPartyExpression, buildLeadingPartyLegend } from './utils'

const partyColors = [
  {abbr: 'ANC', name: 'AFRICAN NATIONAL CONGRESS', colors: ['rgb(199, 233, 192)', 'rgb(161, 217, 155)', 'rgb(116, 196, 118)', 'rgb(65, 171, 93)', 'rgb(35, 139, 69)', 'rgb(0, 90, 50)']},
  {abbr: 'DA', name: 'DEMOCRATIC ALLIANCE', colors: ['rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,69,148)']},
  {abbr: 'EFF', name: 'ECONOMIC FREEDOM FIGHTERS', colors: ['rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(74,20,134)']},
  {abbr: 'IFP', name: 'INKATHA FREEDOM PARTY', colors: ['rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)']},
  {abbr: 'M.K.', displayAbbr: 'MKP', name: 'UMKHONTO WESIZWE', colors: ['rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(140,45,4)']}
]

const otherColors = ['rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)']

export const styleExpression = (ballot) => buildLeadingPartyExpression(ballot, partyColors, otherColors)

export const legend = buildLeadingPartyLegend(partyColors, otherColors)