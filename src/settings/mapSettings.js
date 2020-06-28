export const initMap = {
  tileLayer: {
    url:
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    config: {
      detectRetina: true,
      maxZoom: 16,
      minZoom: 2,
      maxNativeZoom: 16,
      id: "mapbox.outdoors",
      accessToken:
        "pk.eyJ1Ijoic3RpbGxoYXZlbnRmb3VuZCIsImEiOiJjanMwcTJrbnExbTY0NDRvMzh6MnZuMmtxIn0.8LqTOLCbuQtAfCqftXzhyQ",
    },
  },
  urls: {
    mailIcon: "https://www.iconfinder.com/iconsets/mail-linefilled",
  },
};
