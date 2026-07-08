'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Hardcoded secure credentials as per plan
  if (email === 'admin@amroot.com' && password === 'Amroot@2026') {
    const cookieStore = await cookies()
    cookieStore.set('amroot_auth_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    redirect('/checklist')
  }

  return { error: 'Invalid credentials. Please try again.' }
}

export async function setAuthCookieAction() {
  const cookieStore = await cookies()
  cookieStore.set('amroot_auth_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('amroot_auth_session')
  redirect('/login')
}
