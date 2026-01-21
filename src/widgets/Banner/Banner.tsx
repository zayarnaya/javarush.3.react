import type { FC } from 'react';
import style from './Banner.module.scss';
import { Link } from 'react-router';

interface Props {
  text?: string;
  link?: string;
  image?: any; // TODO: correct type
}

export const Banner: FC<Props> = ({ text, link, image }) => {
  return (
    <div className={style.banner}>
      {image && <img src={image} alt="" className={style.image} />}
      <div className={style.gradient} />
      <Link to={link ?? '/'} className={style.link}>
        {(text ?? 'Explore') + ' >'}
      </Link>
    </div>
  );
};

Banner.displayName = 'Banner';
