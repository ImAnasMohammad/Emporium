import React from 'react';

const ProgressStatusBar = ({status,progressItems}) => {
  return (
    <div className="progress-bar-wrapper">
        <div className="progress-bar-line">
            <div className="progress-items">
                {
                  progressItems?.map((item,index)=><span key={index} className={`${status>index && 'activated'}`}>{item}</span>)
                }
            </div>
            <div className="completedProgressBar" style={{width:`${(progressItems.length-status)*100/progressItems.length}%`}}></div>
        </div>
    </div>
  )
}

export default ProgressStatusBar
