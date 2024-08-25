import { GlobalConstants, ValidatingObjectFormat } from "src/app/app-shared/models/javascriptVariables";

export interface UserAuthenticationInterface {
    userName: string;
    password: string;
}

export function userAuthenticationValidation(): any {
    return {
        userAuthenticationValidateModel: {
         userName: {
          required: GlobalConstants.validationMsg.username,
        },
        password: {
          required: GlobalConstants.validationMsg.password,
        }
      } as ValidatingObjectFormat,
    };
  }