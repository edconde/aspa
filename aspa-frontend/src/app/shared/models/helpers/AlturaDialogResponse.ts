import { ACTIONS } from '../enums/Actions';
import { Altura } from '../Altura';

export interface AlturaDialogResponse {
    action: ACTIONS,
    altura?: Altura,
}