import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isDetailsModalShowing, setIsDetailsModalShowing] = useState(false);
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);
  const [isAcceptModalShowing, setIsAcceptModalShowing] = useState(false);
  const [isRejectModalShowing, setIsRejectModalShowing] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [mainCommnetID, setMainCommnetID] = useState(null);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comments) => setAllComments(comments));
  };

  const hideDetailsModal = () => {
    setIsDetailsModalShowing(false);
  };

  const deleteCancelAction = () => {
    console.log("cancel");
    setIsDeleteModalShowing(false);
  };

  const deleteSubmitAction = () => {
    fetch(`http://localhost:8000/api/comments/${mainCommnetID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsDeleteModalShowing(false);
        getAllComments();
      });
  };

  const acceptCommentSubmitAction = () => {
    fetch(`http://localhost:8000/api/comments/accept/${mainCommnetID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsAcceptModalShowing(false);
        getAllComments();
      });
  };

  const acceptCommentCancelAction = () => {
    setIsAcceptModalShowing(false);
  };

  const rejectCommentSubmitAction = () => {
    fetch(`http://localhost:8000/api/comments/reject/${mainCommnetID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsRejectModalShowing(false);
        getAllComments();
      });
  };

  const rejectCommentCancelAction = () => {
    setIsRejectModalShowing(false);
  };

  const editSubmitAction = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/comments/${mainCommnetID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsEditModalShowing(false);
        getAllComments();
      });
  };

  const editCancelAction = () => {
    setIsEditModalShowing(false);
  };

  return (
    <div>
      {allComments.length ? (
        <>
          <h1 className="cms-title">?????????? ????</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>?????? ??????????</th>
                <th>??????????</th>
                <th>??????????</th>
                <th>??????????</th>
                <th>????????</th>
              </tr>
            </thead>
            <tbody>
              {[...allComments].reverse().map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsDetailsModalShowing(true);
                        setMainCommentBody(comment.body);
                      }}
                    >
                      ???????? ??????
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsDeleteModalShowing(true);
                        setMainCommnetID(comment.id);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      className="cms-table__btn"
                      onClick={() => {
                        setIsEditModalShowing(true);
                        setMainCommentBody(comment.body);
                        setMainCommnetID(comment.id);
                      }}
                    >
                      ????????????
                    </button>
                    {comment.isAccept ? (
                      <button
                        className="cms-table__btn"
                        onClick={() => {
                          setIsRejectModalShowing(true);
                          setMainCommnetID(comment.id);
                        }}
                      >
                        ????
                      </button>
                    ) : (
                      <button
                        className="cms-table__btn"
                        onClick={() => {
                          setIsAcceptModalShowing(true);
                          setMainCommnetID(comment.id);
                        }}
                      >
                        ??????????
                      </button>
                    )}
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
          <p className="details-modal__text">{mainCommentBody}</p>
        </DetailsModal>
      )}

      {isDeleteModalShowing && (
        <DeleteModal
          onSubmit={deleteSubmitAction}
          onCancel={deleteCancelAction}
          title="?????? ???? ?????? ?????? ?????????? ?????????????? ????????????"
        />
      )}

      {isEditModalShowing && (
        <EditModal onSubmit={editSubmitAction} onHide={editCancelAction}>
          <textarea
            className="edit-modal__textarea"
            value={mainCommentBody}
            onChange={(e) => setMainCommentBody(e.target.value)}
          ></textarea>
        </EditModal>
      )}

      {isAcceptModalShowing && (
        <DeleteModal
          title="?????? ???? ?????????? ?????? ?????????? ?????????????? ????????????"
          onSubmit={acceptCommentSubmitAction}
          onCancel={acceptCommentCancelAction}
        />
      )}

      {isRejectModalShowing && (
        <DeleteModal
          title="?????? ???? ???? ?????? ?????????? ?????????????? ????????????"
          onSubmit={rejectCommentSubmitAction}
          onCancel={rejectCommentCancelAction}
        />
      )}
    </div>
  );
}
