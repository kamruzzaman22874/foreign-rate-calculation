import '@/styles/globals.css'
import Layout from '../../components/Layout/Layout'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../apollo-client'
import { Box, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    
   
      <Box>
        <Container>
          <ApolloProvider client={client}>
            <Layout><Component {...pageProps} /></Layout>
            <ToastContainer/>
          </ApolloProvider>
        </Container>
      </Box>
  )
  
}
