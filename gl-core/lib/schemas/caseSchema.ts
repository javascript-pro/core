import { z } from 'zod';

export const caseSchema = z.object({
  caseId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  closedAt: z.string().optional(),
  caseClosed: z.boolean().default(false),
  metadata: z.object({
    referenceNumber: z.string(),
    accidentDate: z.string(),
    accidentLocation: z.string(),
    description: z.string(),
    mandateReceived: z.boolean().default(false),
  }),
  client: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
    isDriver: z.boolean(),
    isOwner: z.boolean(),
  }),
  vehicle: z.object({
    licensePlate: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.string(),
    vehicleOwner: z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
    }),
  }),
  driver: z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    licenseNumber: z.string(),
  }),
  insurance: z.object({
    insurerName: z.string(),
    policyNumber: z.string(),
    contactPerson: z.string(),
    contactPhone: z.string(),
    email: z.string().email(),
    damageClaimReported: z.boolean().default(false),
    acknowledged: z.boolean().default(false),
  }),
  policeReport: z.object({
    reportNumber: z.string(),
    station: z.string(),
    officerName: z.string(),
    contactPhone: z.string(),
    reportAvailable: z.boolean().default(false),
  }),
  expertOpinion: z.object({
    appointed: z.boolean().default(false),
    expertName: z.string(),
    reportDelivered: z.boolean().default(false),
    reportDate: z.string(),
    damageValue: z.number(),
  }),
  damages: z.array(
    z.object({
      position: z.string(),
      estimatedCost: z.number(),
      description: z.string(),
    })
  ),
  authority: z.object({
    prosecutorOffice: z.string(),
    proceedingNumber: z.string(),
    status: z.string(),
  }),
  progress: z.object({
    documentsReceived: z.array(z.string()),
    correspondenceLog: z.array(z.string()),
    actions: z.array(z.string()),
  }),
});
