import { TABLES } from '../src/constants'
import { supabase } from './client'
import { SignalType } from '@/types'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

async function main() {
  const res = await supabase.from('signals').select().returns<SignalType>()
}

main()
  .then(() => console.log('Success Script'))
  .catch(console.error)
