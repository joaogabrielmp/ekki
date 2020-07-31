export default interface IFindTransferDTO {
  balance: number;
  beneficiary_id: string;
  status: 'approved' | 'cancelled';
  user_id: string;
}
