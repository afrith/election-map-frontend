import React from 'react'

export const partyList = [
  {code: 'anc', abbr: 'ANC', name: 'AFRICAN NATIONAL CONGRESS'},
  {code: 'da', abbr: 'DA', name: 'DEMOCRATIC ALLIANCE'},
  {code: 'eff', abbr: 'EFF', name: 'ECONOMIC FREEDOM FIGHTERS'},
  {code: 'ifp', abbr: 'IFP', name: 'INKATHA FREEDOM PARTY'},
  {code: 'vfplus', abbr: 'VF+', name: 'VRYHEIDSFRONT PLUS'},
]

const partyColors = {
  'anc': ['rgb(255,255,255)','rgb(247,252,245)','rgb(229,245,224)','rgb(199,233,192)','rgb(161,217,155)','rgb(116,196,118)','rgb(65,171,93)','rgb(35,139,69)','rgb(0,109,44)','rgb(0,68,27)'],
  'da': ['rgb(255,255,255)','rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)'],
  'eff': ['rgb(255,255,255)','rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'],
  'ifp': ['rgb(255,255,255)','rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'],
  'vfplus': ['rgb(255,255,255)','rgb(255,245,235)','rgb(254,230,206)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(241,105,19)','rgb(217,72,1)','rgb(166,54,3)','rgb(127,39,4)']
}

export const styleExpression = (ballot, party) => {
  const colors = partyColors[party]
  return [
    'step',
    ['get', `${ballot}_${party.toLowerCase()}`],
    colors[0],
    10, colors[1],
    20, colors[2],
    30, colors[3],
    40, colors[4],
    50, colors[5],
    60, colors[6],
    70, colors[7],
    80, colors[8],
    90, colors[9]
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
          <td style={{width: '30px', backgroundColor: colors[0]}}></td>
          <td>0&ndash;10%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[1]}}></td>
          <td>10&ndash;20%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[2]}}></td>
          <td>20&ndash;30%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[3]}}></td>
          <td>30&ndash;40%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[4]}}></td>
          <td>40&ndash;50%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[5]}}></td>
          <td>50&ndash;60%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[6]}}></td>
          <td>60&ndash;70%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[7]}}></td>
          <td>70&ndash;80%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[8]}}></td>
          <td>80&ndash;90%</td>
        </tr>
        <tr>
          <td style={{width: '30px', backgroundColor: colors[9]}}></td>
          <td>90&ndash;100%</td>
        </tr>
        
      </tbody>
    </table>
  )
}