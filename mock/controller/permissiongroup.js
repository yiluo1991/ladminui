export default [
  {
    type: "post",
    url: "/permissiongroup/list",
    /**
     *
     * @api {post} /permissiongroup/list 获取权限页列表
     * @apiName 获取权限页列表
     * @apiGroup PermissionGroup
     * @apiVersion  1.0.0
     */
    response() {
      return {
        success: true,
        data: [
          { Id: 1, DisplayName: "首页", ParentId: null, Url: "/Home/Index", Tag: null, Headshot: "el-icon-s-home", SN: 0, children: [] },
         
          {
            Id: 2,
            DisplayName: "账号和权限管理",
            ParentId: null,
            Url: null,
            Tag: null,
            Headshot: "el-icon-user",
            SN: 3,
            children: [
              { Id: 3, DisplayName: "权限组管理", ParentId: 2, Url: "/admin/permissiongroup", Tag: null, Headshot: null, SN: 1, children: [] },
              { Id: 4, DisplayName: "权限项管理", ParentId: 2, Url: "/admin/permissionline", Tag: null, Headshot: null, SN: 2, children: [] },
              { Id: 5, DisplayName: "角色权限", ParentId: 2, Url: "/admin/role", Tag: null, Headshot: null, SN: 3, children: [] },
              { Id: 6, DisplayName: "账号管理", ParentId: 2, Url: "/admin/employee", Tag: null, Headshot: null, SN: 4, children: [] },
            ],
          },
          {
            Id: 7,
            DisplayName: "其他",
            ParentId: null,
            Url: null,
            Tag: null,
            Headshot: "el-icon-order",
            SN: 3,
            children: [
              { Id: 8, DisplayName: "404错误页", ParentId: 2, Url: "/admin/xxxxxxxx", Tag: null, Headshot: null, SN: 1, children: [] },
              { Id: 9, DisplayName: "权限项管理", ParentId: 2, Url: "/admin/catch", Tag: null, Headshot: null, SN: 2, children: [] },
            
            ],
          },
        ],
      };
    },
  },
  {
    type: "post",
    url: "/permissiongroup/add",
    /**
     *
     * @api {post} /permissiongroup/add 添加权限页
     * @apiName 添加权限页
     * @apiGroup PermissionGroup
     * @apiVersion  1.0.0
     */
    response() {
      return {
        success: true,
        data: [],
        msg: "添加成功",
      };
    },
  },
  {
    type: "post",
    url: "/permissiongroup/edit",
    /**
     *
     * @api {post} /permissiongroup/edit 修改权限页
     * @apiName 修改权限页
     * @apiGroup PermissionGroup
     * @apiVersion  1.0.0
     */
    response() {
      return {
        success: true,
        data: [],
        msg: "修改成功",
      };
    },
  },
  {
    type: "post",
    url: "/permissiongroup/delete",
    /**
     *
     * @api {post} /permissiongroup/delete 修改权限页
     * @apiName 删除权限页
     * @apiGroup PermissionGroup
     * @apiVersion  1.0.0
     */
    response() {
      return {
        success: true,
        data: [],
        msg: "删除成功",
      };
    },
  },
];
