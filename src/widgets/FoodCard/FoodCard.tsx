import { Button, Flex, Typography } from 'antd';
import { useCallback, type FC, type MouseEvent } from 'react';

import style from './FoodCard.module.scss';
import { toRupeees } from 'src/shared/helpers';

const { Title, Text } = Typography;

interface Props {
  id: number;
  image: any;
  name: string;
  price: number | string;
  handleSelectClick: (id: number) => void;
  handleDeselectClick: (id: number) => void;
  isSelected: boolean;
}

export const FoodCard: FC<Props> = ({
  id,
  image,
  name,
  price,
  handleSelectClick,
  handleDeselectClick,
  isSelected,
  ...props
}) => {
  const onSelect = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleSelectClick(id);
    },
    [id, handleSelectClick],
  );
  const onDeselect = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleDeselectClick(id);
    },
    [id, handleDeselectClick],
  );
  return (
    <Flex vertical data-id={id} {...props}>
      <Flex className={style['image-wrapper']}>
        <img src={image} alt={name} className={style.image} />
      </Flex>
      <Flex vertical className={style['info-wrapper']} justify="space-between" gap={12}>
        <Title level={5} className={style.title} ellipsis>
          {name}
        </Title>
        <Text>{typeof price === 'number' ? toRupeees(price) : price}</Text>

        {!isSelected && (
          <Button className={style.button} variant="outlined" onClick={onSelect}>
            Add to ticket
          </Button>
        )}
        {isSelected && (
          <Button className={style.button} variant="outlined" danger onClick={onDeselect}>
            Remove from ticket
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
