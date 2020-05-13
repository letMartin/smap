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
    mailIcon:
      "https://cdn4.iconfinder.com/data/icons/mail-linefilled/512/email_mail__letter__internet__envelope__chat__navigation_-512.png",
    deviceIcon:
      "https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-02-512.png",
  },
};
