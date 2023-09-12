import React, { useState } from 'react';
import { Box, Textarea, Button, VStack, Heading, Alert, AlertIcon, Container, useColorMode, IconButton, Link, HStack } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';
import MarkdownToLatexConverter from './MarkdownToLatexConverter';

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [markdown, setMarkdown] = useState('');
  const [latex, setLatex] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convertToLatex = () => {
    const converter = new MarkdownToLatexConverter();
    try {
      const result = converter.convert(markdown);
      setLatex(result);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Box bg={colorMode === 'light' ? "gray.50" : "gray.800"} minH="100vh" py={8}>
      <Container maxW="container.md">
        <HStack justifyContent="space-between" mb={4}>
          <IconButton 
            icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} 
            onClick={toggleColorMode} 
            isRound 
            aria-label="Toggle Color Mode"
          />
          <Link href="https://github.com/argonism/MdTable2Latex" isExternal>
            <IconButton 
              icon={<FaGithub />} 
              isRound 
              aria-label="GitHub Repository"
            />
          </Link>
        </HStack>
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center">Markdown to LaTeX Table Converter</Heading>
          <Textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            placeholder="Paste your Markdown table here..."
            variant="filled"
            size="lg"
          />
          <Button colorScheme="teal" onClick={convertToLatex} size="lg" width="full">
            Convert
          </Button>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Textarea
            value={latex}
            isReadOnly
            placeholder="Your LaTeX table will appear here..."
            variant="filled"
            size="lg"
          />
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
