import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import {MAX_PERCENTAGE} from '../../const';
import {SECONDS_IN_MINUTE} from '../../const';

const getDragCoord = (duration, progress) => {
  return progress / duration * MAX_PERCENTAGE;
};

const getRunTime = (duration) => {
  const minutes = Math.floor(duration / SECONDS_IN_MINUTE);
  const seconds = Math.floor(duration - minutes * SECONDS_IN_MINUTE);

  return `${minutes}:${seconds}`;
};

const Controls = ({onExitButtonClick, onPlayButtonClick, isPlaying, onFullScreenButtonClick, duration, progress}) => (
  <Fragment>
    <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={getDragCoord(duration, progress)} max="100"></progress>
          <div className="player__toggler" style={{left: `${getDragCoord(duration, progress)}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{getRunTime(duration)}</div>
      </div>

      <div className="player__controls-row">
        <button type="button" className="player__play" onClick={onPlayButtonClick} >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={isPlaying ? `#pause` : `#play-s`}></use>
          </svg>
          <span>{isPlaying ? `Pause` : `Play`}</span>
        </button>
        <div className="player__name">Transpotting</div>

        <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </Fragment>
);

Controls.propTypes = {
  onExitButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default memo(Controls);
