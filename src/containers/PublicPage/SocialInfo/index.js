import React from 'react';

import Wrapper from './Wrapper';

function SocialInfo() {
  return (
    <Wrapper>
      <div className="info-wrapper">
        <img role="presentation" />
        <div className="title">
          <p className="name">Spotify</p>
          <p className="site">www.spotify.com</p>
        </div>
      </div>
      <div className="caption">
          Lorem ipsum fermentum tempor turpis porta Suspendisse magna torquent lectus. Imperdiet luctus Suspendisse in tincidunt interdum.

Congue ante. Suspendisse urna quam. Imperdiet nec taciti lorem, felis nec malesuada urna.
        </div>
    </Wrapper>
  );
}

export default SocialInfo;
