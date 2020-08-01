import { inject, injectable } from 'tsyringe';

import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import IFindAllTransfersDTO from '@modules/transfers/dtos/IFindAllTransfersDTO';

import Transfer from '@modules/transfers/entities/Transfer';

@injectable()
class FindAllTransfers {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
  ) {}

  public async execute({
    page,
    per_page,
    user_id,
  }: IFindAllTransfersDTO): Promise<Transfer[] | undefined> {
    const transfers = await this.transfersRepository.findAllById({
      page,
      per_page,
      user_id,
    });

    return transfers;
  }
}

export default FindAllTransfers;
