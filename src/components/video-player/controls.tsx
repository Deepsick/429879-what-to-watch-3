import * as React from 'react';

import history from '../../history';
import {MAX_PERCENTAGE, SECONDS_IN_MINUTE} from '../../const';

interface Props {
  isPlaying: boolean;
  duration: number;
  progress: number;
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void;
}

const getDragCoord = (duration, progress) => {
  return duration > 0 && progress / duration * MAX_PERCENTAGE;
};

const getRunTime = (duration, progress) => {
  const leftTime = duration - progress;
  const minutes = Math.floor(leftTime / SECONDS_IN_MINUTE);
  const seconds = Math.floor(leftTime - minutes * SECONDS_IN_MINUTE).toString().padStart(2, `0`);

  return `${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
};

const handleExitButtonClick = (evt) => {
  evt.preventDefault();
  history.goBack();
};

const Controls: React.FunctionComponent<Props> = ({
  onPlayButtonClick,
  isPlaying,
  onFullScreenButtonClick,
  duration,
  progress
}: Props) => (
  <React.Fragment>
    <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={getDragCoord(duration, progress)} max="100"></progress>
          <div className="player__toggler" style={{left: `${getDragCoord(duration, progress)}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{getRunTime(duration, progress)}</div>
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
  </React.Fragment>
);

export default React.memo(Controls);
