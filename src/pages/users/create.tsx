import Link from "next/link";
import { useRouter } from "next/router";
import * as ChakraComponent from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useMutation } from "react-query";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const { data } = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push("/users");
  };

  return (
    <ChakraComponent.Box>
      <Header />
      <ChakraComponent.Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <ChakraComponent.Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <ChakraComponent.Heading size="lg" fontWeight="normal">
            Criar usuários
          </ChakraComponent.Heading>
          <ChakraComponent.Divider my="6" borderColor="gray.700" />

          <ChakraComponent.VStack spacing={["6", "8"]}>
            <ChakraComponent.SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </ChakraComponent.SimpleGrid>

            <ChakraComponent.SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </ChakraComponent.SimpleGrid>
          </ChakraComponent.VStack>
          <ChakraComponent.Flex mt="8" justify={["center", "flex-end"]}>
            <ChakraComponent.HStack spacing={["16", "4"]}>
              <Link href="/users" passHref>
                <ChakraComponent.Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </ChakraComponent.Button>
              </Link>
              <ChakraComponent.Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                Salvar
              </ChakraComponent.Button>
            </ChakraComponent.HStack>
          </ChakraComponent.Flex>
        </ChakraComponent.Box>
      </ChakraComponent.Flex>
    </ChakraComponent.Box>
  );
}
