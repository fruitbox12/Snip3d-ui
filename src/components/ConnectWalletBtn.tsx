import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectWalletBtn = () => {
    return (
        <div style={{
            width: 200,
            position: 'absolute',
            right: 15,
            top: 17,
            zIndex: 10
        }}>
            <ConnectWallet />
        </div>
    )
};

export default ConnectWalletBtn;