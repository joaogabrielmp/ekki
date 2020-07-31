export default interface ICancelTransferDTO {
  status: 'approved' | 'cancelled';
  transfer_id: string;
}
