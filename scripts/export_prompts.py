#!/usr/bin/env python3
"""Export complete, model-neutral prompts or copy one to the system clipboard."""

import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
CATEGORIES = {"common": "通用协作", "frontend": "前端开发", "backend": "后端开发"}


def read_library():
    library = json.loads((ROOT / "data/prompt-library.json").read_text(encoding="utf-8"))
    prompts = library["prompts"]
    ids = [p["id"] for p in prompts]
    if len(ids) != len(set(ids)):
        raise ValueError("模板 ID 重复")
    for prompt in prompts:
        if prompt["category"] not in CATEGORIES:
            raise ValueError(f"未知分类：{prompt['category']}")
        if prompt["default_mode"] not in library["modes"]:
            raise ValueError(f"未知模式：{prompt['default_mode']}")
        for related in prompt["related"]:
            if related not in ids:
                raise ValueError(f"无效关联模板：{related}")
        for source in prompt["sources"]:
            if source not in library["sources"]:
                raise ValueError(f"无效来源：{source}")
    return library


def compose(library, prompt, mode=None):
    return "\n\n".join([
        library["shared_instruction"],
        library["modes"][mode or prompt["default_mode"]],
        prompt["body"],
    ])


def export_markdown(library):
    destination = ROOT / "prompts"
    destination.mkdir(exist_ok=True)
    for category, title in CATEGORIES.items():
        prompts = [p for p in library["prompts"] if p["category"] == category]
        lines = [f"# {title}提示词", "",
                 f"更新：{library['updated_at']}。每个代码块都是完整提示词，可独立复制；替换 `{{{{…}}}}` 中的信息即可。",
                 "", "默认模式已写入代码块。需要改变模式时，修改该行即可。不要一次粘贴本文件全部模板。",
                 "", "本文件由 `scripts/export_prompts.py` 从 `data/prompt-library.json` 生成。", ""]
        for p in prompts:
            lines.extend([f"## {p['id']} · {p['title']}", "", f"适用：{p['use_when']}", "",
                          "关联：" + "、".join(p["related"]), "", "```text",
                          compose(library, p), "```", ""])
            if p["sources"]:
                links = [f"[{library['sources'][s]['title']}]({library['sources'][s]['url']})"
                         for s in p["sources"]]
                lines.extend(["相关工程依据（模板为原创整理，非来源全文）：" + "；".join(links) + "。", ""])
        (destination / f"{category}.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"已导出 {len(library['prompts'])} 个完整模板到 {destination}")


def copy_to_clipboard(content):
    candidates = [(["pbcopy"], "pbcopy"), (["wl-copy"], "wl-copy"),
                  (["xclip", "-selection", "clipboard"], "xclip")]
    if sys.platform == "win32":
        candidates.insert(0, (["clip"], "clip"))
    for command, executable in candidates:
        if shutil.which(executable):
            subprocess.run(command, input=content, text=True, check=True)
            return
    raise RuntimeError("找不到系统剪贴板命令；请用 --show 输出，或直接复制 Markdown 代码块。")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    actions = parser.add_mutually_exclusive_group()
    actions.add_argument("--show", metavar="ID", help="输出完整提示词")
    actions.add_argument("--copy", metavar="ID", help="复制完整提示词到系统剪贴板")
    actions.add_argument("--list", action="store_true", help="列出模板")
    parser.add_argument("--mode", choices=["analysis", "implementation"], help="覆盖所选模板模式")
    args = parser.parse_args()
    if args.mode and not (args.show or args.copy):
        parser.error("--mode 需与 --show 或 --copy 一起使用")
    library = read_library()
    if args.list:
        for p in library["prompts"]:
            print(f"{p['id']}  [{CATEGORIES[p['category']]}] {p['title']} — {p['use_when']}")
        return
    selected_id = args.show or args.copy
    if not selected_id:
        export_markdown(library)
        return
    prompt = next((p for p in library["prompts"] if p["id"] == selected_id.upper()), None)
    if prompt is None:
        parser.error(f"不存在模板 {selected_id}，请使用 --list 查看")
    content = compose(library, prompt, args.mode)
    if args.copy:
        copy_to_clipboard(content)
        print(f"已复制 {prompt['id']} · {prompt['title']}；粘贴后请替换 {{{{占位信息}}}}。")
    else:
        print(content)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, RuntimeError, subprocess.SubprocessError) as exc:
        raise SystemExit(f"操作失败：{exc}") from exc
