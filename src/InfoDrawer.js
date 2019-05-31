import React, { Component, Fragment } from 'react'
import { Drawer, Toolbar, Button, DataTable, TableHeader, TableBody, TableRow, TableColumn, Paper, CircularProgress } from 'react-md'
import Fetch from 'react-fetch-component'

const partyCompare = (a, b) => {
  if (a.votes !== b.votes) return b.votes - a.votes
  else if (a.name < b.name) return -1
  else if (a.name > b.name) return 1
  else return 0
}

const formatInt = x => Number(x).toLocaleString('en-GB', {
  maximumFractionDigits: 0
});

const formatDec = x => Number(x).toLocaleString('en-GB', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

const formatPerc = x => `${formatDec(x * 100)}%`;

const DrawerContents = props => {
  const { data } = props
  return <Fragment>
    <div className="md-cell md-cell--12">
      <span className="md-title" style={{whiteSpace: 'normal'}}>{data.name}</span> <span className="md-subheading-2">({data.code})</span>
    </div>

    <div className="md-cell md-cell--12">
      <Paper zDepth={1}>
      <DataTable plain responsive>
        <TableBody>
          <TableRow>
            <TableColumn>Registered voters</TableColumn>
            <TableColumn numeric>{formatInt(data.regpop)}</TableColumn>
            <TableColumn numeric></TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Valid votes</TableColumn>
            <TableColumn numeric>{formatInt(data.valid)}</TableColumn>
            <TableColumn numeric>{data.total > 0 && formatPerc(data.valid/data.total)}</TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Spoilt votes</TableColumn>
            <TableColumn numeric>{formatInt(data.spoilt)}</TableColumn>
            <TableColumn numeric>{data.total > 0 && formatPerc(data.spoilt/data.total)}</TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Total votes</TableColumn>
            <TableColumn numeric>{formatInt(data.total)}</TableColumn>
            <TableColumn numeric></TableColumn>
          </TableRow>
          {(data.regpop > 0) && <TableRow>
            <TableColumn>Turnout</TableColumn>
            <TableColumn numeric>{formatPerc(data.total/data.regpop)}</TableColumn>
            <TableColumn numeric></TableColumn>
          </TableRow>}
        </TableBody>
      </DataTable>
      </Paper>
    </div>

    <div className="md-cell md-cell--12">
      <Paper zDepth={1}>
      <DataTable plain responsive>
        <TableHeader>
          <TableRow>
            <TableColumn>Party</TableColumn>
            <TableColumn numeric>Votes</TableColumn>
            <TableColumn numeric>%</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.parties.sort(partyCompare).map(row => (
            <TableRow key={row.abbrev}>
              <TableColumn><abbr title={row.name}>{row.abbrev}</abbr></TableColumn>
              <TableColumn numeric>{formatInt(row.votes)}</TableColumn>
              <TableColumn numeric>{data.valid > 0 ? formatPerc(row.votes/data.valid) : ''}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
      </Paper>
    </div>
  </Fragment>
}

export default class InfoDrawer extends Component {
  _onCloseClick = () => {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  _onVisibilityChange = (willBeVisible) => {
    const { onClose } = this.props
    if (!willBeVisible && onClose) onClose()
  }

  render () {
    const { election, ballot, level, selected } = this.props
    return (
      <Drawer
        visible={!!selected}
        position="right"
        desktopType={Drawer.DrawerTypes.PERSISTENT}
        tabletType={Drawer.DrawerTypes.PERSISTENT}
        mobileType={Drawer.DrawerTypes.TEMPORARY}
        onVisibilityChange={this._onVisibilityChange}
        header={(
          <Toolbar
            nav={<Button icon onClick={this._onCloseClick}>close</Button>}
            title="Details"
            className="md-divider-border md-divider-border--bottom"
          />
        )}
      >
        <div style={{minWidth: 256}} className="md-list--drawer md-grid">          
          {selected && <Fetch url={`${process.env.REACT_APP_API_ROOT}/${election}/${ballot}/${level}/${selected}`}>
            {({ loading, error, data }) => {
              if (loading) return <div className="md-cell md-cell--12"><CircularProgress /></div>
              else if (error) return <div className="md-cell md-cell--12">Error :(</div>
              else return <DrawerContents data={data} />
            }}
          </Fetch>}
        </div>
      </Drawer>
    )
  }
}