# Image Background Remover

一个简单、快速、免费的在线图片背景移除工具。

## 功能特性

- ✅ 图片上传（支持拖拽和点击）
- ✅ 自动移除图片背景
- ✅ 实时预览对比
- ✅ 一键下载处理后的图片
- ✅ 支持 JPG、PNG、WEBP 格式
- ✅ 响应式设计，支持移动端

## 技术栈

- **前端:** Next.js 14 + TypeScript + Tailwind CSS
- **API:** Remove.bg API
- **部署:** Cloudflare Pages

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local` 文件并填入你的 Remove.bg API Key：

```bash
REMOVE_BG_API_KEY=your_api_key_here
```

获取 API Key: https://www.remove.bg/api

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
image-background-remover-new/
├── app/
│   ├── api/
│   │   └── remove-background/
│   │       └── route.ts        # API路由
│   ├── globals.css             # 全局样式
│   ├── layout.tsx              # 根布局
│   └── page.tsx                # 主页面
├── mvp-requirements.md         # MVP需求文档
├── MVP需求文档.md              # MVP需求文档（中文版）
├── requirements.md             # 需求文档
├── .env.local                  # 环境变量配置
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API说明

### POST /api/remove-background

上传图片并移除背景。

**请求：**
- Content-Type: `multipart/form-data`
- Body: `file` (图片文件)

**响应：**
- 成功: 返回处理后的PNG图片
- 失败: 返回错误信息JSON

## 注意事项

- Remove.bg 免费版每月有50次调用限制
- 最大支持 10MB 的图片文件
- 支持的图片格式：JPG、PNG、WEBP

## 部署到 Cloudflare Pages

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 设置构建命令：`npm run build`
3. 设置输出目录：`.next`
4. 添加环境变量：`REMOVE_BG_API_KEY`

## 许可证

MIT License
