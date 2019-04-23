import { MyContext } from "src/types/MyContext";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<MyContext> = ({ context }) => {
  return !!context.req.session!.userId;
}
