import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>
      <div className="container">
        <p className="copyright">© 2025 Xuan. All rights reserved.</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  box-shadow: 0 -1px 5px #ccc;

  & .container {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  & .copyright {
    text-align: center;
  }
`;
