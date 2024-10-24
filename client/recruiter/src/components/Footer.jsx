import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footerHolder'></div>
        <div class='footerContainer'>
          <div class='ThelogoContainer'>
              <div className="logo" style={{display: 'flex', flexDirection: 'row', gap: '2vh', fontWeight: 'bold', fontSize: '4vh', justifyItems: 'center', alignItems: 'center'}}>
              <img src="/imgs/logoWhite.svg" alt="InternHub" style={{width: '6vh', height: '6vh'}} />
              <div style={{color: '#ffffff'}}>InternHub</div>
              </div>
            <p>Your go-to platform for<br /> finding the best jobs.</p>
            <ul>
              <li><img src="/imgs/SocialMedia/Facebook.svg" /></li>
              <li><img src="/imgs/SocialMedia/Instagram.svg" /></li>
              <li><img src="/imgs/SocialMedia/LinkedIn.svg" /></li>
              <li> <img src="/imgs/SocialMedia/Twitter.svg" /></li>
              <li><img src="/imgs/SocialMedia/YouTube.svg" /></li>
            </ul>
          </div>
          <div className="custFlex2">
            <div>Contact Us</div>
          <div class="footerContacts">
            <p class="footerGreen"></p>
            <span>
              <span>
                <img src="/imgs/Contacts/Email.svg" />
              </span>
              <span>internhub@somaiya.com</span>
            </span>
            <span>
              <span>
                <img src="/imgs/Contacts/Phone.svg" />
              </span>
              <span>+91 90876 54321</span>
            </span>
            <span>
              <span>
                <img src="/imgs/Contacts/Mark.svg" />
              </span>
              <span>KJSCE, Somaiya Vidyavihaar University, Mumbai, 400067</span>
            </span>
          </div>
          </div>
          </div>
    </footer>
  );
};

export default Footer;
