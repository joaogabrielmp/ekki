import { inject, injectable } from 'tsyringe';

import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import IFindAllTransfersDTO from '@modules/transfers/dtos/IFindAllTransfersDTO';

import Transfer from '@modules/transfers/entities/Transfer';

interface ITransfersTotal {
  total: number;
}

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
  }: IFindAllTransfersDTO): Promise<ITransfersTotal | Transfer[] | undefined> {
    const total = await this.transfersRepository.findAllAndCountById(user_id);

    const transfers = await this.transfersRepository.findAllById({
      page,
      per_page,
      user_id,
    });

    const transfersAndTotal = { total, transfers };

    return transfersAndTotal;
  }
}

export default FindAllTransfers;
