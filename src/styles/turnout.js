import React from 'react'

const colors = ['rgb(242,240,247)','rgb(218,218,235)','rgb(188,189,220)','rgb(158,154,200)','rgb(117,107,177)','rgb(84,39,143)']

export const styleExpression = (ballot) => {
  return [
    'step',
    ['get', `${ballot}_turnout`],
    colors[0],
    20, colors[1],
    40, colors[2],
    60, colors[3],
    80, colors[4],
    100, colors[5]
  ]
}

const transpColors = colors.map(x => x.replace(/^rgb\(/, 'rgba(').replace(/\)$/, ',0.5)'))

export const legend = (
  <table className='legendTable' style={{width: '100%'}}>
    <thead>
      <tr>
        <td colSpan={2}>Turnout</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[0]}}></td>
        <td>0&ndash;20%</td>
      </tr>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[1]}}></td>
        <td>20&ndash;40%</td>
      </tr>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[2]}}></td>
        <td>40&ndash;60%</td>
      </tr>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[3]}}></td>
        <td>60&ndash;80%</td>
      </tr>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[4]}}></td>
        <td>80&ndash;100%</td>
      </tr>
      <tr>
        <td style={{width: '30px', backgroundColor: transpColors[5]}}></td>
        <td>&gt;100%  *</td>
      </tr>
      <tr>
        <td colSpan={2}>* <i>Note that turnout can exceed 100% because voters may vote at a voting station other than the one where they are registered.</i></td>
      </tr>
    </tbody>
  </table>
)