class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _fetch({ path, method, data }) {
    return fetch(`${this._baseUrl}${path}`, {
      method,
      headers: this._generateHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponce);
  }

  _checkResponce = (res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

  _generateHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
  }

  sendCardData = (item) =>
    this._fetch({
      path: "/cards",
      method: "POST",
      data: { name: item.name, link: item.link },
    });

  setUserInfo = ({ name, about }) =>
    this._fetch({ method: "PATCH", path: "/users/me", data: { name, about } });

  getUserInfo = () => this._fetch({ method: "GET", path: "/users/me" });

  getInitialCards = () => this._fetch({ method: "GET", path: "/cards" });

  deleteCard = (data) =>
    this._fetch({ method: "DELETE", path: `/cards/${data._id}`, data });

  handleLike = (cardData, isLiked) =>
    this._fetch({
      method: !isLiked ? "PUT" : "DELETE",
      path: `/cards/${cardData._id}/likes`,
    });

  editProfilePhoto = (data) =>
    this._fetch({ method: "PATCH", path: "/users/me/avatar", data });
}
const api = new Api({
  baseUrl: "https://api.oleg.students.nomoreparties.sbs",
});
export default api;
