import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Luis Costa</Text>
        <Text color="gray.300" fontSize="small">
          luis.costa@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Luis Costa"
        src="https://github.com/luiscostalafc.png"
      />
    </Flex>
  );
}
