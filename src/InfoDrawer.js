import React, { Component } from 'react'
import { Drawer, Toolbar, Button } from 'react-md'

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
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            {election} {ballot} {level} {selected}
          </div>
        </div>
      </Drawer>
    )
  }
}