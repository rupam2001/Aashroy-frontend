import { ENDPOINT } from "../constants/global.constants";

async function getNGOAsync({ id }) {
  try {
    const res = await fetch(ENDPOINT + "/ngo/public/get/" + id, {
      method: "GET",
    }).then((r) => r.json());

    return res;
  } catch (error) {
    return { ngo: null };
  }
}

async function getNGOSAsync({ name, skip, limit }) {
  try {
    const res = await fetch(
      ENDPOINT + "/ngo/public/getList/" + name + "/" + skip + "/" + limit,
      {
        method: "GET",
      }
    ).then((r) => r.json());

    return res;
  } catch (error) {
    return { ngo: null };
  }
}

export { getNGOAsync, getNGOSAsync };
