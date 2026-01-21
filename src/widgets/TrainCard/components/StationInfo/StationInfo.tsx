import { Flex, Typography } from 'antd';
import type { FC } from 'react';

interface Props {
  date: string;
  time: string;
  station: {
    name: string;
    code: string;
  };
  align?: 'left' | 'right';
}

const { Paragraph } = Typography;

export const StationInfo: FC<Props> = ({ date, time, station: { name, code } }, align = 'left') => {
  return (
    <Flex vertical gap={18} align={align === 'right' ? 'flex-end' : 'flex-start'}>
      <Paragraph>{date}</Paragraph>
      <Paragraph>{time}</Paragraph>
      <Paragraph>
        {name} - {code}
      </Paragraph>
    </Flex>
  );
};

StationInfo.displayName = 'Station.Info';
