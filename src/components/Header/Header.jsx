import styles from './Header.module.scss';
import Image from 'next/image';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <Image
          src="/assets/podrida.gif"
          alt="Podrida"
          width={75}
          height={75}
          unoptimized={true}
          priority
        />
        <h1>Podrida</h1>
        <Image
          src="/assets/podrida.gif"
          alt="Podrida"
          width={75}
          height={75}
          unoptimized={true}
          priority
        />
      </div>
    </div>
  );
}

export default Header;
