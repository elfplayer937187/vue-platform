# 硅谷甄选 API 接口文档

> OpenAPI 3.0 | 版本 1.0

## 基本信息

- **标题**: 硅谷甄选 API
- **说明**: 硅谷甄选后台管理系统接口文档
- **认证方式**: Token（请求头 `Token` 字段，类型 apiKey）

---

## 接口总览

| 模块               | 接口数 | 说明                                |
| ------------------ | ------ | ----------------------------------- |
| 用户管理           | 7      | 用户 CRUD、角色分配、头像上传       |
| 后台登录和菜单管理 | 3      | 登录、获取用户信息、登出            |
| 菜单管理           | 5      | 菜单树、CRUD、权限分配              |
| 角色管理           | 4      | 角色分页、CRUD                      |
| 商品管理           | 3      | 文件上传、分类查询（一/二/三级）    |
| 品牌管理           | 5      | 品牌分页、全量列表、CRUD            |
| 商品属性           | 3      | 属性列表、新增/更新、删除           |
| 商品 SPU           | 7      | SPU 分页、CRUD、图片列表、销售属性  |
| 商品 SKU           | 7      | SKU 分页、CRUD、上下架、按 SPU 查询 |

---

## 1. 用户管理

### POST `/admin/acl/user/save` — 用户新增

- **operationId**: `UserController_AddUser`
- **请求体**: `CreateUserDTO` (JSON)

| 字段     | 类型   | 必填 | 说明   |
| -------- | ------ | ---- | ------ |
| username | string | ✅   | 用户名 |
| name     | string | ✅   | 昵称   |
| password | string | ✅   | 密码   |

### PUT `/admin/acl/user/updateAvatar` — 更改头像

- **operationId**: `UserController_UpdateUserAvatar`
- **请求体**: 无（通过表单或其他方式上传）

### GET `/admin/acl/user/toAssign/{id}` — 查看用户分配的角色 ID

- **operationId**: `UserController_CheckUserRoles`
- **路径参数**: `id` (number, 必填)

### GET `/admin/acl/user/{page}/{limit}` — 用户分页列表

- **operationId**: `UserController_GetUserPagination`
- **路径参数**: `page` (number), `limit` (number)
- **查询参数**: `username` (string, 可选) — 用户名模糊搜索

### PUT `/admin/acl/user/update` — 更新用户

- **operationId**: `UserController_UpdateUser`
- **请求体**: `UpdateUserDto` (JSON)

| 字段     | 类型   | 必填 | 说明     |
| -------- | ------ | ---- | -------- |
| userId   | number | ✅   | 用户 ID  |
| username | string | ✅   | 用户名称 |
| name     | string | ✅   | 用户昵称 |

### DELETE `/admin/acl/user/remove/{id}` — 删除单个用户

- **operationId**: `UserController_DeleteUser`
- **路径参数**: `id` (number, 必填)

### DELETE `/admin/acl/user/batchRemove` — 批量删除用户

- **operationId**: `UserController_BatchRemoveUser`
- **请求体**: `BatchRemoveDto` (JSON)

| 字段   | 类型     | 必填 | 说明                 |
| ------ | -------- | ---- | -------------------- |
| idList | number[] | ✅   | 要删除的用户 ID 列表 |

### POST `/admin/acl/user/doAssignRole` — 为用户分配角色

- **operationId**: `UserController_AssignRolesForUser`
- **请求体**: `AssignRoleDto` (JSON)

| 字段       | 类型     | 必填 | 说明         |
| ---------- | -------- | ---- | ------------ |
| userId     | number   | ✅   | 用户 ID      |
| roleIdList | string[] | ✅   | 角色 ID 列表 |

---

## 2. 后台登录和菜单管理

### POST `/admin/acl/index/login` — 用户登录

- **operationId**: `AuthController_login`
- **请求体**: `LoginDTO` (JSON)

| 字段     | 类型   | 必填 | 说明     |
| -------- | ------ | ---- | -------- |
| username | string | ✅   | 用户名称 |
| password | string | ✅   | 密码     |

### GET `/admin/acl/index/info` — 获取用户登录信息

- **operationId**: `AuthController_GetUserInfo`
- **需认证**: ✅

### POST `/admin/acl/index/logout` — 用户登出

- **operationId**: `AuthController_logout`

---

## 3. 菜单管理

### GET `/admin/acl/permission` — 获取所有菜单（树形结构）

- **operationId**: `MenuController_GetAllMenu`

### POST `/admin/acl/permission/save` — 新增菜单

- **operationId**: `MenuController_CreateMenu`
- **请求体**: `CreateMenuDto` (JSON)

| 字段  | 类型   | 必填 | 说明                             |
| ----- | ------ | ---- | -------------------------------- |
| name  | string | ✅   | 菜单名称                         |
| pid   | number | ✅   | 父菜单 ID（0=根节点）            |
| code  | string | ✅   | 路由路径或权限标识码             |
| type  | number | ❌   | 类型：1=菜单，2=按钮             |
| level | number | ✅   | 层级：1/2/3=各级菜单，4=按钮权限 |

### PUT `/admin/acl/permission/update` — 更新菜单

- **operationId**: `MenuController_UpdateMenu`
- **请求体**: `UpdateMenuDto` (JSON)

| 字段   | 类型   | 必填 | 说明       |
| ------ | ------ | ---- | ---------- |
| menuId | number | ✅   | 菜单 ID    |
| pid    | number | ✅   | 父级 ID    |
| name   | string | ✅   | 菜单名称   |
| code   | string | ✅   | 权限标识码 |
| level  | number | ✅   | 层级       |

### DELETE `/admin/acl/permission/remove/{id}` — 删除菜单

- **operationId**: `MenuController_DeleteMenu`
- **路径参数**: `id` (number, 必填)

### GET `/admin/acl/permission/toAssign/{roleId}` — 获取角色拥有的权限

- **operationId**: `MenuController_GetRoleHasPermission`
- **路径参数**: `roleId` (number, 必填)

### POST `/admin/acl/permission/doAssign` — 为角色分配权限

- **operationId**: `MenuController_AssignPermissionForRoles`
- **查询参数**:
  - `roleId` (number, 必填) — 角色 ID
  - `permissionId` (number[], 必填) — 菜单 ID 数组

---

## 4. 角色管理

### GET `/admin/acl/role/{page}/{limit}` — 角色分页列表

- **operationId**: `RoleController_GetRolePagination`
- **路径参数**: `page` (number), `limit` (number)
- **查询参数**: `roleName` (string, 可选) — 角色名称模糊搜索

### POST `/admin/acl/role/save` — 新增角色

- **operationId**: `RoleController_CreateRole`
- **请求体**: `CreateRoleDto` (JSON)

| 字段     | 类型   | 必填 | 说明     |
| -------- | ------ | ---- | -------- |
| roleName | string | ✅   | 角色名称 |
| remark   | string | ❌   | 备注     |

### PUT `/admin/acl/role/update` — 更新角色

- **operationId**: `RoleController_UpdateRole`
- **请求体**: `UpdateRoleDto` (JSON)

| 字段     | 类型   | 必填 | 说明     |
| -------- | ------ | ---- | -------- |
| roleId   | number | ✅   | 角色 ID  |
| roleName | string | ✅   | 角色名称 |
| remark   | string | ❌   | 备注     |

### DELETE `/admin/acl/role/remove/{id}` — 删除角色

- **operationId**: `RoleController_RemoveRole`
- **路径参数**: `id` (number, 必填)

---

## 5. 商品管理

### POST `/admin/product/fileUpload` — 文件上传

- **operationId**: `ProductController_uploadFile`
- **请求体**: `multipart/form-data`

| 字段 | 类型   | 必填 | 说明     |
| ---- | ------ | ---- | -------- |
| file | binary | ✅   | 上传文件 |

### GET `/admin/product/category1` — 获取一级分类

- **operationId**: `ProductController_getCategory1`

### GET `/admin/product/category2/{id}` — 获取二级分类

- **operationId**: `ProductController_getCategory2`
- **路径参数**: `id` (number, 必填) — 一级分类 ID

### GET `/admin/product/category3/{id}` — 获取三级分类

- **operationId**: `ProductController_getCategory3`
- **路径参数**: `id` (number, 必填) — 二级分类 ID

---

## 6. 品牌管理

### GET `/admin/product/baseTrademark/{page}/{limit}` — 品牌分页列表

- **operationId**: `TrademarkController_getTrademarkPagination`
- **路径参数**: `page` (number), `limit` (number)

### GET `/admin/product/baseTrademark/getTrademarkList` — 全部品牌列表

- **operationId**: `TrademarkController_getAllList`

### POST `/admin/product/baseTrademark/save` — 新增品牌

- **operationId**: `TrademarkController_create`
- **请求体**: `CreateTrademarkDto` (JSON)

| 字段    | 类型   | 必填 | 说明          |
| ------- | ------ | ---- | ------------- |
| tmName  | string | ✅   | 品牌名称      |
| logoUrl | string | ✅   | 品牌 logo URL |

### PUT `/admin/product/baseTrademark/update` — 更新品牌

- **operationId**: `TrademarkController_update`
- **请求体**: `UpdateTrademarkDto` (JSON)

| 字段    | 类型   | 必填 | 说明          |
| ------- | ------ | ---- | ------------- |
| tmId    | number | ✅   | 品牌 ID       |
| tmName  | string | ✅   | 品牌名称      |
| logoUrl | string | ✅   | 品牌 logo URL |

### DELETE `/admin/product/baseTrademark/remove/{id}` — 删除品牌

- **operationId**: `TrademarkController_remove`
- **路径参数**: `id` (number, 必填)

---

## 7. 商品属性

### GET `/admin/product/attrInfoList/{c1Id}/{c2Id}/{c3Id}` — 获取属性列表

- **operationId**: `AttrController_getAttrList`
- **路径参数**: `c1Id`, `c2Id`, `c3Id` (number, 必填) — 三级分类 ID
- **说明**: 返回指定分类下的属性列表（含属性值）

### POST `/admin/product/saveAttrInfo` — 新增/更新属性

- **operationId**: `AttrController_SaveAttrInfo`
- **请求体**: `SaveAttrDto` (JSON)
- **逻辑**: 有 `attrId` → 更新，无 `attrId` → 新增

| 字段          | 类型            | 必填 | 说明                |
| ------------- | --------------- | ---- | ------------------- |
| attrId        | number          | ❌   | 属性 ID（更新时传） |
| attrName      | string          | ✅   | 属性名称            |
| categoryId    | number          | ✅   | 所属三级分类 ID     |
| categoryLevel | number          | ✅   | 分类级别（固定 3）  |
| attrValueList | AttrValueItem[] | ✅   | 属性值列表          |

**AttrValueItemDto**:

| 字段        | 类型   | 必填 | 说明                    |
| ----------- | ------ | ---- | ----------------------- |
| attrValueId | number | ❌   | 属性值 ID（更新时必传） |
| valueName   | string | ✅   | 属性值名称              |

### DELETE `/admin/product/deleteAttr/{attrId}` — 删除属性

- **operationId**: `AttrController_deleteAttr`
- **路径参数**: `attrId` (number, 必填)
- **说明**: 级联删除属性值

---

## 8. 商品 SPU

### GET `/admin/product/spuPage/{page}/{limit}` — SPU 分页列表

- **operationId**: `SpuController_getSpuPagination`
- **路径参数**: `page` (number), `limit` (number)
- **查询参数**: `category3Id` (number, 必填)

### GET `/admin/product/baseSaleAttrList` — 销售属性字典列表

- **operationId**: `SpuController_getBaseSaleAttrList`

### POST `/admin/product/saveSpuInfo` — 新增 SPU

- **operationId**: `SpuController_saveSpuInfo`
- **请求体**: `SaveSpuDto` (JSON)

| 字段            | 类型              | 必填 | 说明         |
| --------------- | ----------------- | ---- | ------------ |
| spuName         | string            | ✅   | SPU 名称     |
| description     | string            | ✅   | 描述         |
| tmId            | number            | ✅   | 品牌 ID      |
| category3Id     | number            | ✅   | 三级分类 ID  |
| spuImageList    | SPUImageItem[]    | ✅   | 图片列表     |
| spuSaleAttrList | SpuSaleAttrItem[] | ✅   | 销售属性列表 |

### PUT `/admin/product/updateSpuInfo` — 更新 SPU

- **operationId**: `SpuController_updateSpuInfo`
- **请求体**: `SaveSpuDto`（同新增）

### GET `/admin/product/spuImageList/{id}` — SPU 图片列表

- **operationId**: `SpuController_getSpuImageList`
- **路径参数**: `id` (number, 必填)

### GET `/admin/product/spuSaleAttrList/{id}` — SPU 销售属性列表

- **operationId**: `SpuController_getSpuSaleAttrList`
- **路径参数**: `id` (number, 必填)

### DELETE `/admin/product/deleteSpu/{id}` — 删除 SPU

- **operationId**: `SpuController_deleteSpu`
- **路径参数**: `id` (number, 必填)

---

## 9. 商品 SKU

### GET `/admin/product/list/{page}/{limit}` — SKU 分页列表

- **operationId**: `SkuController_getList`
- **路径参数**: `page` (number), `limit` (number)

### POST `/admin/product/saveSkuInfo` — 新增 SKU

- **operationId**: `SkuController_saveSkuInfo`
- **请求体**: `SaveSkuDto` (JSON)

| 字段                 | 类型                   | 必填 | 说明         |
| -------------------- | ---------------------- | ---- | ------------ |
| spuId                | number                 | ✅   | 所属 SPU ID  |
| category3Id          | number                 | ✅   | 三级分类 ID  |
| tmId                 | number                 | ✅   | 品牌 ID      |
| skuName              | string                 | ✅   | SKU 名称     |
| weight               | string                 | ✅   | 重量（克）   |
| price                | number                 | ✅   | 价格（分）   |
| skuDesc              | string                 | ✅   | 描述         |
| skuDefaultImg        | string                 | ✅   | 默认图片 URL |
| skuImageList         | SkuImageItem[]         | ✅   | 图片列表     |
| skuAttrValueList     | SkuAttrValueItem[]     | ✅   | 平台属性列表 |
| skuSaleAttrValueList | SkuSaleAttrValueItem[] | ✅   | 销售属性列表 |

### GET `/admin/product/getSkuInfo/{id}` — 获取 SKU 详情

- **operationId**: `SkuController_getSkuInfo`
- **路径参数**: `id` (number, 必填)

### GET `/admin/product/findBySpuId/{id}` — 根据 SPU ID 查询 SKU 列表

- **operationId**: `SkuController_findBySpuId`
- **路径参数**: `id` (number, 必填)

### GET `/admin/product/onSale/{id}` — 上架 SKU

- **operationId**: `SkuController_onSale`
- **路径参数**: `id` (number, 必填)

### GET `/admin/product/cancelSale/{id}` — 下架 SKU

- **operationId**: `SkuController_cancelSale`
- **路径参数**: `id` (number, 必填)

### DELETE `/admin/product/deleteSku/{id}` — 删除 SKU

- **operationId**: `SkuController_deleteSku`
- **路径参数**: `id` (number, 必填)

---

## DTO 汇总

### 嵌套对象

| DTO                     | 字段                 | 类型                      | 说明            |
| ----------------------- | -------------------- | ------------------------- | --------------- |
| SPUImageItemDto         | imageName            | string                    | 图片名称        |
|                         | imageUrl             | string                    | 图片地址        |
| SpuSaleAttrValueItemDto | baseSaleAttrId       | number                    | 销售属性字典 ID |
|                         | saleAttrValueName    | string                    | 属性值名称      |
| SpuSaleAttrItemDto      | BaseSaleAttrId       | number                    | 销售属性字典 ID |
|                         | SaleAttrName         | string                    | 销售属性名称    |
|                         | spuSaleAttrValueList | SpuSaleAttrValueItemDto[] | 销售属性值列表  |
| SkuImageItemDto         | imageName            | string                    | 图片名称        |
|                         | imageUrl             | string                    | 图片 URL        |
|                         | spuImageId           | number                    | SPU 图片 ID     |
|                         | isDefault            | string                    | 是否默认（"0"） |
| SkuAttrValueItemDto     | attrId               | number                    | 属性 ID         |
|                         | valueId              | number                    | 属性值 ID       |
| SkuSaleAttrValueItemDto | saleAttrId           | number                    | 销售属性 ID     |
|                         | saleAttrValueId      | number                    | 销售属性值 ID   |
