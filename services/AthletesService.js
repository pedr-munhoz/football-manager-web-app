import axios from 'axios';

const basePath = `${process.env.config.apiBaseUrl}/api/v1/Athletes`;

export default class AthletesService {
  List(index, length) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${basePath}?length=${length}&index=${index}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Create(athlete) {
    return new Promise((resolve, reject) => {
      axios
        .post(basePath, athlete)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Update(athlete) {
    return new Promise((resolve, reject) => {
      axios
        .put(basePath, athlete)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${basePath}/${id}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}
