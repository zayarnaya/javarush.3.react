import type { FC } from 'react';
import visa from '@images/visa.svg';

export const CreditCardLabel: FC = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Credit Card</span>
    <img width={92} alt="" src={visa} />
  </div>
);
