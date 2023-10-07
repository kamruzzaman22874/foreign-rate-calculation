import { Inter } from 'next/font/google'
import AllInputField from '../../components/AllInputField/AllInputField'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <AllInputField />
    </main>
  )
}
