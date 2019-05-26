import React from 'react'

export const partyList = [
  {code: 'anc', abbr: 'ANC', name: 'AFRICAN NATIONAL CONGRESS'},
  {code: 'da', abbr: 'DA', name: 'DEMOCRATIC ALLIANCE'},
  {code: 'eff', abbr: 'EFF', name: 'ECONOMIC FREEDOM FIGHTERS'},
  {code: 'ifp', abbr: 'IFP', name: 'INKATHA FREEDOM PARTY'},
  {code: 'vfplus', abbr: 'VF+', name: 'VRYHEIDSFRONT PLUS'},
]

const partyColors = {
  'anc': ['rgb(247,252,245)','rgb(229,245,224)','rgb(199,233,192)','rgb(161,217,155)','rgb(116,196,118)','rgb(65,171,93)','rgb(35,139,69)','rgb(0,90,50)'],
  'da': ['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,69,148)'],
  'eff': ['rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(153,0,13)'],
  'ifp': ['rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(153,0,13)'],
  'vfplus': ['rgb(255,245,235)','rgb(254,230,206)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(241,105,19)','rgb(217,72,1)','rgb(140,45,4)']
}

export const styleExpression = (ballot, party) => {
  const colors = partyColors[party]
  return [
    'step',
    ['get', `${ballot}_${party.toLowerCase()}`],
    colors[0],
    125, colors[1],
    250, colors[2],
    375, colors[3],
    500, colors[4],
    625, colors[5],
    750, colors[6],
    875, colors[7]
  ]
}

export const legend = (party) => {
  const row = partyList.find(p => p.code === party)
  const colors = partyColors[party].map(x => x.replace(/^rgb\(/, 'rgba(').replace(/\)$/, ',0.5)'))
  return (
    <table className='legendTable' style={{width: '100%'}}>
      <thead>
        <tr>
          <td colSpan={4}><abbr title={row.name}>{row.abbr}</abbr> support</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{textAlign: 'center', backgroundColor: colors[0]}}>0–12.5%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[1]}}>12.5–25%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[2]}}>25–37.5%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[3]}}>37.5–50%</td>
        </tr>
        <tr>
          <td style={{textAlign: 'center', backgroundColor: colors[4]}}>50–62.5%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[5]}}>62.5–75%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[6]}}>75–87.5%</td>
          <td style={{textAlign: 'center', backgroundColor: colors[7]}}>87.5–100%</td>
        </tr>
      </tbody>
    </table>
  )
}