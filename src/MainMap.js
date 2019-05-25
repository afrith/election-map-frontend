import React, { Component } from 'react'
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl'
import { throttle } from 'lodash'

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

const source = (
  <Source
    id="vdistrict"
    tileJsonSource={{
      "type": "vector",
      "tiles": [`http://localhost:4000/vd_2019/{z}/{x}/{y}/tile.mvt`],
      "minzoom": 0,
      "maxzoom": 19
    }}
    geoJSONSourceOptions={{ generateId: true }}
  />)
  
const layers = [
  <Layer
    id="structure-fill"
    key="structure-fill"
    type="fill"
    sourceId="vdistrict"
    sourceLayer="vd_2019"
    paint={{
      "fill-color": leadingPartyColor('nat'),
      "fill-opacity": ["case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.5
      ]
    }}
  />,
  <Layer
    id="structure-line"
    key="structure-line"
    type="line"
    sourceId="vdistrict"
    sourceLayer="vd_2019"
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
]

export default class MainMap extends Component {
  state = {
    hoverCode: null
  }

  _handleMapMouseMove = throttle((map, event) => {
    if (map.getZoom() >= 8 && event.point) {
      const features = map.queryRenderedFeatures(event.point).filter(feature => feature.layer.id === 'structure-fill')
      this.setState({hoverCode: features.length > 0 ? features[0].properties.code : null})
    } else {
      this.setState({hoverCode: null})
    }
  }, 25)

  _handleMapClick = (map, event) => {
    const features = event.point ? map.queryRenderedFeatures(event.point).filter(feature => feature.layer.id === 'structure-fill') : []
    if (features.length > 0) {
      console.log(`clicked on ${features[0].properties.code}`)
    } else {
      console.log('clicked on no feature')
    }
  }

  render () {
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
          {source}
          {layers}
          <Layer
            id="hover-line"
            key="hover-line"
            type="line"
            sourceId="vdistrict"
            sourceLayer="vd_2019"
            filter={["==", "code", hoverCode || 'dummy']}
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
        </ReactMap>
      </div>
    )
  }
}