import { Button, type ButtonProps } from 'antd';
import type { FC } from 'react';
import cn from 'classnames';

import style from './StyledButton.module.scss';

interface Props extends ButtonProps {}

export const StyledButton: FC<Props> = ({ className, children, ...props }) => (
  <Button {...props} className={cn(style.button, className)}>
    {children}
  </Button>
);
