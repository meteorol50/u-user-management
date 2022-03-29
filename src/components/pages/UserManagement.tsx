import { Center, Spinner, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";

import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from '../organisms/user/UserCard';
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loding, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getUsers(), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
  }, [onSelectUser, users, onOpen]);

  return (
    <>
      {loding ? (
        <Center height='100vh'>
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx='auto'>
              <UserCard
                id={user.id}
                imageUrl='https://source.unsplash.com/random'
                userName={user.username}
                fullName={user.name}
                {...{onClickUser}}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal user={selectedUser} isAdmin={loginUser?.isAdmin} {...{ isOpen, onClose }} />
    </>
  )
})