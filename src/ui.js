import React from 'react';
import { Strings } from './defs.js';

export const LoadingScreen = () => {
  return <div className="containter text-center"><p className="lead">טוען...</p></div>;
};

export const ErrorScreen = ({error}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <p>התרחשה שגיאה:</p>
          <p className="lead center">{error}</p>
        </div>
      </div>
    </div>
  );
};

export const InfoScreen = ({info, next}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 infotext">
          {info}
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col text-center">
          <br/>
          <ContinueButton next={next} disabled={false} />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export const ContinueButton = ({next, disabled}) => {
  return disabled ? 
    <button type="button" className="btn btn-primary" onClick={next} disabled>{Strings.continue_text}</button> :
    <button type="button" className="btn btn-primary" onClick={next}>{Strings.continue_text}</button>;
};

/* 4 buttons in a square layout with fixation point in the middle. Each button is assigned a value to be passed to 
   the next function when it's clicked. */
export const ButtonTable = ({labels, values, disabled, next}) => {
  const gen_button = (btn_idx) => {
    if (disabled) 
      return <button className="chordBtn" disabled onClick={(e) => next(values[btn_idx])}>{labels[btn_idx]}</button>;
    else 
      return <button className="chordBtn" onClick={(e) => next(values[btn_idx])}>{labels[btn_idx]}</button>;
  };

  return (
    <table className="chordSelection">
      <tbody>
        <tr>
          <td>{gen_button(0)}</td>
          <td></td>
          <td>{gen_button(1)}</td>
        </tr>
        <tr>
          <td></td>
          <td className="plusSign align-middle">+</td>
          <td></td>
        </tr>
        <tr>
          <td>{gen_button(2)}</td>
          <td></td>
          <td>{gen_button(3)}</td>
        </tr>
      </tbody>
    </table>   
  );
};
