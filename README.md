This is the frontend code for the election map which is deployed at https://elections.adrianfrith.com/. The repository for the backend is at https://github.com/afrith/election-map-backend.

## Tech stack

* [React](https://reactjs.org/)
* [create-react-app](https://facebook.github.io/create-react-app/)
* [react-md](http://react-md.mlaursen.com/)
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
* [react-mapbox-gl](http://alex3165.github.io/react-mapbox-gl/)

## Deploying

You need to deploy an instance of [the backend service](https://github.com/afrith/election-map-backend). Set the variable `REACT_APP_API_ROOT` to the root URL of this service in `.env.development` or `.env.production` as appropriate. To run in development with live code reloading, run `yarn start`. To build a minified production version run `yarn build`.