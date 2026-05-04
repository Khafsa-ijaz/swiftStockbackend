import { permissions } from "./permissions.rbac";

export const rolePermissions = {
  Admin: [
    permissions.product.create,
    permissions.product.delete,
    permissions.product.view,
    permissions.product.update,
    permissions.order.create,
    permissions.order.view,
    permissions.user.create,
    permissions.user.view,
    permissions.user.delete,
    permissions.user.update,
    permissions.category.view,
    permissions.category.create,

  ],

  Staff: [
    permissions.product.view,
    permissions.order.view,
    permissions.order.create,
  ],
};