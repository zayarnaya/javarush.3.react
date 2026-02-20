import { Form, Input } from 'antd';
import type { FC } from 'react';
import MaskedInput from 'antd-mask-input';
import { useNavigate, useSearchParams } from 'react-router';

import style from './styles.module.scss';

export const PaymentMethodForm: FC<{ form: any }> = ({ form }: { form: any }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <Form
      form={form}
      requiredMark={false}
      id="card"
      onFinish={() => navigate({ pathname: '/success', search: searchParams.toString() })}
      onFinishFailed={(all: any) => console.log(JSON.stringify(all))}
    >
      <div className={style.grid}>
        <Form.Item
          layout="vertical"
          label={'Card Number'}
          name="number"
          rules={[{ required: true, message: 'Please write a correct card number' }]}
        >
          <MaskedInput className={style.input} mask="0000 0000 0000 0000" placeholder="0000 0000 0000 0000" />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label={'Expiration Date'}
          name="expires"
          rules={[
            { required: true, message: 'Please fill the card expiration date' },
            { pattern: /^[0-9][0-2]\/[0-9][0-9]/, message: 'Please write a correct date in MM/YY format' },
          ]}
        >
          <MaskedInput className={style.input} mask="00/00" placeholder="MM/YY" />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label={'Cardholder'}
          name="holder"
          rules={[
            { required: true, message: 'Please fill the cardholder name' },
            { pattern: /^[a-zA-Z\s]*$/, message: 'Write name in latin letters' },
          ]}
        >
          <Input className={style.input} placeholder="Cardholder name" />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label={'CVC'}
          name="cvc"
          rules={[{ required: true, message: 'Please write a cvc code' }]}
        >
          <MaskedInput className={style.input} type="password" mask="000" placeholder="000" />
        </Form.Item>
      </div>
    </Form>
  );
};
