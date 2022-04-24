import axios from 'axios';

const nominatim = async (lon, lat) => {
  try {
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}6&lon=${lon}`);
    return response.data;
  } catch (e) {
    console.error('nominatim', e);
    return {}
  }
};

export default nominatim;