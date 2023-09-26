import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Formik, Field } from 'formik';
import {
  ChakraProvider,
  Container,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';

// Styles
import theme from './styles/theme';

const App: FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleGreet = useCallback(async ({ name }: any) => {
    setMessage(await invoke('greet', { name }));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Heading as='h1'>Welcome to Tauri!</Heading>

        <HStack>
          <Link href='https://vitejs.dev' isExternal>
            <Image src='/vite.svg' alt='Vite logo' />
          </Link>
          <Link href='https://tauri.app' isExternal>
            <Image src='/tauri.svg' alt='Tauri logo' />
          </Link>
        </HStack>

        <Text>Click on the Tauri, Vite, and React logos to learn more.</Text>

        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={({ name }: any) => handleGreet({ name })}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Field
                  as={Input}
                  name='name'
                  variant='filled'
                  placeholder='Enter a name...'
                />
              </FormControl>

              <Button type='submit'>Greet</Button>
            </form>
          )}
        </Formik>

        <p>{message}</p>
      </Container>
    </ChakraProvider>
  );
};

export default App;
