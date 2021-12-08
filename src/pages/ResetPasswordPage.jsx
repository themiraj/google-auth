import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Card } from '../components/Card'
import { Layout } from '../components/Layout'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function useQuery() {
  const location = useLocation()
  return new  URLSearchParams(location.search);
}

export default function ResetPasswordPage() {
  const history = useHistory()
  const toast = useToast();
  const {resetPassord} = useAuth();
  const query = useQuery()
  const [newPassword, setNewPassword] = useState('')
  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Reset password
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            // handle reset password
            resetPassord(query.get('oobCode'),newPassword)
              .then(res => {
                toast({
                  description:"Password has been changed", 
                  status:'success',
                  duration:'5000',
                  inCloseable:true
                })
                history.push('/login')
              })
              .catch(err => {
                toast({
                  description:err.message, 
                  status:'error',
                  duration:'5000',
                  inCloseable:true
                })
              })
          }}
        >
          <Stack spacing='6'>
            <FormControl id='password'>
              <FormLabel>New password</FormLabel>
              <Input 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type='password' autoComplete='password' required />
            </FormControl>
            <Button type='submit' colorScheme='pink' size='lg' fontSize='md'>
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  )
}
