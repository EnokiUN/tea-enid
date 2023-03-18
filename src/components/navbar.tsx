import { usernameState } from '../pages/app';
import { messagesState } from '../pages/connector';
import Emoji from './emoji';
import {
    Flex,
    IconButton,
    Link,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

function _NavBar({ ws }: { ws: WebSocket }): JSX.Element {
    const { toggleColorMode } = useColorMode();

    const toggleColorModeIcon = useColorModeValue('🌞', '🌚');
    const elevatedBackground = useColorModeValue('gray.100', 'gray.750');
    const [username, setUsername] = useRecoilState(usernameState);
    const setMessages = useSetRecoilState(messagesState);

    return (
        <Flex
            p={5}
            justifyContent="space-between"
            alignItems="center"
            mb={5}
            w={'100%'}
            bg={elevatedBackground}
        >
            <Flex flexDir="column">
                <Text fontSize="3xl" mb={0} fontWeight="bold">
                    Eludris
                </Text>
                <Text fontSize="md">
                    Connected to the{' '}
                    <Link color={'teal.500'} href="https://eludris.gay">
                        main
                    </Link>{' '}
                    instance as{' '}
                    <Text color={'teal.500'} as="span">
                        {username}
                    </Text>
                </Text>
            </Flex>
            <Flex flexDir="row" h="100%" alignItems="center">
                <IconButton
                    variant="ghost"
                    borderRadius="full"
                    aria-label="toggle color mode"
                    onClick={toggleColorMode}
                    icon={
                        <Text as="span">
                            {<Emoji emoji={toggleColorModeIcon} />}
                        </Text>
                    }
                ></IconButton>
                <IconButton
                    variant="ghost"
                    borderRadius="full"
                    aria-label="leave chat"
                    onClick={() => {
                        setUsername(null);
                        setMessages([]);
                        ws.close();
                    }}
                    icon={
                        <Text as="span">
                            <Emoji emoji="🏃" />
                        </Text>
                    }
                ></IconButton>
            </Flex>
        </Flex>
    );
}

const NavBar = React.memo(_NavBar);
export default NavBar;
