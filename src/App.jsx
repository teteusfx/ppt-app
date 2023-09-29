import { useEffect, useState } from "react";
import { ActionsGame } from "./components/actions-game";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Modal } from "./components/modal";
import { Score } from "./components/score";
import * as C from "./styles";

const messages = {
  rules: {
    title: "Regras",
    message:
      'Escolha entre pedra, papel e tesoura. Cada jogador escolhe uma opção. A tesoura corta o papel, mas quebra com a pedra; o papel embrulha a pedra, mas é cortado pela tesoura e a pedra quebra a tesoura e é embrulhada pelo papel. O desafio aqui é vencer a CPU cinco vezes.',
  },
  user: {
    title: "Usuário",
    message: "Coloca um nome aí zé.",
  },
  computerWin: {
    title: "Vixee",
    message:
      "Ruim demais zé kkkkkkkkkkk",
  },
  playerWin: {
    title: "Nuuuuuuuuuuuuuuuuu",
    message: "Aí cê malou ein zé!",
  },
};

const valueTypeEnum = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const actions = [
  {
    value: 1,
    label: "👊",
    description: "Rock",
  },
  {
    value: 2,
    label: "🖐",
    description: "Paper",
  },
  {
    value: 3,
    label: "✌",
    description: "Scissors",
  },
];

function App() {
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [open, setOpen] = useState(false);
  const [textGame, setTextGame] = useState("Clique em iniciar.");
  const [scorePlayerValue, setScorePlayerValue] = useState(0);
  const [scoreComputerValue, setScoreComputerValue] = useState(0);
  const [userAction, setUserAction] = useState("❔");
  const [computerAction, setComputerAction] = useState("❔");
  const [userName, setUserName] = useState("JOGADOR");
  const [playGame, setPlayGame] = useState(false);
  const SCORE_TO_WIN = 5;

  const handleOpenModal = (type) => {
    if (!type) {
      setOpen(false);
      setTitleModal("");
      setMessageModal("");
      return;
    }
    setTitleModal(messages?.[type]?.title);
    setMessageModal(messages?.[type]?.message);
    setOpen(true);
  };

  const randomActionComputer = () => {
    const number = Math.floor(Math.random() * actions.length);
    return actions[number];
  };

  const handleClick = (value) => {
    setUserAction(value.label);
    const actionComputer = randomActionComputer();
    setComputerAction(actionComputer.label);
    checkWinner(value.value, actionComputer.value);
  };

  const checkWinner = (playerValue, computerValue) => {
    const playerRockWin =
      playerValue === valueTypeEnum.ROCK &&
      computerValue === valueTypeEnum.SCISSORS;
    const playerPaperWin =
      playerValue === valueTypeEnum.PAPER &&
      computerValue === valueTypeEnum.ROCK;
    const playerScissorsWin =
      playerValue === valueTypeEnum.SCISSORS &&
      computerValue === valueTypeEnum.PAPER;
    const drawerResult = playerValue === computerValue;
    const playerWin = playerRockWin || playerPaperWin || playerScissorsWin;

    if (drawerResult) return setTextGame("EMPATE - Jogue novamente");
    if (playerWin) {
      setScorePlayerValue((state) => state + 1);
      return setTextGame("VITORIA - Jogue novamente");
    }
    setScoreComputerValue((state) => state + 1);
    return setTextGame("DERROTA - Jogue novamente");
  };

  const handleUserName = (value) => {
    if (!value) return setUserName("JOGADOR");
    setUserName(value);
  };

  const startGame = () => {
    if (userName === "JOGADOR") {
      handleOpenModal("user");
      return;
    }
    if (playGame) return resetValues();
    setPlayGame(true);
  };

  const resetValues = () => {
    setTextGame("Iniciar o jogo !");
    setPlayGame(false);
    setScorePlayerValue(0);
    setScoreComputerValue(0);
    setUserAction("❔");
    setComputerAction("❔");
  };

  useEffect(() => {
    const checkVictory = () => {
      const playerWin = scorePlayerValue === SCORE_TO_WIN;
      const computerWin = scoreComputerValue === SCORE_TO_WIN;
      if (playerWin) return handleOpenModal("playerWin");
      if (computerWin) return handleOpenModal("computerWin");
    };

    checkVictory();
  }, [scorePlayerValue, scoreComputerValue]);

  return (
    <C.Container>
      <C.Flex direction="column">
        <br></br>
        <C.Typography fontWeight="800" size="28px" lineHeight="88px">
          PEDRA PAPEL TESOURA
        </C.Typography>
        <Input
          placeholder="Digite seu nome"
          onChange={(value) => handleUserName(value)}
        />
        <Button onClick={startGame}>{playGame ? "Parar" : "Iniciar"}</Button>
        <Score
          userName={userName}
          scorePlayer={scorePlayerValue}
          scoreComputer={scoreComputerValue}
        />
        <C.Spacer margin="10px" />
        <C.Flex justify="space-around">
          <C.Typography size="64px">{userAction}</C.Typography>
          <C.Typography size="64px">{computerAction}</C.Typography>
        </C.Flex>

        <C.Flex direction="column" gap="0px">
          <C.Typography lineHeight="78px">{textGame}</C.Typography>
          <C.Rules onClick={() => handleOpenModal("rules")}>REGRAS</C.Rules>
        </C.Flex>

        <ActionsGame
          actions={actions}
          onClick={(value) => handleClick(value)}
          disabled={!playGame}
        />

        <Modal
          open={open}
          titleModal={titleModal}
          messageModal={messageModal}
          handleOpenModal={() => handleOpenModal(null)}
        />
      </C.Flex>
    </C.Container>
  );
}

export default App;
