/*
    Fixed background gradient. By having the background gradient be contained in its own div,
    we ensure that the background gradient doesn't awkwardly jump as the list of candidates
    change in size. 
*/

import React from 'react';
import './background.scss';

export const Background = () => {
  return <div className="background"></div>
}

export default Background;