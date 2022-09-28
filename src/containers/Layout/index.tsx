import { FC, ReactNode } from 'react';
import { Loader } from 'containers';

import s from './styles.module.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <section className={s.wrapper}>
      <Loader />
    </section>
  );
};
