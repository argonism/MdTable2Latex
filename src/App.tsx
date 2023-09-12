import React, { useState, useEffect } from 'react';
import { Box, Textarea, Button, VStack, Heading, Alert, AlertIcon, Container, useColorMode, IconButton, Link, HStack, useToast } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaCopy } from 'react-icons/fa';
import MarkdownToLatexConverter from './MarkdownToLatexConverter';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [markdown, setMarkdown] = useState('');
  const [latex, setLatex] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [latexRows, setLatexRows] = useState(5); 
  const toast = useToast();

  useEffect(() => {
    
    const lines = latex.split('\n').length;
    setLatexRows(lines > 5 ? lines : 5); 
  }, [latex]);

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

  const handleCopyToClipboard = () => {
    
    navigator.clipboard.writeText(latex).then(() => {
      
      toast({
        title: 'Copied to Clipboard',
        description: 'The LaTeX table has been copied to your clipboard!',
        status: 'success',
        duration: 2000, 
        isClosable: true, 
      });
    }).catch((err) => {
      console.error('Failed to copy to clipboard: ', err);
      
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy the LaTeX table to your clipboard. Please try again.',
        status: 'error',
        duration: 2000, 
        isClosable: true, 
      });
    });
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
          <Heading textAlign="center">🍳 Markdown Table to LaTeX  Converter</Heading>
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
          <Box position="relative">
            <Textarea
              value={latex}
              isReadOnly
              placeholder="Your LaTeX table will appear here..."
              variant="filled"
              size="lg"
              minH={`${latexRows * 1.5}rem`} 
            />
            <Box position="absolute" top={2} right={2}>
              <CopyToClipboard text={latex} onCopy={handleCopyToClipboard}>
                <IconButton
                  icon={<FaCopy />}
                  size="sm"
                  aria-label="Copy to Clipboard"
                  variant="outline"
                />
              </CopyToClipboard>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
