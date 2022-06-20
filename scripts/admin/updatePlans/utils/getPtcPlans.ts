import type { Plan, PlanLanguage, PlanRateType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/index'
import axios from 'axios'
import * as csv from 'csv'

type PtcRawPlan = {
  '[idKey]': string
  '[TduCompanyName]': string
  '[RepCompany]': string
  '[Product]': string
  '[kwh500]': string
  '[kwh1000]': string
  '[kwh2000]': string
  '[Fees/Credits]': string
  '[PrePaid]': string
  '[TimeOfUse]': string
  '[Fixed]': string
  '[RateType]': PlanRateType
  '[Renewable]': string
  '[TermValue]': string
  '[CancelFee]': string
  '[Website]': string
  '[SpecialTerms]': string
  '[TermsURL]': string
  '[YRACURL]': string
  '[Promotion]': string
  '[PromotionDesc]': string
  '[FactsURL]': string
  '[EnrollURL]': string
  '[PrepaidURL]': string
  '[EnrollPhone]': string
  '[NewCustomer]': string
  '[MinUsageFeesCredits]': string
  '[Language]': PlanLanguage
  '[Rating]': string
}

export type PtcPlan = Plan & {
  tduName?: string
  providerName?: string
  rating?: number
}

/* istanbul ignore next */
export default async function getPtcPlans() {
  const response: { data: string } = await axios.get(
    'http://powertochoose.org/en-us/Plan/ExportToCsv',
  )

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const ptcRawPlans = (await new Promise((resolve, reject) => {
    csv.parse(
      response.data.slice(0, -17),
      { columns: true, delimiter: ',', skipEmptyLines: true, trim: true },
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data as PtcRawPlan[])
        }
      },
    )
  })) as PtcRawPlan[]

  // Map to our data model
  const ptcPlans: Partial<PtcPlan>[] = ptcRawPlans.map((plan) => ({
    tduName: plan['[TduCompanyName]'],
    providerName: plan['[RepCompany]'],
    rating: parseInt(plan['[Rating]']),
    name: plan['[Product]'],
    ptcIdKey: parseInt(plan['[idKey]']),
    kwh500: new Decimal(plan['[kwh500]']),
    kwh1000: new Decimal(plan['[kwh1000]']),
    kwh2000: new Decimal(plan['[kwh2000]']),
    rateType: plan['[RateType]'],
    isPrepaid: plan['[PrePaid]'].toLowerCase() === 'true',
    isTimeOfUse: plan['[TimeOfUse]'].toLowerCase() === 'true',
    isPromotion: plan['[Promotion]'].toLowerCase() === 'true',
    promotionDescription: plan['[PromotionDesc]'],
    isNewCustomer: plan['[NewCustomer]'].toLowerCase() === 'true',
    percentRenewable: parseInt(plan['[Renewable]'] || '0'),
    term: parseInt(plan['[TermValue]']),
    cancellationFee: plan['[CancelFee]'],
    language: plan['[Language]'],
    termsUrl: plan['[TermsURL]'],
    factsUrl: plan['[FactsURL]'],
    enrollUrl: plan['[EnrollURL]'],
    enrollPhone: plan['[EnrollPhone]'],
  }))

  return ptcPlans
}
