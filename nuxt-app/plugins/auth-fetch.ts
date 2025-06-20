import { defineNuxtPlugin } from '#app'

interface TokenResponse {
  access_token: string
  refresh_token: string
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;

  const getStoredTokens = () => {
    if (process.client) {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      return { accessToken, refreshToken }
    }
    return { accessToken: null, refreshToken: null }
  }

  const setStoredTokens = (tokens: TokenResponse) => {
    if (process.client) {
      localStorage.setItem('access_token', tokens.access_token)
      localStorage.setItem('refresh_token', tokens.refresh_token)
    }
  }

  const clearStoredTokens = () => {
    if (process.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }

  const refreshTokens = async (): Promise<TokenResponse | null> => {
    const { refreshToken } = getStoredTokens()
    if (!refreshToken) return null

    try {
      const tokens = await $fetch<TokenResponse>(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { refresh_token: refreshToken },
      })
      setStoredTokens(tokens)
      return tokens
    } catch (error) {
      clearStoredTokens()
      return null
    }
  }

  const authFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const { accessToken } = getStoredTokens()
    let headers = new Headers(init?.headers)

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    const url = typeof input === 'string' ? input : input.toString();

    const method = init?.method?.toUpperCase() as
      | "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE"
      | undefined;

    try {
      // $fetch will throw on non-2xx responses
      return await $fetch(url, {
        ...init,
        method,
        headers,
      })
    } catch (error: any) {
      // If we get a 401 and we have a refresh token, try to refresh
      if (error?.response?.status === 401) {
        const newTokens = await refreshTokens()
        if (newTokens) {
          headers.set('Authorization', `Bearer ${newTokens.access_token}`)
          // Retry the original request with the new token
          return await $fetch(url, {
            ...init,
            method,
            headers,
          })
        }
      }
      // Rethrow or handle other errors as needed
      throw error
    }
  }

  return {
    provide: {
      authFetch,
    },
  }
}) 