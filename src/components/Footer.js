import React from 'react';
import './footer.scss';

export const Footer = () => {
  return(
    <div className="footer">
      <span>You might also be interested in these sites</span>
      <a href="https://jacobbergdahl.com" target="_blank" rel="noreferrer"><button type="button" className="btn rounded">https://jacobbergdahl.com (Svelte)</button></a>
      <a href="https://thisisrealaibook.com/" target="_blank" rel="noreferrer"><button type="button" className="btn rounded margin-top">https://thisisrealaibook.com (Gatsby)</button></a>
      <a href="https://thisisrealai.com/" target="_blank" rel="noreferrer"><button type="button" className="btn rounded margin-top">https://thisisrealai.com (.NET Razor)</button></a>
    </div>
  )
}

export default Footer;