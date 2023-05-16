import axios from "axios";
import { MoreHoriz } from "iconoir-react";
import {
  useState,
  useContext,
  ChangeEvent,
  MouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { DataContextLogin } from "../context/Context";
import { getCookie } from "../helpers/getCookie";
import { formatTimeXTime } from "../helpers/formatTime";

export default function CommentPost({
  name,
  image,
  authorCommentId,
  lastName,
  authorPostId,
  commentId,
  date,
  comment,
  postId,
  reloadPost
}: {
  name: string;
  image: string;
  authorCommentId: number;
  lastName: string;
  authorPostId: number;
  commentId: number;
  date: string;
  comment: string;
  postId: number;
  reloadPost: (p : number) => void
}) {
  const [showEditComment, setShowEditComment] = useState(false);
  const [saveCommentUpdate, setSaveCommentUpdate] = useState("");
  const { dataUser } = useContext(DataContextLogin);
  const token = getCookie("token");

  async function sendRemoveComment(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (commentId == null && authorCommentId == null) {
      return alert("No hay parametros para remover el comentario");
    }
    try {
      await axios.delete("http://localhost:3000/delete/comment", {
        data: {
          commentId,
          authorCommentId,
          authorPostId,
        },
        headers: {
          token,
        },
      });
      alert("comentario eliminado correctamente");
      reloadPost(postId)
    } catch (e) {
      alert(e);
    }
  }

  function hanldeChangeComment({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) {
    setSaveCommentUpdate(value);
  }

  async function sendUpdateComment() {
    if (saveCommentUpdate == "") {
      return alert("No puedes enviar comentarios vacios");
    }
    try {
      await axios.put(
        "http://localhost:3000/update/comment",
        {
          commentId,
          comment: saveCommentUpdate,
        },
        {
          headers: {
            token,
          },
        }
      );
      alert("comentario actualizado correctamente");
      reloadPost(postId)
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <div className="comment-secctions">
      <div className="comment-section-image-content">
        <img
          src={`http://localhost:3000/static/images/profiles/${image}`}
          alt={`image profile ${name}`}
        />
      </div>
      <div className="comment-section-name-text">
        <div className="name-profile-and-options">
          <Link to={`/profile/${authorCommentId}`}>
            <h3>{`${name} ${lastName}`}</h3>
          </Link>
          {authorCommentId == dataUser.id || authorPostId == dataUser.id ? (
            <ul className="btn-list-more-options-comment">
              <li>
                <MoreHoriz width={25} height={25} />
                <ul className="list-more-options-comment">
                  {authorCommentId == dataUser.id ? (
                    <li>
                      <button
                        onClick={(e) => {
                          setShowEditComment(true);
                        }}
                      >
                        Editar
                      </button>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <button onClick={sendRemoveComment}>Eliminar</button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <p>{formatTimeXTime(date)}</p>
        {showEditComment ? (
          <div className="edit-comment-container">
            <textarea
              defaultValue={comment}
              onChange={hanldeChangeComment}
            ></textarea>
            <div className="edit-comment-btns">
              <button
                onClick={(e) => {
                  setShowEditComment(false);
                }}
              >
                Cancelar
              </button>
              <button onClick={sendUpdateComment}>Enviar</button>
            </div>
          </div>
        ) : (
          <span>{comment}</span>
        )}
      </div>
    </div>
  );
}
