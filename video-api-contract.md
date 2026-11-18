# 奥鸿培训站 · 视频生成网关契约

前端仅保存创建、查询 URL。供应商 API 密钥必须留在你自己的服务端；前端可选网关访问令牌只保留在页面内存。

本网站没有内置任何供应商额度，没有绑定前不会产生真实生成请求。接口适配需要由你部署到获批的 HTTPS 网关；不要把含内部资料的提示词交给未经批准的服务。

## 创建

POST 到配置的创建 URL，Content-Type: application/json。

```json
{"prompt":"电影级AI科技开场……","aspect_ratio":"16:9","duration":8}
```

可选请求头：Authorization: Bearer <当前页面提供的网关访问令牌>。

异步返回：

```json
{"id":"provider-task-id","status":"queued"}
```

也可直接返回已完成结果：

```json
{"id":"provider-task-id","status":"succeeded","video_url":"https://your-media.example/output.mp4"}
```

## 查询

GET 查询 URL 中的 `{id}` 会替换为 URL 编码后的任务 ID。
创建与查询接口必须属于同一网关域名。

状态：queued、running、succeeded、failed。失败可返回 error 字符串。
成功必须包含可播放的 HTTPS video_url。

前端每5秒查询一次，最长15分钟。关闭创作弹层或点“停止本页查询”将中止本页请求，但不自动取消供应商任务。
若创建请求网络失败，供应商可能已经创建任务，请先在网关或服务商后台确认，不要盲目重试。

## 网关运维要求

配置允许培训站来源的 CORS，包括 Content-Type、Authorization 请求头；本地 HTML 可能发出 Origin: null，更推荐使用公司内网站点发布培训页。
限制请求长度、速率与额度；验证用户或短期网关令牌；不要把供应商错误中的密钥和敏感字段返回前端。
建议网关实现请求幂等、任务所有权检查和取消接口，并按供应商规范转换模型、时长、比例和结果字段。
视频地址需保持足够有效期并支持浏览器播放；不保证供应商临时链接长期可用。

本契约是培训站的自定义接入格式，不冒充 Seedance、Runway 等任何供应商的原生协议。
