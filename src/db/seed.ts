import { db, client } from '../db'
import { agenciesTable, labelsTable } from './schemas'
import { envs } from '@/config'

import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'
import { LabelType } from '@/types'

const supabase = createClient('https://mluiozpgwvyzpnbzfkwm.supabase.co')

async function seed() {
  const { data: labels, error } = await supabase.from('labels').select().returns<LabelType[]>()

  if (error) throw error

  const mappedLabels = labels.map(label => ({
    id: label.id,
    recipient: label.recipient,
    destination: label.destination,
    dniRuc: label.dni_ruc,
    address: label.address,
    phone: label.phone,
    agencyId: label.agency_id,
    createdAt: new Date(label.created_at),
    updatedAt: new Date(label.updated_at),
  }))

  try {
    console.log(mappedLabels)
    await db.insert(labelsTable).values(mappedLabels)
    console.log('success seed agencies')
  } catch (error) {
    console.log(error)
  }
}
seed()
