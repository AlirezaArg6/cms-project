import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);
  const [isDetailsModalShowing, setIsDetailsModalShowing] = useState(false);
  const [mainUserID, setMainUserID] = useState(null);
  const [mainUserInfos, setMainUserInfos] = useState({});

  const [userNewFirsname, setUserNewFirsname] = useState("");
  const [userNewLastname, setUserNewLastname] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");
  const [userNewScore, setUserNewScore] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  };

  const deleteSubmitAction = () => {
    fetch(`http://localhost:8000/api/users/${mainUserID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsDeleteModalShowing(false);
        getAllUsers();
      });
  };

  const deleteCancelAction = () => {
    setIsDeleteModalShowing(false);
  };

  const hideEditModal = () => {
    setIsEditModalShowing(false);
  };

  const editSubmitAction = (e) => {
    e.preventDefault();

    const userNewInfos = {
      firsname: userNewFirsname,
      lastname: userNewLastname,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };

    fetch(`http://localhost:8000/api/users/${mainUserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsEditModalShowing(false);
        getAllUsers();
      });
  };

  const hideDetailsModal = () => {
    setIsDetailsModalShowing(false);
  };

  return (
    <div>
      {users.length ? (
        <>
          <h1 className="cms-title">?????????? ????</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>?????? ?? ?????? ????????????????</th>
                <th>?????? ????????????</th>
                <th>?????????? ????????</th>
                <th>??????????</th>
              </tr>
            </thead>
            <tbody>
              {[...users].reverse().map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firsname} {user.lastname}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsDetailsModalShowing(true);
                        setMainUserInfos(user);
                      }}
                    >
                      ????????????
                    </button>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsDeleteModalShowing(true);
                        setMainUserID(user.id);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsEditModalShowing(true);
                        setMainUserID(user.id);
                        setUserNewFirsname(user.firsname);
                        setUserNewLastname(user.lastname);
                        setUserNewUsername(user.username);
                        setUserNewPassword(user.password);
                        setUserNewPhone(user.phone);
                        setUserNewCity(user.city);
                        setUserNewEmail(user.email);
                        setUserNewAddress(user.address);
                        setUserNewScore(user.score);
                        setUserNewBuy(user.buy);
                      }}
                    >
                      ????????????
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <ErrorBox msg={"?????? ???????????? ???????? ??????"} />
      )}

      {isDetailsModalShowing && (
        <DetailsModal onHide={hideDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>??????</th>
                <th>????????</th>
                <th>????????????</th>
                <th>?????????? ????????</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>{mainUserInfos.buy.toLocaleString()} ??????????</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      {isDeleteModalShowing && (
        <DeleteModal
          title="?????? ???? ?????? ?????? ?????????? ?????????????? ????????????"
          onCancel={deleteCancelAction}
          onSubmit={deleteSubmitAction}
        ></DeleteModal>
      )}

      {isEditModalShowing && (
        <EditModal onHide={hideEditModal} onSubmit={editSubmitAction}>
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????? ???? ???????? ????????..."
            value={userNewFirsname}
            onChange={(e) => setUserNewFirsname(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????????????? ???????? ???? ???????? ????????..."
            value={userNewLastname}
            onChange={(e) => setUserNewLastname(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????????? ???????? ???? ???????? ????????..."
            value={userNewUsername}
            onChange={(e) => setUserNewUsername(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????? ???? ???????? ????????..."
            value={userNewPassword}
            onChange={(e) => setUserNewPassword(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????????? ???????? ???????? ???? ???????? ????????..."
            value={userNewPhone}
            onChange={(e) => setUserNewPhone(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????? ???????? ???? ???????? ????????..."
            value={userNewCity}
            onChange={(e) => setUserNewCity(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="??????????  ???????? ???? ???????? ????????..."
            value={userNewEmail}
            onChange={(e) => setUserNewEmail(e.target.value)}
          />{" "}
          <input
            type="text"
            className="edit-modal__input"
            placeholder="????????  ???????? ???? ???????? ????????..."
            value={userNewAddress}
            onChange={(e) => setUserNewAddress(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="?????????? ????????  ???????? ???? ???????? ????????..."
            value={userNewBuy}
            onChange={(e) => setUserNewBuy(e.target.value)}
          />
          <input
            type="text"
            className="edit-modal__input"
            placeholder="????????????  ???????? ???? ???????? ????????..."
            value={userNewScore}
            onChange={(e) => setUserNewScore(e.target.value)}
          />
        </EditModal>
      )}
    </div>
  );
}
