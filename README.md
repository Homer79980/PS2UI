# PS2Unity 安装包

PS2Unity 用于把 Photoshop UI 设计稿转换为游戏引擎可继续编辑和使用的界面资源。

当前正式支持：

- Photoshop UXP 插件：图层命名、九宫标记、设计包导出、版本检查。
- Unity 编辑器插件：完整界面预览、图片复用、字体与材质绑定、uGUI/TMP Prefab 生成。
- Windows 与 macOS 共用同一个 Photoshop CCX 安装包。

> 本仓库只发布经过验收的安装包。开发源码位于 [PSD2Unity-Source](https://github.com/Homer79980/PSD2Unity-Source)。

## 下载最新版

打开 [Latest Release](https://github.com/Homer79980/PSD2Unity-Releases/releases/latest) 下载需要的文件：

| 文件 | 用途 |
|---|---|
| `PS2Unity-Photoshop-2.0.4.ccx` | Photoshop 正式安装包，Windows/macOS 通用 |
| `PS2Unity-Photoshop-Dev-2.0.4.zip` | Photoshop 开发加载包，CCX 无法安装时使用 |
| `PS2Unity-Unity-UPM-2.0.4.zip` | Unity 推荐安装包，适合团队项目和版本管理 |
| `PS2Unity-Unity-2.0.4.unitypackage` | Unity 传统安装包，适合快速导入 |
| `PS2Unity-2.0.4-SHA256.txt` | 安装包完整性校验值 |

## Photoshop 安装

### 正式安装

1. 下载 `PS2Unity-Photoshop-2.0.4.ccx`。
2. 双击 CCX，通过 Adobe Creative Cloud 完成安装。
3. 打开 Photoshop。
4. 从 `增效工具/插件 -> PS2Unity` 打开面板。
5. 面板版本应显示 `2.0.4`。

### 开发加载

CCX 无法安装时：

1. 解压 `PS2Unity-Photoshop-Dev-2.0.4.zip`。
2. 打开 Adobe UXP Developer Tool。
3. 点击 `Add Plugin`，选择解压目录中的 `manifest.json`。
4. 点击 `Load` 或 `Reload`。

开发加载适合内部测试，不建议作为团队长期安装方式。

## Unity 安装

支持 Unity 2022.3 LTS。

### 推荐：UPM 安装

1. 解压 `PS2Unity-Unity-UPM-2.0.4.zip`。
2. 打开 Unity 的 `Window -> Package Manager`。
3. 点击左上角 `+`。
4. 选择 `Add package from disk...`。
5. 定位到解压目录中的 `com.psd2unity.uiimport/package.json`。
6. 等待 Unity 完成依赖安装和脚本编译。
7. 从 `Tools -> PS2Unity -> 打开工作台` 进入插件。

### 传统 unitypackage 安装

1. 下载 `PS2Unity-Unity-2.0.4.unitypackage`。
2. 在 Unity 中选择 `Assets -> Import Package -> Custom Package...`。
3. 选择安装包并导入全部文件。
4. 插件会自动补齐 Unity UI、TextMesh Pro 和 Newtonsoft Json 依赖。
5. 依赖安装完成后打开 PS2Unity 工作台。

项目中已经安装旧版时，导入新版并覆盖插件源码；项目自己的设置资产和字体映射不会被安装包覆盖。

## 基本使用流程

1. 在 Photoshop 中整理图层名称和九宫参数。
2. 打开 PS2Unity 面板并执行导出。
3. Photoshop 中每个可见画板会作为一个独立界面写入设计包；隐藏画板不会导出。
4. 在 Unity 工作台选择 Photoshop 导出的设计包。
5. 打开整页预览，通过顶部下拉框切换画板。
6. 在右侧检查或选择字体、材质和 Shader 样式。
7. 点击右下角 `开始导入（N 个预制体）`。
8. Unity 会为每个可见画板生成一个独立 Prefab。

如果 Unity 项目暂时没有对应字体或材质，仍然允许先导入图片、层级和 Prefab。文字内容、位置、字号、字距、行距、颜色和效果要求会保存在待绑定清单中；以后新增字体或材质后，可以在插件中扫描、绑定并刷新对应 Prefab，无需重新制作 PSD。

## 九宫资源族

同一张九宫母图在 Photoshop 中拉伸成多个尺寸时：

1. 选择母图，设置 L/T/R/B 和“九宫资源族”，勾选“当前图层是母图”后 Confirm。
2. 从母图或已有实例创建新实例；新实例继承母图关系，并使用当前选中图层的位置和尺寸。
3. 对实例执行自由变换后提交，面板会按横向三宫、纵向三宫或完整九宫规则自动重建。
4. Ctrl+J 和 Alt+拖动创建的原生副本也会在变换后自动登记、刷新并继承同一母图。
5. 正常导出；Unity 会按 Photoshop 画板原始分辨率生成 Prefab，同族实例共用一个 Sprite。

验证会分别检查整图、固定四边和四角。如果中心内容、边缘高光/阴影/描边、Border、拉伸方向或尺寸不符合规则，该实例保持独立资源，不会被相似图规则强行合并。

## 2.0.4 主要变化

- 移除 Unity 全局纹理 `AssetPostprocessor`，避免插件参与 YooAsset/SBP 打包期间的无关纹理和图集刷新。
- Sprite、PPU、九宫 Border 与平台压缩设置只在显式 PS2Unity 导入时幂等应用。
- 传统 `.unitypackage` 升级会按精确 GUID 自动移除旧的全局后处理脚本；UPM 更新会正常替换包内容。

## 2.0.1 主要变化

- AI 命名结果按 Photoshop 画板与组折叠，并支持画布选层与命名列表双向定位。
- 画板名前缀可独立应用或移除，不调用 AI；项目/活动与画板前缀都由本地命名规则稳定处理。
- 导出按照资源身份只生成一份可复用 PNG，Unity 中的多个节点继续引用同一资源。
- 所有明确设置过边界的九宫都会按九宫压缩，包括没有实例、没有勾选母图的独立九宫。
- 连续快速删除图层时，从最后一次删除重新计算元数据读取静默期，避免“命令‘获取’当前不可用”弹窗。
- 九宫副本继续兼容 `拷贝`、`拷贝 2`、`copy` 等本地化后缀，并只在首次登记时生成稳定实例 ID。

## 检查更新

Photoshop 插件会查询本仓库的 Latest Release。发现新版本后，点击更新入口会打开对应 Release 页面，由用户下载安装；插件不会静默下载或执行文件。

## 校验安装包

下载 `PS2Unity-2.0.4-SHA256.txt` 后，可以在 PowerShell 中执行：

```powershell
Get-FileHash .\PS2Unity-Photoshop-2.0.4.ccx -Algorithm SHA256
Get-FileHash .\PS2Unity-Unity-UPM-2.0.4.zip -Algorithm SHA256
```

输出应与校验文件一致。

## 已知边界

- 单层线性自定义色标渐变可转换为 TMP 原生四角渐变，但不保证多色标和整段文字坐标效果一比一；多层、径向、角度、反射、菱形或特殊混合渐变仍需要引擎适配器或人工材质。
- TMP 材质的字面颜色建议保持白色，避免材质颜色再次给顶点渐变染色。
- 九宫资源族是设计师的显式声明，插件不会自动猜测没有资源族标记的图片。
- 九宫实例的关联信息随 PSD 保存；关闭面板后关联仍在，但自动变换监听和刷新只在面板开启时运行。
- Photoshop 缩放插值、图层效果或人工修改使实例无法由母图重建时，会保留独立资源。
- 新 Prefab 合并成功后会共用一个 Sprite；旧版本已经落盘的重复 PNG 不会自动删除，请在资源维护中确认无引用后清理。
- 插件不会分发字体文件；请确保项目拥有字体使用授权。
- 旧画板从设计包中删除后，旧 Prefab 只标记为过期，不会自动删除。
