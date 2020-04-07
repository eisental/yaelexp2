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
