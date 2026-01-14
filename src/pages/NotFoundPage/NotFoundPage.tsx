import image from '@images/404.svg';
import { Typography, Button, Flex } from 'antd';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Flex vertical align='center' justify='center'>
            <img className="image" src={image} alt="" />
            <Typography.Paragraph type='secondary' >Whoops! This page must be a ghost - it's not here!</Typography.Paragraph>
            <Flex justify='center'><Button variant='solid' color='primary' onClick={() => navigate('/')}>Find shelter</Button></Flex>
        </Flex>
    )
}

NotFoundPage.displayName = 'Not.Found.Page'