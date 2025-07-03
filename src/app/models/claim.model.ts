export interface Claim {
  id?: number;
  policyId: number;
  description: string;
  amount: number;
  status?: string;
  submittedAt?: Date;
}
