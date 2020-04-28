export const initMap = {
  position: {
    center: [52, 16],
    zoom: 8,
    zoomControl: false,
  },
  tileLayer: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    config: {
      detectRetina: true,
      maxZoom: 16,
      minZoom: 2,
      maxNativeZoom: 16,
    },
  },
  urls: {
    mailIcon:
      "https://cdn4.iconfinder.com/data/icons/mail-linefilled/512/email_mail__letter__internet__envelope__chat__navigation_-512.png",
  },
};
