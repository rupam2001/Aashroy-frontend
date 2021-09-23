const reverseGeocode = async (coordinates) => {
  try {
    console.log("Trying RGC");
    let url = new URL(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`
    );
    let params = {
      types: "locality",
      access_token:
        "pk.eyJ1IjoicmctNDA0IiwiYSI6ImNrczk5eG8yZzF1dmgydnBoZWgwNjZzZ2QifQ.hrxTaZwJoKGMxstCagV5zw",
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const reponseJSON = await response.json();
    return reponseJSON.features[0].place_name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export { reverseGeocode };
