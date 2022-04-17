import axios from 'axios';

export default class AthletesService {
  List(index, length) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://localhost:8090/api/v1/Athletes?length=${length}&index=${index}`
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Create(athlete) {
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8090/api/v1/Athletes', athlete)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Update(athlete) {
    return new Promise((resolve, reject) => {
      axios
        .put('http://localhost:8090/api/v1/Athletes', athlete)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  Delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:8090/api/v1/Athletes/${id}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}
