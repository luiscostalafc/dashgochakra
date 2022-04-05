import * as ChakraIU from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
          <ChakraIU.Table colorScheme="whiteAlpha">
            <ChakraIU.Thead>
              <ChakraIU.Tr>
                <ChakraIU.Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <ChakraIU.Checkbox colorScheme="pink" />
                </ChakraIU.Th>
                <ChakraIU.Th>Usuário</ChakraIU.Th>
                {isWideVersion && <ChakraIU.Th>Data de cadastro</ChakraIU.Th>}
                <ChakraIU.Th width="8"></ChakraIU.Th>
              </ChakraIU.Tr>
            </ChakraIU.Thead>
            <ChakraIU.Tbody>
              <ChakraIU.Tr>
                <ChakraIU.Td px={["4", "4", "6"]}>
                  <ChakraIU.Checkbox colorScheme="pink" />
                </ChakraIU.Td>
                <ChakraIU.Td>
                  <ChakraIU.Box>
                    <ChakraIU.Text fontWeight="bold">Luis Costa</ChakraIU.Text>
                    <ChakraIU.Text fontSize="sm" color="gray.300">
                      luiscostalafc@gmail.com
                    </ChakraIU.Text>
                  </ChakraIU.Box>
                </ChakraIU.Td>
                {isWideVersion && <ChakraIU.Td>02 de Abril, 2022</ChakraIU.Td>}
                <ChakraIU.Td>
                  <ChakraIU.Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<ChakraIU.Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </ChakraIU.Button>
                </ChakraIU.Td>
              </ChakraIU.Tr>
              <ChakraIU.Tr>
                <ChakraIU.Td px={["4", "4", "6"]}>
                  <ChakraIU.Checkbox colorScheme="pink" />
                </ChakraIU.Td>
                <ChakraIU.Td>
                  <ChakraIU.Box>
                    <ChakraIU.Text fontWeight="bold">Luis Costa</ChakraIU.Text>
                    <ChakraIU.Text fontSize="sm" color="gray.300">
                      luiscostalafc@gmail.com
                    </ChakraIU.Text>
                  </ChakraIU.Box>
                </ChakraIU.Td>
                {isWideVersion && <ChakraIU.Td>02 de Abril, 2022</ChakraIU.Td>}
                <ChakraIU.Td>
                  <ChakraIU.Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<ChakraIU.Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </ChakraIU.Button>
                </ChakraIU.Td>
              </ChakraIU.Tr>
              <ChakraIU.Tr>
                <ChakraIU.Td px={["4", "4", "6"]}>
                  <ChakraIU.Checkbox colorScheme="pink" />
                </ChakraIU.Td>
                <ChakraIU.Td>
                  <ChakraIU.Box>
                    <ChakraIU.Text fontWeight="bold">Luis Costa</ChakraIU.Text>
                    <ChakraIU.Text fontSize="sm" color="gray.300">
                      luiscostalafc@gmail.com
                    </ChakraIU.Text>
                  </ChakraIU.Box>
                </ChakraIU.Td>
                {isWideVersion && <ChakraIU.Td>02 de Abril, 2022</ChakraIU.Td>}
                <ChakraIU.Td>
                  <ChakraIU.Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<ChakraIU.Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </ChakraIU.Button>
                </ChakraIU.Td>
              </ChakraIU.Tr>
            </ChakraIU.Tbody>
          </ChakraIU.Table>
          <Pagination />
        </ChakraIU.Box>
      </ChakraIU.Flex>
    </ChakraIU.Box>
  );
}
