import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "./../../context/crypto-context";
import { useEffect, useState } from "react";
import { CoinInfoModal } from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  textAlign: "center",
  width: "100%",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const keypress = (event) => {
      event.key === "/" && setSelect((prev) => !prev);
    };

    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setIsModalOpen(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value={"press / to open"}
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img src={option.data.icon} alt={option.data.label} width="20" />
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
        size="large"
      >
        <AddAssetForm close={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
