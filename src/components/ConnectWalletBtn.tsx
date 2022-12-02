import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletBtn = () => {
    return (
        <div style={{
            width: 200,
            position: 'absolute',
            right: 10,
            top: 10
        }}>
            <ConnectWallet />
        </div>
    )
};

export default ConnectWalletBtn;