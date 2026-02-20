import { Collapse, Radio, type CollapseProps } from 'antd';
import { type FC } from 'react';
import { CreditCardLabel } from './components/CreditCardLabel';
import { PaymentMethodForm } from './components/PaymentMethodForm';
import { MethodButton } from './components/MethodButton';

interface Props {
  onTabClick: (key: string) => void;
  form: any;
}

export const PaymentMethods: FC<Props> = ({ onTabClick, form }) => {
  const style = {
    marginBottom: '16px',
    backgroundColor: 'var(--darker-grey)',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
  };
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <CreditCardLabel />,
      children: <PaymentMethodForm form={form} />,
      style,
    },
    {
      key: '2',
      label: 'PayPal',
      children: <MethodButton type="paypal" />,
      style,
    },
    {
      key: '3',
      label: 'Bitcoin',
      children: <MethodButton type="bitcoin" />,
      style,
    },
  ];
  return (
    <Collapse
      onChange={(keys: string[]) => onTabClick(keys[0] ?? '')}
      style={{ padding: '16px 0' }}
      accordion
      bordered={false}
      defaultActiveKey={['1']}
      items={items}
      expandIcon={({ isActive }) => <Radio checked={isActive} />}
    />
  );
};
