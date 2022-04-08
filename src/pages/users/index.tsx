import * as ChakraIU from "@chakra-ui/react";
import {
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../hooks/useUsers";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  if (error) {
    return (
      <Flex justify="center">
        <Text>Houve algum erro em buscar os dados</Text>
      </Flex>
    );
  }

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <ChakraIU.Box>
      <Header />
      <ChakraIU.Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <ChakraIU.Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <ChakraIU.Flex mb="8" justify="space-between" align="center">
            <ChakraIU.Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </ChakraIU.Heading>

            <Link href="/users/create" passHref>
              <ChakraIU.Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<ChakraIU.Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </ChakraIU.Button>
            </Link>
          </ChakraIU.Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <>
              <ChakraIU.Table colorScheme="whiteAlpha">
                <ChakraIU.Thead>
                  <ChakraIU.Tr>
                    <ChakraIU.Th
                      px={["4", "4", "6"]}
                      color="gray.300"
                      width="8"
                    >
                      <ChakraIU.Checkbox colorScheme="pink" />
                    </ChakraIU.Th>
                    <ChakraIU.Th>Usuário</ChakraIU.Th>
                    {isWideVersion && (
                      <ChakraIU.Th>Data de cadastro</ChakraIU.Th>
                    )}
                    <ChakraIU.Th width="8"></ChakraIU.Th>
                  </ChakraIU.Tr>
                </ChakraIU.Thead>
                <ChakraIU.Tbody>
                  {data.users.map((user) => {
                    return (
                      <Fragment key={user.id}>
                        <ChakraIU.Tr>
                          <ChakraIU.Td px={["4", "4", "6"]}>
                            <ChakraIU.Checkbox colorScheme="pink" />
                          </ChakraIU.Td>
                          <ChakraIU.Td>
                            <ChakraIU.Box>
                              <ChakraLink
                                color="purple.400"
                                onMouseEnter={() => handlePrefetchUser(user.id)}
                              >
                                <ChakraIU.Text fontWeight="bold">
                                  {user.name}
                                </ChakraIU.Text>
                              </ChakraLink>

                              <ChakraIU.Text fontSize="sm" color="gray.300">
                                {user.email}
                              </ChakraIU.Text>
                            </ChakraIU.Box>
                          </ChakraIU.Td>
                          {isWideVersion && (
                            <ChakraIU.Td>{user.createdAt}</ChakraIU.Td>
                          )}
                          <ChakraIU.Td>
                            <ChakraIU.Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={
                                <ChakraIU.Icon
                                  as={RiPencilLine}
                                  fontSize="16"
                                />
                              }
                            >
                              Editar
                            </ChakraIU.Button>
                          </ChakraIU.Td>
                        </ChakraIU.Tr>
                      </Fragment>
                    );
                  })}
                </ChakraIU.Tbody>
              </ChakraIU.Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </ChakraIU.Box>
      </ChakraIU.Flex>
    </ChakraIU.Box>
  );
}
