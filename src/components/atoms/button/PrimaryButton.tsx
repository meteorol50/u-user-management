import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loding?: boolean;
  onClick: () => void;
}

export const PrimaryButton: VFC<Props> = memo(({
  children,
  disabled = false,
  loding = false,
  onClick
}) => {
  return (
    <Button
      bg='teal.400'
      color='white'
      _hover={{ opacity: 0.8 }}
      disabled={ disabled || loding }
      isLoading={loding}
      {...{onClick}}
    >
      {children}
    </Button>
  )
})