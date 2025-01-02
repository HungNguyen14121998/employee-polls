import { SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, aciton) {
  switch (aciton.type) {
    case SET_AUTHED_USER:
      return aciton.id;
    default:
      return state;
  }
}
