# MarkerMaker
Small service for outlining map pins via HTML5 Canvas.

Especially useful for creating custom [Leaflet](http://leafletjs.com/) markers.

Fill free to try out the [demo](https://mmaltsev.github.io/MarkerMaker/example/) and go through the [documentation](https://mmaltsev.github.io/MarkerMaker/docs/).

## Setup
```
npm install marker-maker --save
```
```javascript
import * as markerOutliner from 'marker-maker'
```
or simply add to your HTML file the following code:
```html
<script src="https://cdn.rawgit.com/mmaltsev/MarkerMaker/7c945bde/dist/main.js"></script>
```

## Usage
```javascript
let iconUrl = markerOutliner(color, width, height, markerType)
```
For a better understanding just go through the [demo code](example/index.html).

## Options

markerOutliner(color, width, height, markerType)

| Variable         | Type    | Description            |
| ----------------- | ------- | ---------------------- |
| color        | string  | color of the pin ([standard](https://www.w3schools.com/colors/colors_names.asp) / HEX / RGB) |
| width         | number  | width of the pin |
| height | number   | height of the pin |
| markerType | string   | pin / house (optional, 'pin' by default) |

## Example
<img src="example/example.png" width="400" />

## License
MIT License. Copyright (c) 2017 Maxim Maltsev.