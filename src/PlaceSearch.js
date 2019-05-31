import React, { Component } from 'react'
import { TextField, Button } from 'react-md'
import queryString from 'query-string'

export default class PlaceSearch extends Component {
  state = {
    searchText: '',
    searching: false,
    error: null
  }

  handleChange = searchText => {
    this.setState({searchText, error: null})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { onSearchResult } = this.props
    const { searchText } = this.state

    this.setState({searching: true, error: null})

    const params = {
      q: searchText,
      countrycodes: 'za',
      format: 'json'
    }

    fetch('https://nominatim.openstreetmap.org/search?' + queryString.stringify(params))
      .then(response => {
        if (!response.ok) throw new Error('Request failed: ' + response.statusText)
        return response.json()
      })
      .then(data => {
        if (data.length === 0) throw new Error('No results found')
        this.setState({ searching: false })
        if (onSearchResult) {
          const result = data[0]
          onSearchResult({
            coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
            boundingBox: [
              [parseFloat(result.boundingbox[2]), parseFloat(result.boundingbox[0])],
              [parseFloat(result.boundingbox[3]), parseFloat(result.boundingbox[1])]
            ]
          })
        }
      })
      .catch(err => { 
        this.setState({ searching: false, error: err.message })
      })
  }

  render () {
    const { searchText, searching, error } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="placeSearch"
          placeholder="Search for a place"
          inlineIndicator={<Button
            icon
            type="submit"
            className="text-fields__inline-btn"
            disabled={searching || searchText.length === 0}>
              {searching ? 'refresh': 'search'}
            </Button>}
          value={searchText}
          disabled={searching}
          onChange={this.handleChange}
          error={!!error}
          errorText={error}
        />
      </form>
    )
  }
}