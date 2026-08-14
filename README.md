# PS2UI / PS2Unity 安装包

`PS2UI` 是 Photoshop 导出插件，用于把 UI 设计稿导出为通用 Package；`Ps2Unity`、`Ps2Godot` 和 `Ps2Cocos` 分别把 Package 导入对应引擎。

> Photoshop 插件从 2.1.0 起由 PS2Unity 更名为 PS2UI。内部插件 ID、Package Schema 和旧项目元数据保持兼容。

本仓库发布 PS2UI Photoshop 安装包和 Ps2Unity Unity 安装包。Godot 与 Cocos 安装包分别发布在 [Ps2Godot Releases](https://github.com/Homer79980/Ps2Godot-Releases/releases/latest) 和 [Ps2Cocos Releases](https://github.com/Homer79980/Ps2Cocos-Releases/releases/latest)。

## 下载最新版

打开 [Latest Release](https://github.com/Homer79980/PSD2Unity-Releases/releases/latest) 下载需要的文件：

| 文件 | 用途 |
|---|---|
| `PS2UI-Photoshop-2.1.0.ccx` | Photoshop 正式安装包，Windows/macOS 通用 |
| `PS2UI-Photoshop-Dev-2.1.0.zip` | Photoshop 开发加载包 |
| `PS2Unity-Unity-UPM-2.1.0.zip` | Unity 推荐安装包 |
| `PS2Unity-Unity-2.1.0.unitypackage` | Unity 传统安装包 |
| `PS2UI-2.1.0-SHA256.txt` | 四个安装包的 SHA-256 |

## Photoshop 安装

1. 下载并双击 `PS2UI-Photoshop-2.1.0.ccx`。
2. 通过 Adobe Creative Cloud 完成安装。
3. 重启 Photoshop。
4. 从 `增效工具/插件 -> PS2UI` 打开面板。
5. 面板应显示 `PS2UI v2.1.0`。

CCX 无法安装时，解压 `PS2UI-Photoshop-Dev-2.1.0.zip`，在 Adobe UXP Developer Tool 中选择其中的 `manifest.json` 后点击 `Load`。

旧版 PS2Unity Photoshop 插件可以直接覆盖安装。因为内部插件 ID 仍是 `com.psd2unity.panel`，不会与 PS2UI 并排安装。

## Photoshop 导出

1. 打开 PSD/PSB，并在 PS2UI 中设置模块名、图层命名与九宫边界。
2. 执行导出，选择 Package 输出位置。
3. 导出目录根部应包含 `layout.json`，图片位于 `sprites`。
4. 在 Unity、Godot 或 Cocos 导入器中选择 Package 根目录，不要选择 `sprites` 子目录。

## Unity 安装

支持 Unity 2022.3 LTS。

推荐方式：

1. 解压 `PS2Unity-Unity-UPM-2.1.0.zip`。
2. 打开 `Window -> Package Manager`，点击 `+`。
3. 选择 `Add package from disk...`。
4. 选择 `com.psd2unity.uiimport/package.json`。
5. 编译完成后从 `Tools -> PS2Unity -> 打开工作台` 进入。

也可以通过 `Assets -> Import Package -> Custom Package...` 导入 `PS2Unity-Unity-2.1.0.unitypackage`。插件会自动补齐 Unity UI、TextMesh Pro 和 Newtonsoft Json 依赖。

## 基本使用

1. 在 Photoshop 的 PS2UI 面板导出 Package。
2. 在 Unity 的 PS2Unity 工作台选择该 Package。
3. 检查整页预览、图片复用、九宫、字体与材质映射。
4. 点击 `开始导入` 生成 Prefab。

同一张九宫母图的实例会按固定边和角进行验证；只有能够安全重建的实例才会共用 Sprite。普通图片按有效像素紧裁，但不会裁掉任何非透明像素。

## 2.1.0 主要变化

- Photoshop 导出插件的可见名称改为 PS2UI。
- Photoshop 安装包改为 `PS2UI-Photoshop-*`。
- 更新检查同时兼容新的 PS2UI 安装包名和旧的 PS2Unity 安装包名。
- Unity 导入器继续使用 Ps2Unity 名称，Package 协议和旧项目数据无需迁移。

## 检查更新

PS2UI 会查询本仓库的 Latest Release。发现新版本后只显示红点并打开 Release 页面，不会静默下载或执行文件。

## 校验安装包

下载 `PS2UI-2.1.0-SHA256.txt` 后执行：

```powershell
Get-FileHash .\PS2UI-Photoshop-2.1.0.ccx -Algorithm SHA256
Get-FileHash .\PS2Unity-Unity-UPM-2.1.0.zip -Algorithm SHA256
```

输出应与校验文件一致。
