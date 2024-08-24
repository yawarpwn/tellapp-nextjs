'use server'

import { LabelInsert, LabelUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { LabelsModel } from '@/models/labels'
import { getDni, getRuc } from '../sunat'

export async function createLabelAction(input: LabelInsert) {
  const cleanedPhone = input.phone
    ? input.phone.replace(/ /g, '').replace(' ', '').replace('+51', '')
    : null
  const { error } = await LabelsModel.create({
    ...input,
    phone: cleanedPhone,
  })
  if (error) throw error
  revalidatePath('/new-labels')
}

export async function deleteLabelAction(id: string) {
  const { error } = await LabelsModel.delete(id)
  if (error) throw error
  revalidatePath('/new-labels')
}

export async function updateLabelAction(id: string, input: LabelUpdate) {
  const cleanedPhone = input.phone
    ? input.phone.replace(/ /g, '').replace(' ', '').replace('+51', '')
    : null

  const { error } = await LabelsModel.update(id, {
    ...input,
    phone: cleanedPhone,
  })
  if (error) throw error

  revalidatePath('/new-labels')
}

export async function searchByDniOrRuc(dniRuc: string) {
  try {
    if (dniRuc.length === 8) {
      return getDni(dniRuc)
    }

    return getRuc(dniRuc)
  } catch (error) {
    throw new Error('Error no se puede identificar  la razon social')
  }
}
