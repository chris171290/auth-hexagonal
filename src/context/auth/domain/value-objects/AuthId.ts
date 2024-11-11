import { Uuid } from 'src/context/shared/domain/value-objects/Uuid';

export class AuthId extends Uuid {
  constructor(readonly value: string) {
    super(value);
  }
}
