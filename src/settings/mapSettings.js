export const initMap = {
  tileLayer: {
    url:
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    config: {
      detectRetina: true,
      maxZoom: 16,
      minZoom: 2,
      maxNativeZoom: 16,
      id: "mapbox/outdoors-v11",
      accessToken:
        "pk.eyJ1Ijoic3RpbGxoYXZlbnRmb3VuZCIsImEiOiJja2xzYjBrd2EwMTk0MnZtd2d3NmF5ejB3In0.18eQuA5ulgyN8ffCFnHVJg",
    },
  },
  urls: {
    mailIcon: "https://www.iconfinder.com/iconsets/mail-linefilled",
  },
};
