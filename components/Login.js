import { useMetamask } from "@thirdweb-dev/react";
import styles from "../styles/Login.module.css";

const Login = () => {
  const connectWithMetamask = useMetamask();

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={connectWithMetamask}>
        Inicia usando tu cuenta de MetaMask
      </button>
    </div>
  );
};
export default Login;
