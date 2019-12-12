import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dashboard from '../common/Dashboard';
import { YellowButton } from '../common/Buttons';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  user-select: none;
`;

const ButtonContainer = styled.div`
  right: 0;
  position: absolute;
  margin: 1rem;

  button {
    font-size: 1rem;
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    button {
      font-size: 2rem;
    }
  }
`;

function HostGameResult({ ranking }) {
  function exit() {
    window.location.href = 'host/room/select';
  }

  return (
    <Background>
      <ButtonContainer>
        <YellowButton onClick={exit}>나가기</YellowButton>
      </ButtonContainer>
      <Dashboard ranking={ranking} />
    </Background>
  );
}

HostGameResult.defaultProps = {
  ranking: [],
};

HostGameResult.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object),
};

export default HostGameResult;
