import { useState } from 'react';
import { FlatList, HStack, IconButton, VStack, useTheme, Text, Heading, Center } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';

import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';

import Logo from '../assets/logo_secondary.svg';

export function Home() {
  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    // {
    //   id: '1',
    //   patrimony: '123456',
    //   when: '24/07/2022 às 19h',
    //   status: 'open'
    // },
    // {
    //   id: '2',
    //   patrimony: '123456',
    //   when: '24/07/2022 às 19h',
    //   status: 'closed'
    // },
  ]);

  const { colors } = useTheme();

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">
            Meus chamados
          </Heading>

          <Text color="gray.200">
            3
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            title='em andamento'
            type='open'
            onPress={() => setSelectedStatus('open')}
            isActive={selectedStatus === 'open'}
          />

          <Filter 
            title='finalizados'
            type='closed'
            onPress={() => setSelectedStatus('closed')}
            isActive={selectedStatus === 'closed'}
          />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={() => (
            <Center mt={6}>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={4} textAlign="center">
                Você ainda não possui {'\n'}
                solicitações {selectedStatus === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" />
      </VStack>
    </VStack>
  );
}