import { Typography, Flex } from "../../styles";

export const Score = ({ userName, scorePlayer, scoreComputer }) => {
  userName = userName.length > 12 ? `${userName.slice(0, 8)}...` : userName;

  return (
    <Flex direction="column">
      <br></br>
      <Flex justify="space-between">
        <Flex direction="column" gap="2px">
          <Typography size="22px" fontWeight="400">{userName}</Typography>
          <Typography fontWeight="400">{scorePlayer}</Typography>
        </Flex>
        <Typography>x</Typography>

        <Flex direction="column" gap="2px">
          <Typography size="22px" fontWeight="400">CPU</Typography>
          <Typography fontWeight="400">{scoreComputer}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};
