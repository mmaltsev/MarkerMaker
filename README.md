# LeafletMapPin
Small service for creating custom Leaflet map pins.

Usage:
```javascript
let iconUrl = LeafletMapPin.pinOutline(color, width, height)
let customIcon = L.Icon({
  iconUrl,
  ...
})
```
