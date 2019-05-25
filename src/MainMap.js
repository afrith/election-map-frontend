import React, { Component } from 'react'
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl'
import { throttle } from 'lodash'
import memoize from 'memoize-one'

import { leadingPartyColor } from './util/styles'

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  hash: true,
  dragRotate: false,
  pitchWithRotate: false,
  touchZoomRotate: false
});

const defaultZoom = [5]
const defaultCenter = [25,-28.5]

export default class MainMap extends Component {
  state = {
    hoverCode: null
  }

  _handleMapMouseMove = throttle((map, event) => {
    const { level, election } = this.props
    const zoom = map.getZoom()

    if ((level === 'vd' && zoom < 8) || (level === 'ward' && zoom < 6)) {
      this.setState({hoverCode: null})
      return
    }

    const layerName = `${level}_${election}_fill`
    if (event.point) {
      const features = map.queryRenderedFeatures(event.point).filter(feature => feature.layer.id === layerName)
      this.setState({hoverCode: features.length > 0 ? features[0].properties.code : null})
    } else {
      this.setState({hoverCode: null})
    }
  }, 25)

  _handleMapClick = (map, event) => {
    const { level, election } = this.props
    const layerName = `${level}_${election}_fill`
    const features = event.point ? map.queryRenderedFeatures(event.point).filter(feature => feature.layer.id === layerName) : []
    if (features.length > 0) {
      console.log(`clicked on ${features[0].properties.code}`)
    } else {
      console.log('clicked on no feature')
    }
  }

  _getSource = memoize(
    (election, level) => (
      <Source
        id={`${level}_${election}`}
        key={`${level}_${election}`}
        tileJsonSource={{
          "type": "vector",
          "tiles": [`http://localhost:4000/${level}_${election}/{z}/{x}/{y}/tile.mvt`],
          "minzoom": 4,
          "maxzoom": 19
        }}
      />
    )
  )

  _getFillLayer = memoize(
    (election, ballot, level) => (
      <Layer
        id={`${level}_${election}_fill`}
        key={`${level}_${election}_fill`}
        type="fill"
        sourceId={`${level}_${election}`}
        sourceLayer={`${level}_${election}`}
        paint={{
          "fill-color": leadingPartyColor(ballot),
          "fill-opacity": 0.5
        }}
      />
    )
  )

  _getLineLayer = memoize(
    (election, level) => (
      <Layer
        id={`${level}_${election}_line`}
        key={`${level}_${election}_line`}
        type="line"
        sourceId={`${level}_${election}`}
        sourceLayer={`${level}_${election}`}
        layout={{
          "line-cap": "butt",
          "line-join": "bevel"
        }}
        paint={{
          "line-color": "rgb(150,150,150)",
          "line-width": 0.5,
          "line-opacity": 1
        }}
      />
    )
  )

  _getHoverLayer = memoize(
    (election, level, hoverCode) => (
      <Layer
        id={`${level}_${election}_hover`}
        key={`${level}_${election}_hover`}
        type="line"
        sourceId={`${level}_${election}`}
        sourceLayer={`${level}_${election}`}
        filter={["==", "code", hoverCode]}
        layout={{
          "line-cap": "butt",
          "line-join": "bevel"
        }}
        paint={{
          "line-color": "rgb(0,0,255)",
          "line-width": 2,
          "line-opacity": 1
        }}
      />
    )
  )

  render () {
    const { election, ballot, level } = this.props
    const { hoverCode } = this.state
    return (
      <div className="map-container">
        <ReactMap
          containerStyle={{height: "100%", width: "100%"}}
          // eslint-disable-next-line react/style-prop-object
          style="mapbox://styles/mapbox/light-v9"
          zoom={defaultZoom} center={defaultCenter}
          onMouseMove={this._handleMapMouseMove}
          onClick={this._handleMapClick}
        >
          {this._getSource(election, level)}
          {this._getFillLayer(election, ballot, level)}
          {this._getLineLayer(election, level)}
          {hoverCode ? this._getHoverLayer(election, level, hoverCode) : null}
        </ReactMap>
      </div>
    )
  }
}