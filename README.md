# Skk-Panel 
Cloudflare Worker 导航与公告管理应用

这是一个基于Cloudflare Worker的导航与公告管理应用，具有以下功能：

- 密码认证保护管理界面
- 使用KV存储导航链接和公告数据
- 支持添加、编辑和删除导航链接
- 支持添加、编辑和删除公告信息
- 提供对外API接口，支持通过API密钥进行验证
- 支持复制公告JSON数据功能
- 响应式设计，适配各种设备


## 使用说明

### 管理界面

1. 访问应用首页，点击右上角的"管理"按钮
2. 输入设置的密码登录
3. 登录后可以管理导航链接和公告信息

### 导航管理

- **添加导航**：切换到导航管理选项卡，填写标题、URL、描述和分类，点击保存
- **编辑导航**：点击导航项的编辑按钮，修改后保存
- **删除导航**：点击导航项的删除按钮

### 公告管理

- **添加公告**：切换到公告管理选项卡，填写标题和内容，点击保存
- **编辑公告**：点击公告项的编辑按钮，修改后保存
- **复制JSON**：编辑公告时，点击"复制JSON"按钮可复制公告的完整JSON数据
- **删除公告**：点击公告项的删除按钮


## 快速开始：从Cloudflare部署项目
<details>
<summary><strong>点击查看</strong></summary>

### 1. 准备工作

- 注册并登录[Cloudflare Dashboard](https://dash.cloudflare.com/)
- 确保你已经有一个Cloudflare账户和至少一个已验证的域名

### 2. 创建KV命名空间

1. 在Cloudflare Dashboard中，选择「Workers & Pages」
2. 点击「KV」选项卡
3. 点击「创建命名空间」按钮
4. 输入命名空间名称（例如：`nav-links-kv`）并创建
5. 保存生成的命名空间ID，稍后会用到

### 3. 创建Worker

1. 在Cloudflare Dashboard中，选择「Workers & Pages」
2. 点击「创建应用程序」按钮
3. 选择「创建Worker」
4. 为Worker命名（例如：`skk-panel`）
5. 点击「创建Worker」按钮

### 4. 配置Worker

1. 在Worker详情页面，点击「设置」选项卡
2. 在「变量」部分，点击「添加变量」
3. 添加以下环境变量：
   - 变量名：`AUTH_PASSWORD`，值：你的管理密码
   - 变量名：`API_KEY`，值：你的API调用密钥
4. 在「KV命名空间绑定」部分，点击「添加绑定」
5. 添加以下绑定：
   - 变量名：`NAV_LINKS`
   - KV命名空间：选择之前创建的命名空间

### 5. 部署代码

1. 在Worker详情页面，点击「快速编辑」
2. 删除默认代码
3. 将本项目的`index.js`文件内容复制粘贴到编辑器中
4. 点击「保存并部署」按钮

### 6. 访问应用

1. 部署成功后，你可以通过Worker提供的URL访问应用
2. 默认URL格式为：`https://your-worker-name.your-account.workers.dev`
3. 你也可以在Worker设置中配置自定义域名
</details>


## API接口
<details>
<summary><strong>点击查看</strong></summary>

本应用提供了安全的外部API接口，用于程序化管理导航链接和公告。所有API请求都需要通过API密钥进行验证。

### 认证方式

所有API请求都需要在请求头中包含API密钥：

```
X-API-Key: your-secure-api-key-here
```

未提供有效API密钥的请求将返回`401 Unauthorized`状态码。

### 导航链接API

#### 新增/更新导航链接

```http
POST /api/external/links
Content-Type: application/json
X-API-Key: your-secure-api-key-here

{
  "id": "optional-id-for-update",  // 更新时提供，新增时可省略
  "title": "链接标题",            // 必填
  "url": "https://example.com",   // 必填
  "description": "链接描述",      // 可选
  "category": "分类",            // 可选
  "icon": "fa-link"              // 可选，Font Awesome图标类名
}
```

**响应示例**：

```json
{
  "success": true,
  "message": "导航链接已保存",
  "data": {
    "id": "generated-or-provided-id",
    "title": "链接标题",
    "url": "https://example.com",
    "description": "链接描述",
    "category": "分类",
    "icon": "fa-link"
  }
}
```

**状态码**：
- `200 OK`: 请求成功
- `400 Bad Request`: 请求格式错误或缺少必填字段
- `401 Unauthorized`: API密钥无效或未提供

### 公告API

#### 新增/更新公告

```http
POST /api/external/announcements
Content-Type: application/json
X-API-Key: your-secure-api-key-here

{
  "id": "optional-id-for-update",  // 更新时提供，新增时可省略
  "title": "公告标题",            // 必填
  "content": "公告内容",          // 必填
  "icon": "fa-bullhorn"           // 可选，默认为fa-bullhorn
}
```

**响应示例**：

```json
{
  "success": true,
  "message": "公告已保存",
  "data": {
    "id": "generated-or-provided-id",
    "title": "公告标题",
    "content": "公告内容",
    "icon": "fa-bullhorn",
    "createdAt": "2023-05-15T08:30:00Z"
  }
}
```

**状态码**：
- `200 OK`: 请求成功
- `400 Bad Request`: 请求格式错误或缺少必填字段
- `401 Unauthorized`: API密钥无效或未提供

### 错误响应

当API请求失败时，将返回以下格式的错误响应：

```json
{
  "success": false,
  "message": "错误描述信息"
}
```
</details>

## 技术栈

- Cloudflare Workers：提供无服务器运行环境
- Cloudflare KV：存储导航链接和公告数据
- HTML/CSS/JavaScript：前端界面
- Font Awesome：提供图标支持

## 应用截图

### 首页

![首页](/photo/首页.png)

### 首页功能

![首页-导航分类](/photo/首页-导航分类.png)

![首页-公告弹窗](/photo/首页-公告弹窗.png)

### 登录

![登录界面](/photo/登录.png)

### 控制中心

![控制中心-导航](/photo/控制中心-导航.png)

![控制中心-公告](/photo/控制中心-公告.png)

## 注意事项

- 请确保`wrangler.toml`中的`AUTH_PASSWORD`设置为强密码
- API密钥应妥善保管，避免泄露
- 所有API接口都需要通过API密钥验证
- KV存储有读写次数限制，请参考Cloudflare的官方文档