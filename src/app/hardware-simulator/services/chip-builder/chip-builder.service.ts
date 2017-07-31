import { Injectable } from '@angular/core';

import { parseNode } from '../../../compiler/models/parseNode';
import { CustomChip } from '../../models/custom-chip';
import { Chip } from '../../models/chip';

@Injectable()
export class ChipBuilderService {

  constructor() { }

  buildChip(node: parseNode): Chip {

    return new CustomChip(node);
  }

}
