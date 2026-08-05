# PSD2Unity 安装包

PSD2Unity 用于把 Photoshop UI 设计稿转换为游戏引擎可继续编辑和使用的界面资源。

当前正式支持：

- Photoshop UXP 插件：图层命名、九宫标记、设计包导出、版本检查。
- Unity 编辑器插件：完整界面预览、图片复用、字体与材质绑定、uGUI/TMP Prefab 生成。
- Windows 与 macOS 共用同一个 Photoshop CCX 安装包。

> 本仓库只发布经过验收的安装包。开发源码位于 [PSD2Unity-Source](https://github.com/Homer79980/PSD2Unity-Source)。

## 下载最新版

打开 [Latest Release](https://github.com/Homer79980/PSD2Unity-Releases/releases/latest) 下载需要的文件：

| 文件 | 用途 |
|---|---|
| `PSD2Unity-Photoshop-1.6.1.ccx` | Photoshop 正式安装包，Windows/macOS 通用 |
| `PSD2Unity-Photoshop-Dev-1.6.1.zip` | Photoshop 开发加载包，CCX 无法安装时使用 |
| `PSD2Unity-Unity-UPM-1.6.1.zip` | Unity 推荐安装包，适合团队项目和版本管理 |
| `PSD2Unity-Unity-1.6.1.unitypackage` | Unity 传统安装包，适合快速导入 |
| `PSD2Unity-1.6.1-SHA256.txt` | 安装包完整性校验值 |

## Photoshop 安装

### 正式安装

1. 下载 `PSD2Unity-Photoshop-1.6.1.ccx`。
2. 双击 CCX，通过 Adobe Creative Cloud 完成安装。
3. 打开 Photoshop。
4. 从 `增效工具/插件 -> PSD2Unity` 打开面板。
5. 面板版本应显示 `1.6.1`。

### 开发加载

CCX 无法安装时：

1. 解压 `PSD2Unity-Photoshop-Dev-1.6.1.zip`。
2. 打开 Adobe UXP Developer Tool。
3. 点击 `Add Plugin`，选择解压目录中的 `manifest.json`。
4. 点击 `Load` 或 `Reload`。

开发加载适合内部测试，不建议作为团队长期安装方式。

## Unity 安装

支持 Unity 2022.3 LTS。

### 推荐：UPM 安装

1. 解压 `PSD2Unity-Unity-UPM-1.6.1.zip`。
2. 打开 Unity 的 `Window -> Package Manager`。
3. 点击左上角 `+`。
4. 选择 `Add package from disk...`。
5. 定位到解压目录中的 `com.psd2unity.uiimport/package.json`。
6. 等待 Unity 完成依赖安装和脚本编译。
7. 从 `Tools -> PSD2Unity -> 打开工作台` 进入插件。

### 传统 unitypackage 安装

1. 下载 `PSD2Unity-Unity-1.6.1.unitypackage`。
2. 在 Unity 中选择 `Assets -> Import Package -> Custom Package...`。
3. 选择安装包并导入全部文件。
4. 插件会自动补齐 Unity UI、TextMesh Pro 和 Newtonsoft Json 依赖。
5. 依赖安装完成后打开 PSD2Unity 工作台。

项目中已经安装旧版时，导入新版并覆盖插件源码；项目自己的设置资产和字体映射不会被安装包覆盖。

## 基本使用流程

1. 在 Photoshop 中整理图层名称和九宫参数。
2. 打开 PSD2Unity 面板并执行导出。
3. Photoshop 中每个可见画板会作为一个独立界面写入设计包；隐藏画板不会导出。
4. 在 Unity 工作台选择 Photoshop 导出的设计包。
5. 打开整页预览，通过顶部下拉框切换画板。
6. 在右侧检查或选择字体、材质和 Shader 样式。
7. 点击右下角 `开始导入（N 个预制体）`。
8. Unity 会为每个可见画板生成一个独立 Prefab。

如果 Unity 项目暂时没有对应字体或材质，仍然允许先导入图片、层级和 Prefab。文字内容、位置、字号、字距、行距、颜色和效果要求会保存在待绑定清单中；以后新增字体或材质后，可以在插件中扫描、绑定并刷新对应 Prefab，无需重新制作 PSD。

## 1.6.1 主要变化

- Photoshop 文字基础色与图层样式“渐变叠加”分别写入通用设计包，基础色不会丢失。
- Unity 把支持的线性渐变直接写入 TMP 自带的 `Color Gradient`，不要求项目额外制作渐变 Shader。
- 新生成的 Prefab 不再添加 `PSD2UnityTextGradient` 脚本；重导旧 Prefab 时会自动移除该组件。
- 水平、垂直和斜向渐变分别使用 TMP 的水平、垂直和四角模式。
- TMP 只有四个角颜色，并按每个字形插值；多色标、偏移和缩放会折算为四角采样，因此属于近似还原。
- 不透明渐变决定最终字面颜色；半透明渐变按透明度叠加在 Photoshop 文字基础色上。
- 复杂渐变完整保留原始参数并提示人工适配，不阻止图片、层级和 Prefab 导入。
- 渐变数据不包含 Unity 材质、Shader 或资源路径，可供后续其他引擎读取和实现。

- 用户在整页预览中明确选择字体和 TMP 材质后，可以直接绑定并应用。
- 材质 Shader 无法完整表达渐变叠加、扩展投影等 Photoshop 效果时，只提示“近似还原”，不再阻止保存。
- 材质与目标字体图集不兼容时仍会阻止绑定，避免文字空白或图集错乱。
- 已经人工确认的效果映射会在后续导入中继续生效。

- 不再使用 Photoshop 画板颜色标签选择主画板。
- 可见画板数量与 Unity 生成 Prefab 数量一致。
- 预览窗口支持画板切换，一次只显示当前画板。
- 右侧集中处理字体、材质与 Shader，并可直接开始导入。
- 画板改名后重新导入，保持原 Prefab 路径和 GUID。
- 字体或材质缺失不再阻止 Prefab 生成。
- 后续绑定字体时可以一次刷新多个画板对应的 Prefab。
- 保持旧版 Schema 1/2 设计包兼容。
- 镜像资源只作为候选提示，必须人工确认后才会共用 Sprite。

## 检查更新

Photoshop 插件会查询本仓库的 Latest Release。发现新版本后，点击更新入口会打开对应 Release 页面，由用户下载安装；插件不会静默下载或执行文件。

## 校验安装包

下载 `PSD2Unity-1.6.1-SHA256.txt` 后，可以在 PowerShell 中执行：

```powershell
Get-FileHash .\PSD2Unity-Photoshop-1.6.1.ccx -Algorithm SHA256
Get-FileHash .\PSD2Unity-Unity-UPM-1.6.1.zip -Algorithm SHA256
```

输出应与校验文件一致。

## 已知边界

- 单层线性自定义色标渐变可转换为 TMP 原生四角渐变，但不保证多色标和整段文字坐标效果一比一；多层、径向、角度、反射、菱形或特殊混合渐变仍需要引擎适配器或人工材质。
- TMP 材质的字面颜色建议保持白色，避免材质颜色再次给顶点渐变染色。
- 插件不会分发字体文件；请确保项目拥有字体使用授权。
- 旧画板从设计包中删除后，旧 Prefab 只标记为过期，不会自动删除。
