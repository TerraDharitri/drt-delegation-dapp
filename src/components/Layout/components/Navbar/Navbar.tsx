import { ReactNode } from 'react';

import { faWallet, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@terradharitri/sdk-dapp/hooks/account/useGetAccountInfo';
import { logout } from '@terradharitri/sdk-dapp/utils/logout';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { DharitrI } from 'assets/DharitrI';
import { network } from 'config.devnet';
import { denominated } from 'helpers/denominate';

import styles from './styles.module.scss';

interface ButtonsType {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  copy?: boolean;
}

export const Navbar = () => {
  const { address, account } = useGetAccountInfo();
  const buttons: ButtonsType[] = [
    {
      icon: <DharitrI />,
      label: `${denominated(account.balance)} ${network.rewaLabel}`
    },
    {
      icon: <FontAwesomeIcon icon={faWallet} size='lg' />,
      label: address,
      onClick: () => navigator.clipboard.writeText(address)
    },
    {
      icon: <FontAwesomeIcon icon={faPowerOff} />,
      label: 'Disconnect',
      onClick: () => logout(`${location.origin}/unlock`)
    }
  ];

  return (
    <nav className={`${styles.nav} delegation-nav`}>
      <Link to='/dashboard' className={styles.heading}>
        <span className={styles.logo}>
          <DharitrI />
        </span>

        <span className={styles.title}>Delegation Dashboard</span>
      </Link>

      <div className={styles.buttons}>
        {buttons.map((button) => (
          <div
            key={button.label}
            onClick={button.onClick}
            className={classNames(styles.button, {
              [styles.clickable]: Boolean(button.onClick)
            })}
          >
            <div className={styles.icon}>{button.icon}</div>
            <span>{button.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};
