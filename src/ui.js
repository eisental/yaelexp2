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

export const Button = ({label, onClick, disabled, className}) => {
  const classNameStr = className ? "btn " + className : "btn btn-primary";

  return disabled ? 
    <button type="button" className={classNameStr} onClick={onClick} disabled>{label}</button> :
    <button type="button" className={classNameStr} onClick={onClick}>{label}</button>;
};

export const ContinueButton = ({next, disabled, className}) => {
  return <Button label={Strings.continue_text} onClick={next} disabled={disabled} className={className} />;
};

export const ReplayButton = ({onClick, disabled}) => {
  const label = <img src="static_images/speaker.png" />;
  return <Button label={label} disabled={disabled} onClick={onClick} className="btn-basic btn-replay" />;
};

/* 4 buttons in a square layout with fixation point in the middle. Each button is assigned a value to be passed to 
   the next function when it's clicked. */
export const ButtonTable = ({labels, values, disabled, next, highlight, no_interaction}) => {
  const gen_button = (btn_idx) => {
    const className="chordBtn" + (no_interaction ? " no_interaction" : "")
      + (highlight===btn_idx ? " highlight" : "");

    const onClick = (no_interaction ? null : (e) => next(values[btn_idx]));

    if (disabled) 
      return <button className={className} disabled onClick={onClick}>{labels[btn_idx]}</button>;
    else 
      return <button className={className} onClick={onClick}>{labels[btn_idx]}</button>;
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

export const ComboBox = ({id, options}) => {
  return (
    <select id={id} name={id} defaultValue="-">
      <option hidden disabled value="-"></option>
      {options.map(opt => <option value={opt} key={opt}>{opt}</option>)}
    </select>
  );
};
