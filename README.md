# PS2UI Releases

PS2UI 是 Photoshop 导出插件，用于把 PSD/PSB 中的 UI 图层、文字、九宫和画板导出为统一 Package，供 Unity、Godot、Cocos Creator 和 Unreal Engine 导入。

> 本仓库只发布 Photoshop 插件。引擎端安装包请从文末对应仓库下载。

## 下载

[打开最新 Release](https://github.com/Homer79980/PS2UI-Releases/releases/latest)

| 文件 | 用途 |
|---|---|
| `PS2UI-Photoshop-2.1.1.ccx` | 正式安装包，Windows/macOS 通用 |
| `PS2UI-Photoshop-Dev-2.1.1.zip` | Adobe UXP Developer Tool 开发加载包 |
| `PS2UI-2.1.1-SHA256.txt` | 安装包 SHA-256 校验值 |

## 正式安装

1. 安装或更新 Adobe Creative Cloud Desktop。
2. 下载并双击 `PS2UI-Photoshop-2.1.1.ccx`。
3. 在 Creative Cloud 的安装确认窗口中完成安装。
4. 完全退出并重新启动 Photoshop。
5. 从 `插件 -> PS2UI` 打开面板，左上角应显示 `v2.1.1`。

旧版 PS2Unity Photoshop 插件可以直接覆盖安装。内部插件 ID 仍为 `com.psd2unity.panel`，不会同时出现两个面板，旧 PSD 元数据和 Package Schema 继续兼容。

## 开发加载

CCX 无法安装或需要调试时：

1. 解压 `PS2UI-Photoshop-Dev-2.1.1.zip`。
2. 打开 Adobe UXP Developer Tool。
3. 点击 `Add Plugin`，选择解压目录中的 `manifest.json`。
4. 点击 `Load` 或 `Reload`。
5. 回到 Photoshop，从 `插件 -> PS2UI` 打开面板。

## 导出操作

1. 在 Photoshop 中打开 PSD/PSB。
2. 普通可见且有像素的图层可以直接导出，不要求固定命名前缀；隐藏层、空层以及明确以 `#` 或 `Ignore_` 标记的辅助层会跳过。
3. 需要九宫时选中母图，在 PS2UI 中设置左、上、右、下固定边并确认。实例应通过面板创建或刷新，以保留资源族契约。
4. 在工具页设置模块名；智能命名是可选步骤，不影响普通图层导出。
5. 点击导出并选择输出位置。
6. 成功的 Package 根目录至少包含 `layout.json`、`manifest.json` 和 `sprites/`。
7. 在引擎插件中选择 Package 根目录，不要选择 `sprites` 子目录。

PS2UI 会去除外围透明像素，但不会裁掉任何原本存在的非透明像素；Package 内解码像素完全相同且九宫契约兼容的资源会先归并为一份物理图片。

## 字体说明

Package 已携带当前界面使用的字体身份、字号、行高、字距、对齐和文字矩形。日常导入引擎时不需要先额外导入字体 JSON。引擎端没有对应字体时仍会生成完整 UI，并在单一导入流程中提示绑定项目字体或暂用默认字体。

高级字体目录只用于跨项目共享稳定字体身份和样式，不包含字体文件，也不是导入前置条件。

## 更新提示

PS2UI 启动后会只读查询本仓库的 Latest Release。线上版本高于本地版本时，“设置”页签和“检查更新”按钮显示红点；插件不会静默下载或执行安装包。网络不可用时不会误报更新。

## 升级与卸载

- 升级：直接安装新版 CCX 后重启 Photoshop。
- 开发版升级：在 UXP Developer Tool 中重新选择新版目录并点击 `Reload`。
- 卸载：在 Creative Cloud Desktop 的插件管理中卸载 PS2UI；开发加载则在 UXP Developer Tool 中 `Unload` 并移除条目。

## 引擎插件

| 引擎 | 发布仓库 |
|---|---|
| Unity | [Ps2Unity Releases](https://github.com/Homer79980/Ps2Unity-Releases/releases/latest) |
| Godot | [Ps2Godot Releases](https://github.com/Homer79980/Ps2Godot-Releases/releases/latest) |
| Cocos Creator | [Ps2Cocos Releases](https://github.com/Homer79980/Ps2Cocos-Releases/releases/latest) |
| Unreal Engine | [Ps2Unreal Releases](https://github.com/Homer79980/Ps2Unreal-Releases/releases/latest) |

## 校验下载

```powershell
Get-FileHash .\PS2UI-Photoshop-2.1.1.ccx -Algorithm SHA256
Get-FileHash .\PS2UI-Photoshop-Dev-2.1.1.zip -Algorithm SHA256
```

输出应与 `PS2UI-2.1.1-SHA256.txt` 一致。
