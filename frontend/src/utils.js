import { SIGNOUT } from "./store/actionTypes/authActionTypes";
import jwtDecode from "jwt-decode";

export const checkTokenExpirationMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;
    if (token && jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.removeItem("userInfo");
      dispatch({ type: SIGNOUT });
      next(action);
    }
    next(action);
  };

export const countGame = (sets) => {
  const scores = ["", ""];
  const points = ["", ""];

  for (let i = 0; i < 5; i++) {
    if (parseInt(sets[i]) > parseInt(sets[i + 5])) {
      scores[0]++;
      points[0]++;
      scores[1] = +scores[1];
      points[1] = +points[1];
    } else if (parseInt(sets[i]) < parseInt(sets[i + 5])) {
      scores[1]++;
      points[1]++;
      scores[0] = +scores[0];
      points[0] = +points[0];
    }
  }

  if (scores[0] === 3) {
    points[0] = 5;
    points[1]++;
  } else if (scores[1] === 3) {
    points[1] = 5;
    points[0]++;
  }
  return { scores, points };
};

export const customizeDate = (date) => {
  const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
};

export const validateGame = (game) => {
  if (game.sets.every((set) => set === null || set === "")) return false;
  if (game.unmatched) return false;
  if (game.points.includes(5) && game.scores.every((score) => score <= 3)) return false;
  return true;
};
