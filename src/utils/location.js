function getCurrentGeoLocationAsync() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    } else {
      reject(new Error());
    }
  });
}

export { getCurrentGeoLocationAsync };
