# PS2UI Releases

PS2UI 是 Photoshop 导出插件，用于把 PSD/PSB 中的 UI 图层、文字、九宫和画板导出为统一 Package，供 Unity、Godot、Cocos Creator 和 Unreal Engine 导入。

> 本仓库只发布 Photoshop 插件。引擎端安装包请从文末对应仓库下载。

## 下载

[打开最新 Release](https://github.com/Homer79980/PS2UI-Releases/releases/latest)

| 文件 | 用途 |
|---|---|
| `PS2UI-Photoshop-2.1.2.ccx` | 正式安装包，Windows/macOS 通用 |
| `PS2UI-Photoshop-Dev-2.1.2.zip` | Adobe UXP Developer Tool 开发加载包 |
| `PS2UI-2.1.2-SHA256.txt` | 安装包 SHA-256 校验值 |

## 正式安装

1. 安装或更新 Adobe Creative Cloud Desktop。
2. 下载并双击 `PS2UI-Photoshop-2.1.2.ccx`。
3. 在 Creative Cloud 的安装确认窗口中完成安装。
4. 完全退出并重新启动 Photoshop。
5. 从 `插件 -> PS2UI` 打开面板，左上角应显示 `v2.1.2`。

当前正式包支持 Windows/macOS 上的 Photoshop 2023（24.0）及以上版本；Photoshop 2022 及更早版本不能加载这份 UXP 面板。

旧版 PS2Unity Photoshop 插件可以直接覆盖安装。内部插件 ID 仍为 `com.psd2unity.panel`，不会同时出现两个面板，旧 PSD 元数据和 Package Schema 继续兼容。

## 开发加载

CCX 无法安装或需要调试时：

1. 解压 `PS2UI-Photoshop-Dev-2.1.2.zip`。
2. 打开 Adobe UXP Developer Tool。
3. 点击 `Add Plugin`，选择解压目录中的 `manifest.json`。
4. 点击 `Load` 或 `Reload`。
5. 回到 Photoshop，从 `插件 -> PS2UI` 打开面板。

## 九宫完整教程

九宫的目标是：**四个角不变形，四条边只沿对应方向拉伸，中心区域负责填充**。PS2UI 的九宫数据会写入 Package，Unity、Godot、Cocos Creator 和 Unreal 导入器再把它转换成各自引擎的九宫组件。

![九宫区域示意图](assets/nine-slice-anatomy.svg)

### 先理解三个对象

- **母图**：设计师制作的原始完整图片，必须保留四角和边框的完整像素。母图不是已经拉伸过的截图。
- **边界 L/T/R/B**：从母图四条边向内量的固定区域，单位可以是 `px` 或 `%`。建议使用 `px`，更容易和 Photoshop、Unity、Godot、Cocos 以及 UMG 对照。
- **实例**：按照母图和边界生成的某个目标尺寸。实例只保存像素结果和母图关系，导出时可以和母图共享资源。

### 第 1 步：准备母图

1. 在 Photoshop 中打开 PSD/PSB。
2. 找到要做九宫的底板、按钮、面板或对话框图层。
3. 确认图层本身包含完整四角和边框，四周透明区域可以存在，但不要把有效像素放在画布外。
4. 不要先把母图拉成某个运行时尺寸，也不要使用已经变形的实例作为母图。
5. 如果中心区域有文字、图标或不可重复的装饰，先把它移到独立图层；九宫中心会被拉伸或重复，复杂内容不适合放在中心。

### 第 2 步：打开九宫面板并加载图层

1. 从 `插件 -> PS2UI` 打开面板，进入 `九宫` 页。
2. 在 Photoshop 图层面板中选中母图。
3. 面板顶部应显示图层名称和尺寸；如果仍显示“未选中图层”，重新点击图层或点击右上角刷新按钮。
4. 点击预览区域的 `刷新预览`。预览中的四条可拖动线就是 L/T/R/B 边界。
5. 也可以点击 `PS参考线`，插件会清除旧参考线，并按照当前 L/T/R/B 数值自动放置四条 Photoshop 参考线。

### 第 3 步：设置四条固定边

在面板的 `设置` 区域填写：

| 字段 | 固定内容 | 常见例子 |
|---|---|---:|
| 左 L | 左边固定宽度 | 32 px |
| 上 T | 顶部固定高度 | 32 px |
| 右 R | 右边固定宽度 | 32 px |
| 下 B | 底部固定高度 | 32 px |

操作建议：

1. 默认勾选 `等比例` 时，输入一个值可以同步四边，适合四边对称的面板。
2. 四边不相同时取消 `等比例`，分别填写 L/T/R/B。
3. 优先填写右侧的 `px` 输入框；百分比适合多个分辨率相近、但母图尺寸经常变化的设计。
4. 观察预览：边界内侧应包含完整四角和需要保留的边框；中心橙色区域应是允许拉伸的区域。
5. 边界必须满足：`L + R < 母图宽度`，`T + B < 母图高度`。实例的最小尺寸为 `L + R + 1` 乘 `T + B + 1`。
6. 只有横向拉伸时，把 `T` 和 `B` 设为 `0`；只有纵向拉伸时，把 `L` 和 `R` 设为 `0`。

### 第 4 步：确认母图和资源族

如果这个资源需要生成多个尺寸，建议使用资源族：

1. 在 `九宫资源族` 中填写稳定 ID，例如 `dialog_panel_blue` 或 `button_green`。只使用字母、数字、下划线和短横线，不要用显示名称或临时尺寸作为 ID。
2. 勾选 `当前图层是母图`。
3. 点击底部的 `确认`。
4. 看到状态提示成功后，再进行实例创建或导出。

母图确认后，资源族中的实例会共享边距、母图像素和样式。母图的填充、描边、圆角和图层样式应只在母图上修改；实例上的样式改动会在刷新时被母图恢复。

### 第 5 步：创建不同尺寸的实例

只需要一个尺寸时，可以跳过实例创建，直接导出母图。需要多个尺寸时，推荐这样操作：

1. 复制母图，得到一个临时目标尺寸图层。
2. 用 Photoshop 的自由变换把临时图层调整到目标宽高。只改变宽高和位置，不要旋转、透视或斜切。
3. 选中这个目标尺寸图层，确保面板中的资源族 ID 与母图一致。
4. 点击 `创建实例`。插件会读取当前选中图层的宽高，从母图重建一个九宫位图实例。
5. 确认新生成的实例四角、边框和中心效果正确后，可以删除用于提供尺寸的临时副本。
6. 后续直接变换 PS2UI 生成的实例并提交变换，插件会按母图自动刷新；需要手动重建时选中实例并点击 `刷新当前`。

![Photoshop 九宫操作流程](assets/nine-slice-photoshop-flow.svg)

注意：不要把实例再设置成新的母图，也不要手动改实例的 L/T/R/B。要改边界或外观，回到母图修改并确认，资源族会统一同步。

### 第 6 步：导出 Package

1. 进入 `工具` 页。
2. 可先点击 `导出前检查 Preflight`，确认九宫资源族、边界和实例关系没有错误。
3. 设置模块名，点击 `导出 Package` 并选择输出目录。
4. 导出的 Package 根目录必须包含 `layout.json`、`manifest.json` 和 `sprites/`。
5. 引擎导入时选择这个根目录，不要选择 `sprites` 子目录。

导出器会删除外围透明像素，但不会删除图层原本存在的非透明像素。相同解码像素且九宫契约兼容的母图和实例会尽量复用同一份物理 PNG；看到多个节点引用一张图片是正常的。

### 第 7 步：在引擎中拉伸

导入后，统一修改控件的尺寸，不要修改节点的 `Scale`。使用 Scale 会把四角一起放大，九宫效果就会失效。

![四个引擎中的九宫拉伸方式](assets/nine-slice-engines.svg)

| 引擎 | 正确组件 | 修改什么 |
|---|---|---|
| Unity | `Image`，`Type = Sliced` | `RectTransform` 宽高 |
| Godot | `NinePatchRect` | `Layout Size` |
| Cocos Creator | `Sprite`，`Type = SLICED` | `UITransform` 宽高 |
| Unreal | `Image`，`Draw As = Box` | Widget/Slot 尺寸 |

### 九宫验收清单

- 放大宽度时，左上、右上、左下、右下四角大小不变。
- 只放大高度时，左右边框宽度不变。
- 中心区域可以正常填充，没有把文字或图标拉成长条。
- 缩小到最小尺寸时，不低于 `L + R + 1` 和 `T + B + 1`。
- Photoshop、Package 和引擎中的边界数值一致。
- 同一资源族的多个实例使用同一母图和同一组边界。
- 重新导入同一个 Package 不会生成无意义的 `_1.png`、`_2.png`。

### 常见问题

**四角也被拉伸了**

通常是引擎中修改了 `Scale`，或九宫组件没有启用 Sliced/Box。先恢复 Scale 为 `1,1,1`，再修改控件尺寸。

**边框被切掉或缺半个角**

母图的 L/T/R/B 过大、母图本身已经被裁切，或者边界线压到了有效像素内部。回到 PS2UI 预览，重新检查四角是否完整，再确认并重新导出。

**中间纹理变形严重**

这通常不是导出失败，而是纹理、文字或装饰被放进了可拉伸中心。把不可拉伸内容拆到独立图层，或缩小中心区域并重新设置边界。

**实例没有跟着母图更新**

确认实例和母图的资源族 ID 完全一致；选中母图重新点击 `确认`，再选择实例点击 `刷新当前`。完成后重新导出，不要继续使用旧 Package。

**引擎中看起来还是旧图**

请导出到新的目录，或删除旧 Package 后重新导入。引擎端可能保留旧的 PNG、SpriteFrame、Texture2D 或 `.uasset`，仅覆盖 JSON 不一定会刷新旧资源。

## 普通图层和完整导出

1. 在 Photoshop 中打开 PSD/PSB。
2. 普通可见且有像素的图层可以直接导出，不要求固定命名前缀；隐藏层、空层以及明确以 `#` 或 `Ignore_` 标记的辅助层会跳过。
3. 需要九宫时按上面的教程先确认母图和实例，再导出。
4. 在工具页设置模块名；智能命名是可选步骤，不影响普通图层导出。
5. 点击 `导出 Package` 并选择输出位置。
6. 成功的 Package 根目录至少包含 `layout.json`、`manifest.json` 和 `sprites/`。
7. 在引擎插件中选择 Package 根目录，不要选择 `sprites` 子目录。

## AI 命名

- 每个图层只读取一次视觉摘要，预览保持原始宽高比，并将最长边归一到 256px。
- 箭头、锁、关闭等小图标使用独立视觉请求；大图最多 4 张一批，并发上限为 4。
- 粗略轮廓只用于候选分析，不再让未识别图层继承其它图片的语义名称。
- 模型、视觉内容、图层角色和项目上下文都未变化时，高置信度结果会命中本地缓存；缓存不包含 API Key，也不会随安装包发布。
- 需要绕过旧结果时点击“重新识别”，插件会忽略缓存并用本次结果覆盖对应条目。
- AI 结果仍会先显示在命名列表中，确认无误后再写回 Photoshop 图层。

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
Get-FileHash .\PS2UI-Photoshop-2.1.2.ccx -Algorithm SHA256
Get-FileHash .\PS2UI-Photoshop-Dev-2.1.2.zip -Algorithm SHA256
```

输出应与 `PS2UI-2.1.2-SHA256.txt` 一致。
