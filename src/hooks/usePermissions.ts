
export const usePermissions = ({
  permissionList,
  profile,
}: {
  permissionList: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
}) => {
  const allowedPermissions = profile?.user_permissions ?? [];
  const hasAll = () => permissionList?.every((item) => allowedPermissions?.includes(item));
  const hasAny = () => permissionList?.some((item) => allowedPermissions?.includes(item));
  return {hasAll, hasAny, breakdown: permissionList?.map((item) => allowedPermissions?.includes(item)) ?? []}
};
