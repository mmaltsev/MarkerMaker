# MarkerMaker
Small service for outlining map pins via HTML5 Canvas.

Especially useful for creating custom [Leaflet](http://leafletjs.com/) markers.

Fill free to try out the [demo](https://mmaltsev.github.io/MarkerMaker/example/) and go through the [documentation](https://mmaltsev.github.io/MarkerMaker/docs/).

## Setup
```
npm install marker-maker --save
```
```javascript
import * as MarkerMaker from 'marker-maker'
let iconUrl = MarkerMaker(color, width, height)
```
or simply add to your HTML file the following code:
```html
<script src="https://cdn.rawgit.com/mmaltsev/MarkerMaker/2674a03d/dist/marker-maker.min.js"></script>
...
<script>
  let iconUrl = markerOutliner(color, width, height)
</script>
```
For a better understanding just go through the [demo code](example/index.html).

## Usage

markerOutliner(color, width, height)

| Variable         | Type    | Description            |
| ----------------- | ------- | ---------------------- |
| color        | string  | color of the pin ([standard](https://www.w3schools.com/colors/colors_names.asp) / HEX / RGB) |
| width         | number  | width of the pin |
| height | number   | height of the pin |

## Example
<img src="example/example.png" width="400" />

## License
MIT License. Copyright (c) 2017 Maxim Maltsev.