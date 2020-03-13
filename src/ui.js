import React from 'react';

export const SongHeader = props =>{
  let { songData } = props;
  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2">
        <img className="songImage" src={ songData.imgSrc } alt=""/>
        <div className="songTitleWrapper">
          <span className="songTitle"> שם השיר: </span> 
          <br />
          <span className="songTitle"> { songData.name }</span> 
        </div>
        <div className="clearBoth"></div>
      </div>
    </div>
  );
};
