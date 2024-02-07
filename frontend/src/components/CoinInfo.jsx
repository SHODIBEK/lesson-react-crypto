import { Flex, Typography } from "antd";

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 25, marginRight: 10 }}
      />
      <Typography.Title level={3} style={{ margin: 0 }}>
        {withSymbol && `(${coin.symbol})`} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
