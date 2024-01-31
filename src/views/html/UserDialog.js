import { MenuDialog } from "../../utils/view/html/Dialog.js";
import { accountIcon } from '@dile/icons';
import { UserType } from "../../models/UserTypes.js";

class UserDialog extends MenuDialog {

    constructor(indexcallback) {
        super('app', `Seleccione un tipo de usuario...`, UserType.values(), indexcallback);
    }
}

export { UserDialog }