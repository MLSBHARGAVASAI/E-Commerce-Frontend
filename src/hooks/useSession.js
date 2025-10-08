import { useEffect, useState } from 'react'
import { checkSession, loginUser } from '../components/config'

export function useSession() {
  const [session, setSession] = useState({
    is_authenticated: false,
    is_admin: false,
    username: null,
    loading: true,
    error: '',
  })

  const refresh = async () => {
    try {
      const data = await checkSession()
      setSession({ ...data, loading: false, error: '' })
    } catch (e) {
      setSession({ is_authenticated: false, is_admin: false, username: null, loading: false, error: 'Failed to check session' })
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const doLogin = async (credentials) => {
    try {
      await loginUser(credentials)
      await refresh()
      return { success: true }
    } catch (e) {
      return { success: false, error: e.response?.data?.error || 'Login failed' }
    }
  }

  return { session, refresh, doLogin }
}


