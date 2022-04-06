import * as ChakraIU from "@chakra-ui/react";
import { Flex, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const { data, isLoading, error } = useQuery(
    "users",
    async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

      const users = data.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };
      });

      return users;
    },
    {
      staleTime: 1000 * 5, // 5 segundos
    }
  );

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

  return (
    <ChakraIU.Box>
      <Header />
      <ChakraIU.Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <ChakraIU.Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <ChakraIU.Flex mb="8" justify="space-between" align="center">
            <ChakraIU.Heading size="lg" fontWeight="normal">
              Usuários
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
                  {data.map((user) => {
                    return (
                      <>
                        <ChakraIU.Tr>
                          <ChakraIU.Td px={["4", "4", "6"]}>
                            <ChakraIU.Checkbox colorScheme="pink" />
                          </ChakraIU.Td>
                          <ChakraIU.Td>
                            <ChakraIU.Box>
                              <ChakraIU.Text fontWeight="bold">
                                {user.name}
                              </ChakraIU.Text>
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
                      </>
                    );
                  })}
                </ChakraIU.Tbody>
              </ChakraIU.Table>
              <Pagination />
            </>
          )}
        </ChakraIU.Box>
      </ChakraIU.Flex>
    </ChakraIU.Box>
  );
}
