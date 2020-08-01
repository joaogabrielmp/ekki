import { inject, injectable } from 'tsyringe';

import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import Transfer from '@modules/transfers/entities/Transfer';

@injectable()
class FindAllTransfers {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
  ) {}

  public async execute(
    page: number,
    per_page: number,
    send_user_id: string,
  ): Promise<Transfer[] | undefined> {
    const transfers = await this.transfersRepository.findAllById(
      page,
      per_page,
      send_user_id,
    );

    return transfers;
  }
}

export default FindAllTransfers;
