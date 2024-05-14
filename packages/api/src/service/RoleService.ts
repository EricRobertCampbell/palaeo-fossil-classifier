import _VerificationToken from '../model/VerificationToken';
import { inject, injectable } from 'inversify';
import "reflect-metadata";
import { FindOptions } from 'sequelize/types';

export interface IVerificationTokenService {
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  create(data: any): Promise<any>;
  remove(id: number): Promise<any>;
}

@injectable()
export default class VerificationTokenService implements IVerificationTokenService {
  private VerificationToken: typeof _VerificationToken;

  public constructor(
    @inject("VerificationToken") VerificationToken: typeof _VerificationToken,
  ) {
    this.VerificationToken = VerificationToken;
  }

  async getById(id: string) {
    return this.VerificationToken.findByPk(id);
  }
  
  async getAll() {
    return this.VerificationToken.findAll({ order: [['createdAt', 'DESC']] });
  }
  
  async create(data) {
    return this.VerificationToken.create(data);
  }
  
  async remove(id) {
    const result = {
      id,
      success: true,
      message: '',
    };
    try {
      const project = await this.VerificationToken.findByPk(id);
      await project.destroy();
    } catch (e) {
      result.success = false;
      result.message = e.message;
    }
    return result;
  }
}
