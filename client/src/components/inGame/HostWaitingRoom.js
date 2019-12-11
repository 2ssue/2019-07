import React, { useContext } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../common/Header';
import { YellowButton } from '../common/Buttons';
import { HostGameAction, HostGameContext } from '../../reducer/hostGameReducer';

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 4rem;
  width: 7rem;
`;

const RoomInformation = styled.div`
  @media (min-width: 700px) {
    width: auto;
    font-size: 3rem;
  }
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  width: 10rem;
  color: ${colors.TEXT_WHITE};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  padding: 3rem;
  overflow: hidden;
`;

const PlayerCounter = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};
`;

const PlayerList = styled.ul`
  background-color: white;
  flex: 1;
  overflow-y: auto;
  li {
    display: inline-block;
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.TEXT_BLACK};
  }
`;

function HostWaitingRoom() {
  const { roomState, dispatcher } = useContext(HostGameContext);
  function startQuiz() {
    dispatcher({ type: HostGameAction.GAME_START });
  }

  return (
    <>
      <Header>
        <RoomInformation>
          방 번호 <strong>{roomState.roomNumber}</strong>
        </RoomInformation>
        <ButtonContainer>
          <YellowButton onClick={startQuiz}>Start</YellowButton>
        </ButtonContainer>
      </Header>
      <Main>
        <PlayerCounter>대기자 {roomState.players.length}명</PlayerCounter>
        <PlayerList>
          {roomState.players.map(player => (
            <li key={player.nickname}>{player.nickname}</li>
          ))}
        </PlayerList>
      </Main>
    </>
  );
}

export default HostWaitingRoom;
