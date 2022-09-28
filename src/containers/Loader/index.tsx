import { FC } from 'react';

import s from './Loader.module.scss';
import { Logo } from '../../assets/img';

const Loader: FC<{ isFading?: boolean }> = ({ isFading }) => {
  return (
    <section className={s.wrapper}>
      <Logo />
    </section>
  );
};

export default Loader;
