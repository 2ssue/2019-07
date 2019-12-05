import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import { Button } from '../common/Buttons';
import * as layout from './Layout';

import LoadingCircle from '../common/LoadingCircle';
import { fetchChoose } from '../../utils/fetch';

function Selection({ currentQuiz, roomNumber, quizIndex, chooseAnswer }) {
  function choose(index) {
    chooseAnswer(index);
    fetchChoose(roomNumber, quizIndex, index);
  }

  return (
    <>
      <layout.Center>
        <layout.CenterContentContainer>
          <layout.CenterLeftPanel />
          <layout.ImagePanel />
          <layout.CenterRightPanel />
        </layout.CenterContentContainer>
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {currentQuiz.items.map((item, index) => (
            <layout.Item key={item.title}>
              <Button
                backgroundColor={colors.ITEM_COLOR[index]}
                fontColor={colors.TEXT_WHITE}
                onClick={e => choose(index, e)}
              >
                {item.title}
              </Button>
            </layout.Item>
          ))}
        </layout.ItemContainer>
      </layout.Bottom>
    </>
  );
}

function Quiz({ quizSet, roomNumber, quizIndex, setChoose }) {
  const [choosed, setChoosed] = useState(false);

  const currentQuiz = quizSet[quizIndex];
  function chooseAnswer(index) {
    setChoose(index);
    setChoosed(true);
  }

  return (
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>{currentQuiz.title}</layout.Title>
      </layout.TitleContainer>
      {!choosed && (
        <Selection
          currentQuiz={currentQuiz}
          roomNumber={roomNumber}
          chooseAnswer={chooseAnswer}
          quizIndex={quizIndex}
        />
      )}
      {choosed && <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />}
    </layout.Background>
  );
}

Selection.propTypes = {
  currentQuiz: PropTypes.shape({
    items: PropTypes.shape({
      map: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  quizIndex: PropTypes.number.isRequired,
  roomNumber: PropTypes.string.isRequired,
  chooseAnswer: PropTypes.func.isRequired,
};

Quiz.propTypes = {
  quizSet: PropTypes.shape({
    items: PropTypes.shape({
      title: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
  roomNumber: PropTypes.string.isRequired,
  quizIndex: PropTypes.number.isRequired,
  setChoose: PropTypes.func.isRequired,
};

export default Quiz;
