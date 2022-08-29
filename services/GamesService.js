import axios from 'axios';

const basePath = `${process.env.API_BASE_URL}/api/v1/Games`;

export default class AthletesService {
  List(index, length) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${basePath}?length=${length}&index=${index}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Find(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${basePath}/${id}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Create(game) {
    return new Promise((resolve, reject) => {
      axios
        .post(basePath, game)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Update(game) {
    return new Promise((resolve, reject) => {
      axios
        .put(basePath, game)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  AddAthlete(gameId, athleteId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${basePath}/${gameId}/athletes/${athleteId}`)
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
