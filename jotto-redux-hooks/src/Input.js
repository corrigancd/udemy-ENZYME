import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { guessWord } from './actions';

function Input() {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const dispatch = useDispatch();
  const success = useSelector(state => state.success);

  return (
    <div data-test="input-component">
      <div>You have guessed: {currentGuess}</div>
      {success && (
        <div>Congratulations, you are correct!</div>
      )}

      {!success && (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="Take a guess..."
            value={currentGuess}
            onChange={(event) => setCurrentGuess(event.target.value)}
          ></input>
          <button
            data-test="submit-button"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(guessWord(currentGuess));
              setCurrentGuess("");
            }}
            className="btn btn-primary mb-2"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

Input.propTypes = {
  success: PropTypes.bool.isRequired,
};

export { Input };
